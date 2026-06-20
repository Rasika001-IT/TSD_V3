// Create a CMS editor account in Supabase Auth + a profiles row.
//   node scripts/create-admin.mjs <email> <password> [role]
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const [email, password, role = 'admin'] = process.argv.slice(2);
if (!email || !password) {
  console.error('usage: node scripts/create-admin.mjs <email> <password> [role]');
  process.exit(1);
}

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const { data, error } = await db.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});
if (error) {
  console.error('createUser failed:', error.message);
  process.exit(1);
}

const { error: pErr } = await db.from('profiles').upsert({ id: data.user.id, email, role });
if (pErr) console.warn('profiles upsert warning:', pErr.message);

console.log(`✓ created ${role} editor: ${email}`);
