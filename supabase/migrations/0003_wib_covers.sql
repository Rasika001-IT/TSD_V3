-- 0003 — Women in Business per-article landing images.
-- Replaces the (empty) wib_features "active feature" model from 0002 with a
-- per-post landing image + optional manual hero override. Paste into the
-- Supabase SQL editor.

drop table if exists wib_features cascade; -- empty; wrong model

create table wib_covers (
  post_id       uuid primary key references posts(id) on delete cascade,
  landing_image text not null,
  is_hero       boolean default false,    -- manual hero override (one at a time)
  updated_at    timestamptz default now()
);

-- At most one manual hero.
create unique index wib_covers_one_hero on wib_covers (is_hero) where is_hero;

alter table wib_covers enable row level security;
create policy "public reads wib covers" on wib_covers
  for select using (true);
create policy "editors manage wib covers" on wib_covers
  for all to authenticated using (true) with check (true);

-- Seed the existing curated portraits (public/assets/images/women/*.png),
-- resolved by the featured article's slug.
insert into wib_covers (post_id, landing_image)
select id, '/assets/images/women/jeevantika.png' from posts where slug = 'jeevantika-lingalwar-redefining-access-in-the-age-of-ai'
union all
select id, '/assets/images/women/kamiya.png'     from posts where slug = 'kamiya-jani-most-innovative-entrepreneur-of-2025'
union all
select id, '/assets/images/women/tia.png'        from posts where slug = 'tia-latrell-from-basement-blooms-to-celebrity-floral-empire'
union all
select id, '/assets/images/women/zarine.png'     from posts where slug = 'dr-zarine-manchanda-a-legacy-of-purpose-power-and-philanthropy'
union all
select id, '/assets/images/women/kristin.png'    from posts where slug = 'crafting-brands-with-soul-and-strategy'
on conflict (post_id) do nothing;
