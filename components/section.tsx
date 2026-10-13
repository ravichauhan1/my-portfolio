import { cn } from '@/lib/utils';
import { Reveal } from '@/components/reveal';

export function Section({
  id,
  index,
  label,
  title,
  description,
  action,
  children,
  className,
}: {
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('section', className)}>
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">
            <span className="text-accent">{index}</span>
            <span aria-hidden className="mx-2 text-border">/</span>
            {label}
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <div>
              <h2 id={`${id}-title`} className="section-title">
                {title}
              </h2>
              {description && <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>}
            </div>
            {action}
          </div>
        </Reveal>
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}
