import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSessionUser } from '@/lib/supabase-server';
import { slugify } from '@/lib/slug';

// Trim env values — a trailing space/newline pasted into the host's env vars
// makes the AWS SDK compute a bad signature ("signature does not match").
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${(process.env.R2_ACCOUNT_ID || '').trim()}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: (process.env.R2_ACCESS_KEY_ID || '').trim(),
    secretAccessKey: (process.env.R2_SECRET_ACCESS_KEY || '').trim(),
  },
});

export async function POST(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = (file.name?.split('.').pop() || 'jpg').toLowerCase();
    const baseName = slugify(file.name?.replace(/\.[^.]+$/, '') || 'image') || 'image';
    const key = `uploads/${Date.now()}-${baseName}.${ext}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type || 'image/jpeg',
      }),
    );

    const url = `${process.env.R2_PUBLIC_BASE.replace(/\/$/, '')}/${key}`;
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Upload failed' }, { status: 500 });
  }
}
