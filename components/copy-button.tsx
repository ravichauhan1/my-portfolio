'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

type State = 'idle' | 'copied' | 'failed';

export function CopyButton({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const [state, setState] = useState<State>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const id = window.setTimeout(() => setState('idle'), 2200);
    return () => window.clearTimeout(id);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState('copied');
    } catch {
      setState('failed');
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border px-2.5 font-mono text-xs transition-colors',
        state === 'copied'
          ? 'border-success/40 text-success'
          : 'text-muted-foreground hover:border-foreground/30 hover:bg-muted hover:text-foreground',
        className
      )}
    >
      {state === 'copied' ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
      )}
      <span aria-hidden="true">
        {state === 'copied' ? 'copied' : state === 'failed' ? 'select it' : 'copy'}
      </span>
      <span className="sr-only" role="status">
        {state === 'copied'
          ? `${label} copied to clipboard`
          : state === 'failed'
            ? `Could not copy. Select the ${label.toLowerCase()} by hand.`
            : `Copy ${label.toLowerCase()}`}
      </span>
    </button>
  );
}
