import nodemailer from 'nodemailer';

// SMTP is optional: if EMAIL_* env isn't set, email features no-op cleanly.
export const emailConfigured = () =>
  !!(process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS);

let transport;
function getTransport() {
  if (!transport) {
    transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: parseInt(process.env.EMAIL_PORT || '465') === 465,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
  }
  return transport;
}

export async function sendMail(to, subject, html) {
  if (!emailConfigured()) throw new Error('Email not configured');
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  return getTransport().sendMail({ from, to, subject, html });
}

export async function sendBulk(recipients, subject, html) {
  if (!emailConfigured()) throw new Error('Email not configured (set EMAIL_HOST/USER/PASS)');
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  const t = getTransport();
  // BCC in chunks to keep recipients private.
  const chunkSize = 90;
  let sent = 0;
  for (let i = 0; i < recipients.length; i += chunkSize) {
    const bcc = recipients.slice(i, i + chunkSize);
    await t.sendMail({ from, to: from, bcc, subject, html });
    sent += bcc.length;
  }
  return sent;
}
