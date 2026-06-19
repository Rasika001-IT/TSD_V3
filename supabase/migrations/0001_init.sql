-- =====================================================================
-- TSD_V3 — initial schema (Phase 0)
-- Full editorial model so no backfill is needed after migration.
-- Most editorial fields are nullable: migrated posts leave them empty;
-- editors fill them going forward via the CMS.
-- Apply with: supabase db push   (or run in the SQL editor)
-- =====================================================================

create extension if not exists "pgcrypto";  -- gen_random_uuid()

-- ---------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------
create type post_type       as enum ('news', 'blog', 'ranking', 'report', 'feature');
create type post_status     as enum ('draft', 'in_review', 'scheduled', 'published', 'archived');
create type post_visibility as enum ('public', 'members_only', 'unlisted');
create type post_promotion  as enum ('none', 'featured', 'hero', 'editors_pick', 'breaking');

-- `format` is validated by post_type in the CMS UI; stored as the union of
-- news formats (breaking|standard|brief|analysis|explainer) and
-- blog formats (explainer|how_to|listicle|deep_dive|opinion|interview|case_study).
create type post_format as enum (
  'breaking', 'standard', 'brief', 'analysis', 'explainer',
  'how_to', 'listicle', 'deep_dive', 'opinion', 'interview', 'case_study'
);

create type report_kind as enum (
  'industry_report', 'tsd_insights', 'market_pulse', 'whitepaper', 'annual_outlook'
);

-- ---------------------------------------------------------------------
-- Identity: authors (bylines) vs profiles (editor logins)
-- ---------------------------------------------------------------------
create table authors (
  id         uuid primary key default gen_random_uuid(),
  wp_id      integer unique,                 -- WP author id (idempotent migration)
  name       text not null,
  slug       text unique not null,
  avatar     text,                           -- R2 URL
  bio        text,
  created_at timestamptz default now()
);

