'use client';

import { useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CircleCheck, Loader2, TriangleAlert } from 'lucide-react';
import { CONTACT_LIMITS, contactSchema, type ContactInput } from '@/lib/contact-schema';
import { profile } from '@/lib/data';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'success' | 'error';

type ApiResponse = {
  ok?: boolean;
  error?: string;
  fields?: Partial<Record<keyof ContactInput, string>>;
};

const labelClass = 'block text-sm font-medium';

function inputClass(invalid: boolean, extra?: string) {
  return cn(
    'mt-2 w-full rounded-lg border bg-card px-3.5 text-[0.9375rem] text-foreground transition-colors',
    'placeholder:text-muted-foreground/70 disabled:opacity-60',
    invalid ? 'border-destructive' : 'border-input hover:border-foreground/30',
    extra
  );
}

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState('');
  const honeypot = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', message: '' },
  });

  const messageLength = watch('message')?.length ?? 0;
  const sending = status === 'sending';

  async function onSubmit(values: ContactInput) {
    setStatus('sending');
    setServerError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company: honeypot.current?.value ?? '' }),
      });
      const result: ApiResponse = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        if (result.fields) {
          const names = Object.keys(result.fields) as (keyof ContactInput)[];
          names.forEach((name) => {
            const message = result.fields?.[name];
            if (message && name in values) setError(name, { type: 'server', message });
          });
          const first = names.find((name) => name in values);
          if (first) {
            setStatus('idle');
            setFocus(first);
            return;
          }
        }
        throw new Error(result.error || 'The message could not be sent.');
      }

      setSentTo(values.email);
      setStatus('success');
      reset();
      window.requestAnimationFrame(() => successRef.current?.focus());
    } catch (error) {
      const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
      setServerError(
        offline
          ? 'You appear to be offline, so the message was not sent.'
          : error instanceof Error && error.message && error.message !== 'Failed to fetch'
            ? error.message
            : 'The message could not be sent.'
      );
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="card p-6 outline-none sm:p-8">
        <CircleCheck className="h-6 w-6 text-success" strokeWidth={1.75} aria-hidden="true" />
        <p className="mt-4 text-lg font-semibold tracking-tight">Thanks, your message is sent.</p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
          I’ll reply to <span className="break-all font-medium text-foreground">{sentTo}</span>. If
          it’s urgent, email or call me using the details on this page.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="link mt-6 text-sm font-medium"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={sending} className="relative">
      {/* Honeypot: hidden from people and assistive tech. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input ref={honeypot} type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset disabled={sending} className="grid min-w-0 gap-x-4 gap-y-5 sm:grid-cols-2">
        <legend className="sr-only">Send a message</legend>

        <div className="min-w-0">
          <label htmlFor={fieldId('name')} className={labelClass}>
            Name
          </label>
          <input
            id={fieldId('name')}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            maxLength={CONTACT_LIMITS.name.max}
            className={inputClass(Boolean(errors.name), 'h-11')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? errorId('name') : undefined}
            {...register('name')}
          />
          <FieldError id={errorId('name')} message={errors.name?.message} />
        </div>

        <div className="min-w-0">
          <label htmlFor={fieldId('email')} className={labelClass}>
            Email
          </label>
          <input
            id={fieldId('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="name@company.com"
            maxLength={CONTACT_LIMITS.email.max}
            className={inputClass(Boolean(errors.email), 'h-11')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? errorId('email') : undefined}
            {...register('email')}
          />
          <FieldError id={errorId('email')} message={errors.email?.message} />
        </div>

        <div className="min-w-0 sm:col-span-2">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={fieldId('message')} className={labelClass}>
              Message
            </label>
            <span className="font-mono text-xs tabular-nums text-muted-foreground" aria-hidden="true">
              {messageLength} / {CONTACT_LIMITS.message.max}
            </span>
          </div>
          <textarea
            id={fieldId('message')}
            rows={6}
            placeholder="A role, a project or a question. A few lines is plenty."
            maxLength={CONTACT_LIMITS.message.max}
            className={inputClass(
              Boolean(errors.message),
              'block min-h-[9rem] resize-y py-3 leading-relaxed'
            )}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? errorId('message') : undefined}
            {...register('message')}
          />
          <FieldError id={errorId('message')} message={errors.message?.message} />
        </div>
      </fieldset>

      {status === 'error' ? (
        <div
          role="alert"
          className="mt-5 flex gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4"
        >
          <TriangleAlert
            className="mt-0.5 h-4 w-4 shrink-0 text-destructive"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <div className="min-w-0 text-sm leading-relaxed">
            <p className="font-medium text-destructive">Not sent</p>
            <p className="mt-1">
              {serverError} Your text is still in the form, so you can try again or email me at{' '}
              <a
                href={`mailto:${profile.email}`}
                className="break-all font-medium underline underline-offset-4"
              >
                {profile.email}
              </a>
              .
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <button type="submit" disabled={sending} className="btn btn-primary group w-full shrink-0 whitespace-nowrap sm:w-auto">
          {sending ? 'Sending' : status === 'error' ? 'Try again' : 'Send message'}
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          )}
        </button>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {sending ? 'Sending your message…' : 'Your details are only used to reply to you.'}
        </p>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm leading-snug text-destructive">
      {message}
    </p>
  );
}
