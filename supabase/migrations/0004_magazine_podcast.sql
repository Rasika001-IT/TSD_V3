-- 0004 — Magazine audio podcast. Paste into the Supabase SQL editor (one-time).
-- Adds an optional audio podcast URL (uploaded MP3 on R2, or a pasted link)
-- to each magazine edition. NULL = no podcast (the reader renders no card).
alter table magazines add column if not exists podcast_audio text;
