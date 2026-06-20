// Seed the provided 40 Under 40 markdown as a ranking post (demo of the
// rankings template). Ages are unverified per the file's editor note — this is
// a preview demo; review/unpublish before any real launch.
//   node scripts/seed-40under40.mjs
import 'dotenv/config';
import fs from 'fs';
import { savePost } from '../lib/post-write.js';

const MD = 'C:/Users/kolhe/Downloads/TSD-40under40-2026-FULL.md';
const lines = fs.readFileSync(MD, 'utf8').split(/\r?\n/);

const entries = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^###\s+(\d+)\.\s+(.+?)\s+—\s+(.+?)\s+[✅⚠️]/u);
  if (!m) continue;
  const [, rank, name, industry] = m;
  const country = (lines[i].match(/\*\(([^·)]+?)\s*[·)]/) || [])[1]?.trim() || '';
  // bio = next non-empty, non-heading line
  let bio = '';
  for (let j = i + 1; j < lines.length; j++) {
    const t = lines[j].trim();
    if (!t) continue;
    if (t.startsWith('#') || t.startsWith('---') || t.startsWith('>')) break;
    bio = t;
    break;
  }
  entries.push({
    rank: parseInt(rank),
    person_name: name.trim(),
    person_title: industry.trim(),
    company: country,
    bio,
  });
}

console.log(`parsed ${entries.length} entries`);

const intro =
  '<p>The most consequential business leaders under forty are no longer waiting their turn — they are rewriting the rules. This 2026 edition of <em>40 Under 40</em> spans six continents and more than a dozen industries: the AI labs racing toward superintelligence, the fintechs banking the next billion people, China&rsquo;s robotics vanguard, Latin America&rsquo;s super-apps, Africa&rsquo;s payment rails, and the creator economy&rsquo;s first true moguls. They are listed below by region.</p>';

const res = await savePost(
  {
    title: '40 Under 40: The Global Executives to Watch in 2026',
    subtitle:
      'Forty founders and operators under forty — across six continents and a dozen industries — already rewriting the rules the rest of business plays by.',
    content: intro,
    excerpt:
      'The 2026 40 Under 40 — forty founders and operators under 40 across six continents, from AI and fintech to robotics, food-tech and the creator economy.',
    post_type: 'ranking',
    status: 'published',
    promotion: 'featured',
    seo_title: '40 Under 40 2026: Global Executives to Watch',
    meta_description:
      'The 2026 40 Under 40 — forty founders and operators under 40 across six continents, from AI and fintech to robotics, food-tech and the creator economy.',
    primary_keyword: '40 Under 40 executives to watch 2026',
    secondary_keywords: ['young business leaders 2026', 'top founders under 40', 'global founders to watch'],
    ranking_entries: entries,
  },
  null,
);

console.log('✓ seeded ranking:', res.slug, '(', entries.length, 'entries )');
console.log('  view: /article/' + res.slug);