-- Editor accounts are Supabase Auth users; profiles holds role/metadata.
create table profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  full_name  text,
  role       text not null default 'editor', -- 'admin' | 'editor' | 'writer'
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Industry hubs (landing pages) + recurring series
-- Seeded empty in Phase 0; posts mapped into them post-cutover (editorial).
-- ---------------------------------------------------------------------
create table hub_pages (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  name                text not null,
  header_image        text,                  -- R2 URL
  intro_copy          text,
  featured_series_ids uuid[] default '{}',
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

create table series (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text unique not null,
  description text,
  hub_id      uuid references hub_pages(id) on delete set null
);

-- ---------------------------------------------------------------------
-- Taxonomy: categories (hierarchical) + tags
-- WP categories migrate flat (parent_id preserved); hub_id stays null
-- until an editor links a category to a hub.
-- ---------------------------------------------------------------------
create table categories (
  id          uuid primary key default gen_random_uuid(),
  wp_id       integer unique,
  name        text not null,
  slug        text unique not null,
  description text,
  parent_id   uuid references categories(id) on delete set null,
  hub_id      uuid references hub_pages(id)  on delete set null
);

create table tags (
  id    uuid primary key default gen_random_uuid(),
  wp_id integer unique,
  name  text not null,
  slug  text unique not null
);

-- ---------------------------------------------------------------------
-- Posts (core + SEO + keyword + helper + report + newsletter fields)
-- ---------------------------------------------------------------------
create table posts (
  id              uuid primary key default gen_random_uuid(),
  wp_id           integer unique,            -- idempotent migration key
  slug            text unique not null,      -- preserved from WP — no broken links
  title           text not null,
  subtitle        text,
  content         text,                      -- sanitized HTML body
  excerpt         text,
  post_type       post_type      not null default 'news',
  status          post_status    not null default 'draft',
  visibility      post_visibility not null default 'public',
  format          post_format,
  promotion       post_promotion not null default 'none',
  featured_image  text,                      -- R2 URL
  author_id       uuid references authors(id) on delete set null,
  series_id       uuid references series(id)  on delete set null,
  published_at    timestamptz,
  scheduled_at    timestamptz,

  -- SEO
  seo_title        varchar(60),
  meta_description varchar(160),
  og_title         text,
  og_description   text,
  og_image         text,                     -- R2 URL; distinct from featured_image

  -- Keyword framework (6-layer) — internal SEO brief, NOT display tags
  primary_keyword    text,
  secondary_keywords text[] default '{}',
  entity_tags        text[] default '{}',
  long_tail_variant  text,
  industry_tag       text,
  trend_theme_tags   text[] default '{}',

  -- Editorial helpers
  reading_time   integer,                    -- minutes, computed at migration
  key_takeaways  jsonb,                       -- 5-bullet summary box (blogs)
  cta_type       text,                       -- newsletter | related_read | report_download
  cta_target_id  uuid,
  region         text,                       -- us | uk | global | apac | emea | latam

  -- Reports
  pdf_url     text,                          -- R2 URL
  report_type report_kind,
  is_gated    boolean default false,
  page_count  integer,

  -- Newsletter
  send_to_newsletter boolean default false,
  newsletter_sent_at timestamptz,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Many-to-many: post <-> category, post <-> tag
-- ---------------------------------------------------------------------
create table post_categories (
  post_id     uuid references posts(id)      on delete cascade,
  category_id uuid references categories(id) on delete cascade,
  primary key (post_id, category_id)
);

create table post_tags (
  post_id uuid references posts(id) on delete cascade,
  tag_id  uuid references tags(id)  on delete cascade,
  primary key (post_id, tag_id)
);

-- ---------------------------------------------------------------------
-- Structured ranking entries (a "Top 30" is rows, not one HTML blob)
-- Empty after migration; authored in CMS tier 3b.
-- ---------------------------------------------------------------------
create table ranking_entries (
  id           uuid primary key default gen_random_uuid(),
  post_id      uuid references posts(id) on delete cascade,
  rank         integer not null,
  person_name  text not null,
  person_title text,
  company      text,
  bio          text,
  photo        text,                         -- R2 URL
  linkedin_url text,
  created_at   timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Social promotion cascade (per-platform captions/timing)
-- Table now; cascade automation in CMS tier 3c.
-- ---------------------------------------------------------------------
create table social_promotions (
  id           uuid primary key default gen_random_uuid(),
  post_id      uuid references posts(id) on delete cascade,
  channel      text not null,               -- linkedin | instagram | twitter
  caption      text,
  scheduled_at timestamptz,
  status       text default 'pending',      -- pending | sent | failed
  created_at   timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Subscribers (ports existing /api/subscribe data)
-- ---------------------------------------------------------------------
create table subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Indexes (read-path hot columns)
-- ---------------------------------------------------------------------
create index posts_status_pubat_idx on posts (status, published_at desc);
create index posts_type_idx         on posts (post_type);
create index posts_promotion_idx    on posts (promotion);
create index posts_series_idx       on posts (series_id);
create index categories_parent_idx  on categories (parent_id);
create index categories_hub_idx     on categories (hub_id);
create index ranking_entries_post_idx on ranking_entries (post_id, rank);

-- =====================================================================
-- Row Level Security
-- Public reads only published+public content; all writes need an editor.
-- =====================================================================
alter table posts            enable row level security;
alter table categories       enable row level security;
alter table tags             enable row level security;
alter table authors          enable row level security;
alter table hub_pages        enable row level security;
alter table series           enable row level security;
alter table post_categories  enable row level security;
alter table post_tags        enable row level security;
alter table ranking_entries  enable row level security;
alter table social_promotions enable row level security;
alter table subscribers      enable row level security;
alter table profiles         enable row level security;

-- Public read policies
create policy "public reads published posts" on posts
  for select using (status = 'published' and visibility = 'public');
create policy "public reads categories" on categories for select using (true);
create policy "public reads tags"       on tags       for select using (true);
create policy "public reads authors"    on authors    for select using (true);
create policy "public reads hubs"       on hub_pages  for select using (true);
create policy "public reads series"     on series     for select using (true);
create policy "public reads post_categories" on post_categories for select using (true);
create policy "public reads post_tags"  on post_tags  for select using (true);
create policy "public reads ranking_entries" on ranking_entries for select using (true);

-- Anyone can subscribe (insert only); no public select.
create policy "anyone can subscribe" on subscribers for insert with check (true);

-- Authenticated editors: full access. (Writes go through the service-role
-- key in route handlers, which bypasses RLS; these policies cover the
-- authenticated client path and admin previews of non-published content.)
create policy "editors manage posts"      on posts            for all to authenticated using (true) with check (true);
create policy "editors manage categories" on categories       for all to authenticated using (true) with check (true);
create policy "editors manage tags"       on tags             for all to authenticated using (true) with check (true);
create policy "editors manage authors"    on authors          for all to authenticated using (true) with check (true);
create policy "editors manage hubs"       on hub_pages        for all to authenticated using (true) with check (true);
create policy "editors manage series"     on series           for all to authenticated using (true) with check (true);
create policy "editors manage post_cat"   on post_categories  for all to authenticated using (true) with check (true);
create policy "editors manage post_tags"  on post_tags        for all to authenticated using (true) with check (true);
create policy "editors manage rankings"   on ranking_entries  for all to authenticated using (true) with check (true);
create policy "editors manage social"     on social_promotions for all to authenticated using (true) with check (true);
create policy "editors read subscribers"  on subscribers      for select to authenticated using (true);
create policy "users read own profile"    on profiles         for select to authenticated using (id = auth.uid());

-- =====================================================================
-- Seed: 10 industry hubs (empty landing pages) + recurring series
-- Source: RA_TSD_Website_Segements.pdf §3
-- =====================================================================
insert into hub_pages (slug, name) values
  ('technology',          'Technology'),
  ('finance',             'Finance'),
  ('healthcare',          'Healthcare'),
  ('retail-consumer',     'Retail & Consumer'),
  ('real-estate',         'Real Estate & Construction'),
  ('energy',              'Energy & Sustainability'),
  ('manufacturing',       'Manufacturing & Supply Chain'),
  ('media-entertainment', 'Media & Entertainment'),
  ('professional-services','Professional Services'),
  ('education',           'Education & EdTech')
on conflict (slug) do nothing;

insert into series (name, slug, hub_id)
select s.name, s.slug, h.id
from (values
  ('AI Watch',             'ai-watch',             'technology'),
  ('SaaS Spotlight',       'saas-spotlight',       'technology'),
  ('Cyber Briefing',       'cyber-briefing',       'technology'),
  ('Markets Today',        'markets-today',        'finance'),
  ('Investor Briefing',    'investor-briefing',    'finance'),
  ('Banking Pulse',        'banking-pulse',        'finance'),
  ('Healthcare Innovators','healthcare-innovators','healthcare'),
  ('FDA Watch',            'fda-watch',            'healthcare'),
  ('Retail Trends',        'retail-trends',        'retail-consumer'),
  ('Consumer Insights',    'consumer-insights',    'retail-consumer'),
  ('Market Reports',       'market-reports',       'real-estate'),
  ('PropTech Watch',       'proptech-watch',       'real-estate'),
  ('Energy Briefing',      'energy-briefing',      'energy'),
  ('Climate Watch',        'climate-watch',        'energy'),
  ('Industry 4.0',         'industry-4-0',         'manufacturing'),
  ('Supply Chain Insights','supply-chain-insights','manufacturing'),
  ('Streaming Wars',       'streaming-wars',       'media-entertainment'),
  ('Sports Business Brief','sports-business-brief','media-entertainment'),
  ('Big 4 Watch',          'big-4-watch',          'professional-services'),
  ('Agency Spotlight',     'agency-spotlight',     'professional-services'),
  ('EdTech Innovators',    'edtech-innovators',    'education')
) as s(name, slug, hub_slug)
join hub_pages h on h.slug = s.hub_slug
on conflict (slug) do nothing;
