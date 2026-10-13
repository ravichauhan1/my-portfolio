import nodemailer from 'nodemailer';
import type { ContactInput } from '@/lib/contact-schema';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

// Keeps user input out of mail headers.
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

export async function sendContactEmail({ name, email, message }: ContactInput): Promise<void> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!user || !pass || !to) {
    throw new Error('SMTP_USER, SMTP_APP_PASSWORD or CONTACT_TO_EMAIL is not set');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });

  const safeName = oneLine(name);

  await transporter.sendMail({
    from: `"Portfolio contact form" <${user}>`,
    to,
    replyTo: { name: safeName, address: email },
    subject: `New portfolio message from ${safeName}`,
    text: `Name: ${safeName}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(safeName)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });
}
