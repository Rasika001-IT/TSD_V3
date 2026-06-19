# TSD_V3

Consolidated **Next.js** app (public magazine site + `/admin` editorial CMS + API) that replaces
the WordPress dependency of `tsdmagazine.com`. Backed by **Supabase** (Postgres + Auth) and
**Cloudflare R2** (media/PDF CDN). Deployed on **Railway**.

> Replaces the two old repos `TSD---V2` (Express backend) and `TSD-Frontend` (Vite SPA), which
> stay live and untouched until the Phase-4 DNS cutover, then are archived as the rollback net.

Full plan: `C:\Users\kolhe\.claude\plans\quirky-seeking-sky.md`

## Stack
- Next.js (App Router, JSX) · Tailwind 3.4 (ported design: Canela/Inter, `#C89632`, typography)
- Supabase Postgres + Auth · Cloudflare R2 · Railway

## Setup
1. `cp .env.example .env` and fill Supabase + R2 values (see below for what's needed).
2. Apply the schema: `supabase db push` (or paste `supabase/migrations/0001_init.sql` into the
   Supabase SQL editor). Seeds 10 industry hubs + recurring series.
3. `npm install`
4. `npm run dev`

## Migration (Phase 1) — `npm run migrate`
Idempotent WordPress → Supabase + R2 import. Safe to re-run (upserts on `wp_id`); used again for
the final delta sync at cutover.
- `node scripts/migrate.js --limit 20` — smoke test
- `node scripts/migrate.js --taxonomy` — categories/tags/authors only
- Resolves `post_type` by category ancestry (News→news, Blogs→blog, Featured Articles→feature,
  else news); `Editor's Highlights` → `promotion=editors_pick`. Mirrors featured **and inline**
  images to R2 and rewrites their URLs. Prints a WP-vs-Supabase count check at the end.

## Build phases
- **0 — Provision + schema** (this scaffold). ✅ schema, project skeleton, migration engine.
- **1 — Migrate** content + media (needs Supabase + R2 credentials + `media.tsdmagazine.com` DNS).
- **2 — Public site**: port `TSD-Frontend` pages to App Router, reading Supabase (design identical).
- **3 — CMS** in tiers: 3a news/blog editor (blocks cutover) → 3b rankings/reports/series →
  3c hub pages + social cascade + newsletter automation.
- **4 — Cutover**: deploy on Railway, final delta sync, flip `tsdmagazine.com` DNS, keep old
  service as rollback, then rotate exposed secrets and archive old repos.

## What I need from the account owner (blocks Phase 1)
- **Cloudflare:** R2 bucket + custom domain `media.tsdmagazine.com` + scoped API token.
- **Supabase:** project URL + anon key + service-role key.
- **Railway:** a new service connected to this repo (env vars from `.env.example`).
