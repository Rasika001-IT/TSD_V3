// Swap content <img> -> <SmartImage> in home-section components so R2 images
// show a skeleton until fully loaded. Targets files whose every <img> is a
// post/article image (verified by hand).
import fs from 'fs';
import path from 'path';

const files = [
  'components/sections/FeaturedArticles.jsx',
  'components/sections/BusinessFinance.jsx',
  'components/sections/MoreSections.jsx',
  'components/sections/Blogs.jsx',
  'components/sections/WomenInBusiness.jsx',
  'components/sections/women/StoryRow.jsx',
  'components/sections/women/HeroFeature.jsx',
  'components/sections/women/FeaturedStoryBlock.jsx',
  'components/featured/FeaturedCard.jsx',
  'components/featured/SmallArticleCard.jsx',
];

let n = 0;
for (const f of files) {
  if (!fs.existsSync(f)) { console.log('  - missing', f); continue; }
  let s = fs.readFileSync(f, 'utf8');
  const orig = s;

  // <img ... /> -> <SmartImage ... />  (keeps src/alt/className)
  s = s.replace(/<img\b([\s\S]*?)\/>/g, '<SmartImage$1/>');

  if (s !== orig && !/from\s+["'][^"']*ui\/SmartImage["']/.test(s)) {
    const rel = path.relative(path.dirname(f), 'components/ui/SmartImage').split(path.sep).join('/');
    const importLine = `import SmartImage from "${rel.startsWith('.') ? rel : './' + rel}";\n`;
    // insert after "use client" (these are all client components)
    s = s.replace(/^("use client";\n)/, `$1${importLine}`);
  }

  if (s !== orig) { fs.writeFileSync(f, s); n++; console.log('  ✎', f); }
}
console.log(`patched ${n} files`);
