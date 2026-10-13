import { Reveal } from '@/components/reveal';
import { Section } from '@/components/section';
import { profile } from '@/lib/data';
import { cn } from '@/lib/utils';

export function About() {
  return (
    <Section
      id="about"
      index="01"
      label="About"
      title={
        <>
          An engineer for the <span className="accent-word">whole</span> product
        </>
      }
    >
      <div className="max-w-[62ch] space-y-5">
        {profile.about.map((paragraph, i) => (
          <Reveal key={paragraph} delay={i * 80}>
            <p
              className={cn(
                i === 0
                  ? 'text-lg leading-relaxed text-foreground sm:text-xl sm:leading-relaxed'
                  : 'text-base leading-7 text-muted-foreground'
              )}
            >
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
