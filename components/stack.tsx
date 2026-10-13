import { Reveal } from '@/components/reveal';
import { Section } from '@/components/section';
import { stack } from '@/lib/data';

export function Stack() {
  return (
    <Section
      id="stack"
      index="03"
      label="Stack"
      title={
        <>
          What I <span className="accent-word">build</span> with
        </>
      }
      description="From the browser to the cloud, and the AI layer on top."
    >
      <ol className="border-b">
        {stack.map((group, i) => (
          <li key={group.layer} className="group border-t">
            <Reveal delay={i * 80}>
              <div className="grid gap-x-8 gap-y-3 py-6 md:grid-cols-[150px_minmax(0,1fr)_minmax(0,1fr)] md:py-7">
                <h3 className="flex items-baseline gap-3 font-medium transition-colors group-hover:text-accent">
                  <span aria-hidden className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {group.layer}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">{group.summary}</p>
                <ul className="flex flex-wrap content-start gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
