import fs from 'fs';
import path from 'path';

const files = [];
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(jsx?|js)$/.test(e.name)) files.push(p);
  });
walk('components');
walk('views');

let n = 0;
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  if (!/const\s+stripHtml\s*=/.test(s)) continue;
  const orig = s;

  // remove the local stripHtml arrow-function (createElement OR DOMParser variant)
  s = s.replace(/const\s+stripHtml\s*=\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\n\};\n?/g, '');

  // relative import path to utils/stripHtml
  let rel = path.relative(path.dirname(f), path.join('utils', 'stripHtml')).split(path.sep).join('/');
  if (!rel.startsWith('.')) rel = './' + rel;
  const importLine = `import { stripHtml } from "${rel}";\n`;

  if (!/utils\/stripHtml/.test(s)) {
    if (/^["']use client["'];?\n/.test(s)) s = s.replace(/^(["']use client["'];?\n)/, `$1${importLine}`);
    else s = importLine + s;
  }

  if (s !== orig) {
    fs.writeFileSync(f, s);
    n++;
    console.log('  ✎', f.split(path.sep).join('/'));
  }
}
console.log(`patched ${n} files`);
