'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Section } from '@/components/section';
import { profile } from '@/lib/data';
import { cn } from '@/lib/utils';

interface Day {
  date: string;
  count: number;
  level: number;
}

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; days: Day[]; total: number };

interface Week {
  days: (Day | null)[];
  month: string | null;
}

const PROFILE_URL = `https://github.com/${profile.githubUsername}`;
const API_URL = `https://github-contributions-api.jogruber.de/v4/${profile.githubUsername}?y=last`;

const LEVELS = ['bg-muted', 'bg-accent/25', 'bg-accent/40', 'bg-accent/70', 'bg-accent'];
const CELL = 'h-[11px] w-[11px] shrink-0 rounded-[3px]';
const SKELETON_WEEKS = 53;

const dayFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});
const monthFormat = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' });
const numberFormat = new Intl.NumberFormat('en-IN');

function toDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`);
}

function isDay(value: unknown): value is Day {
  if (typeof value !== 'object' || value === null) return false;
  const day = value as Record<string, unknown>;
  return (
    typeof day.date === 'string' &&
    !Number.isNaN(toDate(day.date).getTime()) &&
    typeof day.count === 'number' &&
    typeof day.level === 'number'
  );
}

function cellTitle(day: Day) {
  const date = dayFormat.format(toDate(day.date));
  if (day.count === 0) return `No contributions on ${date}`;
  return `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${date}`;
}

// Columns are weeks (Sunday first), padded so every column has seven rows.
function toWeeks(days: Day[]): Week[] {
  const cells: (Day | null)[] = [
    ...Array<null>(toDate(days[0].date).getUTCDay()).fill(null),
    ...days,
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: Week[] = [];
  let lastMonth = -1;
  let lastLabelAt = -10;

  for (let i = 0; i < cells.length; i += 7) {
    const week = cells.slice(i, i + 7);
    const first = week.find((day): day is Day => day !== null);
    let month: string | null = null;

    if (first) {
      const date = toDate(first.date);
      const index = weeks.length;
      if (date.getUTCMonth() !== lastMonth) {
        // Skip a label that would collide with the previous one.
        if (index - lastLabelAt >= 3) {
          month = monthFormat.format(date);
          lastLabelAt = index;
        }
        lastMonth = date.getUTCMonth();
      }
    }
    weeks.push({ days: week, month });
  }

  // A label in the final columns would overflow the grid.
  const tail = weeks.slice(-2);
  tail.forEach((week) => {
    week.month = null;
  });

  return weeks;
}

export function GithubActivity() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return response.json();
      })
      .then((data: { total?: { lastYear?: unknown }; contributions?: unknown }) => {
        const days = Array.isArray(data.contributions) ? data.contributions.filter(isDay) : [];
        if (days.length === 0) throw new Error('No contribution data');
        const reported = data.total?.lastYear;
        const total =
          typeof reported === 'number' ? reported : days.reduce((sum, day) => sum + day.count, 0);
        setState({ status: 'ready', days, total });
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error' });
      });

    return () => controller.abort();
  }, []);

  const weeks = useMemo(() => (state.status === 'ready' ? toWeeks(state.days) : []), [state]);

  // On narrow screens the grid scrolls inside the card; start at the most recent weeks.
  useEffect(() => {
    const node = scroller.current;
    if (node) node.scrollLeft = node.scrollWidth;
  }, [state.status]);

  return (
    <Section
      id="activity"
      index="02"
      label="Activity"
      title={
        <>
          GitHub <span className="accent-word">activity</span>
        </>
      }
      description="Contributions over the last year."
      action={
        <a href={PROFILE_URL} target="_blank" rel="noreferrer" className="link font-mono text-sm">
          github.com/{profile.githubUsername} <span aria-hidden>↗</span>
        </a>
      }
    >
      <div className="card p-4 sm:p-6">
        {state.status === 'error' ? (
          <p className="text-sm text-muted-foreground">
            The contribution graph couldn’t be loaded right now. You can see it on{' '}
            <a href={PROFILE_URL} target="_blank" rel="noreferrer" className="link">
              my GitHub profile <span aria-hidden>↗</span>
            </a>
            .
          </p>
        ) : (
          <>
            <div
              ref={scroller}
              tabIndex={0}
              role="group"
              aria-label="Contribution heatmap, scrollable"
              aria-busy={state.status === 'loading'}
              className="overflow-x-auto rounded-md pb-2"
            >
              {state.status === 'ready' ? (
                <div className="mx-auto w-max">
                  <div aria-hidden className="flex h-5 gap-[3px]">
                    {weeks.map((week, i) => (
                      <div
                        key={i}
                        className="w-[11px] shrink-0 whitespace-nowrap font-mono text-[10px] leading-none text-muted-foreground"
                      >
                        {week.month}
                      </div>
                    ))}
                  </div>
                  <div
                    role="img"
                    aria-label={`${numberFormat.format(state.total)} contributions in the last year`}
                    className="flex gap-[3px]"
                  >
                    {weeks.map((week, i) => (
                      <div key={i} className="flex flex-col gap-[3px]">
                        {week.days.map((day, j) =>
                          day ? (
                            <div
                              key={day.date}
                              title={cellTitle(day)}
                              className={cn(CELL, LEVELS[Math.min(4, Math.max(0, day.level))])}
                            />
                          ) : (
                            <div key={j} className={CELL} />
                          )
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div aria-hidden className="mx-auto w-max motion-safe:animate-pulse">
                  <div className="h-5" />
                  <div className="flex gap-[3px]">
                    {Array.from({ length: SKELETON_WEEKS }, (_, i) => (
                      <div key={i} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }, (_, j) => (
                          <div key={j} className={cn(CELL, 'bg-muted')} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <p className="min-h-[1rem]" aria-live="polite">
                {state.status === 'ready' ? (
                  <>
                    <span className="font-medium text-foreground">
                      {numberFormat.format(state.total)}
                    </span>{' '}
                    contributions in the last year
                  </>
                ) : (
                  <span className="sr-only">Loading contributions</span>
                )}
              </p>
              <div aria-hidden className="flex items-center gap-[3px] font-mono">
                <span className="mr-1.5">less</span>
                {LEVELS.map((level) => (
                  <span key={level} className={cn(CELL, level)} />
                ))}
                <span className="ml-1.5">more</span>
              </div>
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
