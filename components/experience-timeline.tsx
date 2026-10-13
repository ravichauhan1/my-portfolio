import { Reveal } from '@/components/reveal';
import { Section } from '@/components/section';
import { experience } from '@/lib/data';

export function ExperienceTimeline() {
  if (experience.length === 0) return null;

  return (
    <Section
      id="experience"
      index="04"
      label="Experience"
      title={
        <>
          Where I’ve <span className="accent-word">worked</span>
        </>
      }
    >
      <ol className="ml-1 border-l">
        {experience.map((item, i) => (
          <li
            key={`${item.company}-${item.period}`}
            className="relative pb-10 pl-6 last:pb-0 sm:pl-8"
          >
            <span
              aria-hidden
              className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-accent ring-4 ring-background"
            />
            <Reveal delay={i * 80}>
              <div className="grid gap-x-8 gap-y-2 md:grid-cols-[170px_minmax(0,1fr)]">
                <p className="pt-0.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {item.period}
                </p>
                <div>
                  <h3 className="font-medium">
                    {item.role}
                    <span className="font-normal text-muted-foreground"> · {item.company}</span>
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-sm leading-6 text-muted-foreground">
                    {item.summary}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
