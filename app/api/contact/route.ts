import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import { Contact } from '@/lib/models/contact.model';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';
import { sendContactEmail } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 16 * 1024;

function fail(status: number, error: string, fields?: Record<string, string>) {
  return NextResponse.json({ ok: false, error, ...(fields ? { fields } : {}) }, { status });
}

async function saveContact(data: ContactInput) {
  await dbConnect();
  await Contact.create(data);
}

function failureName(reason: unknown) {
  return reason instanceof Error ? reason.name : 'unknown';
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return fail(415, 'Send the form as JSON.');
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return fail(413, 'That message is too large.');
    }
    body = JSON.parse(raw);
  } catch {
    return fail(400, 'The request body is not valid JSON.');
  }

  // Honeypot: real visitors never see or fill this field.
  if (
    body !== null &&
    typeof body === 'object' &&
    typeof (body as Record<string, unknown>).company === 'string' &&
    (body as Record<string, string>).company.length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!fields[key]) fields[key] = issue.message;
    }
    return fail(400, 'Please check the highlighted fields.', fields);
  }

  // Email and database are independent: the submission succeeds if either one works.
  const [emailed, saved] = await Promise.allSettled([
    sendContactEmail(parsed.data),
    saveContact(parsed.data),
  ]);

  // Log the failure type only; never credentials or the message body.
  if (emailed.status === 'rejected') {
    console.error('contact: email not sent:', failureName(emailed.reason));
  }
  if (saved.status === 'rejected') {
    console.error('contact: message not saved:', failureName(saved.reason));
  }

  if (emailed.status === 'rejected' && saved.status === 'rejected') {
    return fail(500, 'The message could not be sent. Please try again or use email.');
  }

  return NextResponse.json({ ok: true });
}
