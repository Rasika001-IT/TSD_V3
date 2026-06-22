-- 0002 — Magazines + Women in Business feature (CMS-managed)
-- Paste into the Supabase SQL editor (same as 0001_init.sql). One-time.

-- ---------------------------------------------------------------------
-- Magazines: a FlipHTML5 edition + a featured TSD post (cover story).
-- `cover_image` (R2 or /assets) drives the homepage carousel + /magazine grid;
-- the linked post supplies the cover-story title/excerpt/image on the reader.
-- `edition_title` is optional — falls back to the post's title.
-- `published_at IS NULL` = draft.
-- ---------------------------------------------------------------------
create table magazines (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  edition_title text,
  fliphtml5_url text not null,
  post_id       uuid references posts(id) on delete set null,
  cover_image   text,
  published_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Women in Business hero feature — the editable hero slot shown on the
-- homepage WiB section AND the /women-in-business page. Exactly one row may be
-- active at a time; old rows are kept so a previous feature can be reactivated.
-- ---------------------------------------------------------------------
create table wib_features (
  id          uuid primary key default gen_random_uuid(),
  article_url text not null,
  cover_image text,
  title       text,
  is_active   boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Enforce a single active WiB feature.
create unique index wib_features_one_active on wib_features (is_active) where is_active;

-- ---------------------------------------------------------------------
-- RLS — public reads only published/active; writes require an editor.
-- ---------------------------------------------------------------------
alter table magazines    enable row level security;
alter table wib_features enable row level security;

create policy "public reads published magazines" on magazines
  for select using (published_at is not null);
create policy "editors manage magazines" on magazines
  for all to authenticated using (true) with check (true);

create policy "public reads active wib" on wib_features
  for select using (is_active);
create policy "editors manage wib" on wib_features
  for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------
-- Seed the 8 existing magazines (from data/magazines.js). `post_id` resolved by
-- the featured article slug; covers keep their current /assets paths.
-- ---------------------------------------------------------------------
insert into magazines (slug, edition_title, fliphtml5_url, post_id, cover_image, published_at) values
  ('jeevantika-lingalwar', 'The New Era of Global Changemaker Leaders 2026',
   'https://online.fliphtml5.com/TSD01/Jeevantika-Lingalwar-Magazine?mode=double',
   (select id from posts where slug = 'jeevantika-lingalwar-redefining-access-in-the-age-of-ai'),
   '/assets/images/magazine/jeevantika-lingalwar.png', now()),
  ('kamiya-jani', 'Most Innovative Entrepreneur of Year 2025',
   'https://online.fliphtml5.com/kijke/mqsv/?mode=double',
   (select id from posts where slug = 'kamiya-jani-most-innovative-entrepreneur-of-2025'),
   '/assets/images/magazine/kamya-jani.png', now()),
  ('georgios-matis', 'Most Trailblazer Leader to Follow in 2025',
   'https://online.fliphtml5.com/kijke/tkpm/?mode=double',
   (select id from posts where slug = 'georgios-matis-bridging-science-and-philosophy-in-the-fight-against-chronic-pain'),
   '/assets/images/magazine/georgios-matis.png', now()),
  ('zarine-manchanda', 'Most Prominent Leader to Follow in 2025',
   'https://online.fliphtml5.com/kijke/mped/?mode=double',
   (select id from posts where slug = 'dr-zarine-manchanda-a-legacy-of-purpose-power-and-philanthropy'),
   '/assets/images/magazine/zarine-manchanda.png', now()),
  ('rob-whitfield', 'Most Empowering Business Leader in 2025',
   'https://online.fliphtml5.com/kijke/qfeb/?mode=double',
   (select id from posts where slug = 'rob-whitfield-redefining-winning-in-the-age-of-team-transformation'),
   '/assets/images/magazine/rob-whitfield.png', now()),
  ('tia-latrell', 'Most Visionary Woman Leader in 2025',
   'https://online.fliphtml5.com/kijke/rcqm/?mode=double',
   (select id from posts where slug = 'tia-latrell-from-basement-blooms-to-celebrity-floral-empire'),
   '/assets/images/magazine/tia-latrell.png', now()),
  ('naphtali', 'Most Inspiring Business Leader in 2025',
   'https://online.fliphtml5.com/The_Success_Digest/nyvh/?mode=double',
   (select id from posts where slug = 'purpose-over-prestige-the-journey-of-naphtali-bryant'),
   '/assets/images/magazine/naphtali-bryant.png', now()),
  ('kristin', 'Most Visionary Women Leader in 2025',
   'https://online.fliphtml5.com/The_Success_Digest/lbaw/?mode=double',
   (select id from posts where slug = 'crafting-brands-with-soul-and-strategy'),
   '/assets/images/magazine/kristin.png', now());
