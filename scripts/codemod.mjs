// One-time codemod: port the copied Vite/react-router frontend to Next.js App Router.
// Run: node scripts/codemod.mjs   (idempotent-ish; safe to re-run)
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DIRS = ['components', 'views', 'hooks', 'services', 'data', 'utils'];

const walk = (d, acc = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(jsx?|js)$/.test(e.name)) acc.push(p);
  }
  return acc;
};

const navMap = { useNavigate: 'useRouter', useLocation: 'usePathname', useParams: 'useParams', useSearchParams: 'useSearchParams' };

let count = 0;
for (const dir of DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  for (const file of walk(abs)) {
    let s = fs.readFileSync(file, 'utf8');
    const orig = s;
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');

    // 1) asset imports → public string paths
    s = s.replace(/import\s+(\w+)\s+from\s+["'][^"']*\/assets\/([^"']+)["'];?/g,
      (_, name, rest) => `const ${name} = "/assets/${rest}";`);

    // 2) react-router-dom import → next/link + next/navigation
    s = s.replace(/import\s*\{([^}]*)\}\s*from\s*["']react-router-dom["'];?/g, (_, names) => {
      const list = names.split(',').map((x) => x.trim()).filter(Boolean);
      const out = [];
      if (list.some((n) => n === 'Link' || n === 'NavLink')) out.push('import Link from "next/link";');
      const nav = [...new Set(list.filter((n) => navMap[n]).map((n) => navMap[n]))];
      if (nav.length) out.push(`import { ${nav.join(', ')} } from "next/navigation";`);
      return out.join('\n');
    });

    // 3) NavLink element → Link
    s = s.replace(/<NavLink/g, '<Link').replace(/<\/NavLink>/g, '</Link>');

    // 4) JSX `to=` → `href=`
    s = s.replace(/(\s)to=(\{|")/g, '$1href=$2');

    // 5) hook call renames
    s = s.replace(/useNavigate\(\)/g, 'useRouter()').replace(/useLocation\(\)/g, 'usePathname()');

    // 6) navigate(x) → navigate.push(x)  (useRouter instance named `navigate`)
    if (/=\s*useRouter\(\)/.test(s)) {
      s = s.replace(/\bnavigate\((?!-)/g, 'navigate.push(');
    }

    // 7) usePathname returns a string → location.pathname becomes the value itself
    s = s.replace(/\blocation\.pathname\b/g, 'location');

    // 8) "use client" for interactive component/view files
    if ((rel.startsWith('components/') || rel.startsWith('views/')) &&
        /(useState|useEffect|useRef|useRouter|usePathname|useParams|onClick|onChange|onSubmit|Swiper)/.test(s) &&
        !/^['"]use client['"]/.test(s.trimStart())) {
      s = `"use client";\n${s}`;
    }

    if (s !== orig) { fs.writeFileSync(file, s); count++; console.log('  ✎', rel); }
  }
}

// services base URLs → same-origin Next API
const wp = path.join(ROOT, 'services/wordpress.js');
if (fs.existsSync(wp)) {
  let s = fs.readFileSync(wp, 'utf8');
  s = s.replace(/const\s+BASE_URL\s*=\s*import\.meta\.env\.VITE_API_URL\s*;?/,
    'const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";');
  fs.writeFileSync(wp, s);
}
const auth = path.join(ROOT, 'services/authService.js');
if (fs.existsSync(auth)) {
  let s = fs.readFileSync(auth, 'utf8');
  s = s.replace(/const\s+BASE_URL\s*=\s*["'][^"']*["'];?/, 'const BASE_URL = "/api/admin";');
  fs.writeFileSync(auth, s);
}

console.log(`\ncodemod done — ${count} files transformed`);
