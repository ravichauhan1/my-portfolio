import Image from 'next/image';
import { ArrowRight, Github, Linkedin, Mail, Youtube, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { facts, profile, socials, type SocialKey } from '@/lib/data';

const socialIcons: Record<SocialKey, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  email: Mail,
};

export function Hero() {
  const firstName = profile.name.split(' ')[0];

  // "Software Engineer" -> "Software" + accented "engineer".
  const roleWords = profile.role.toLowerCase().split(' ');
  const roleAccent = roleWords.pop();
  const roleLead = roleWords.join(' ');
  const roleLeadText = roleLead.charAt(0).toUpperCase() + roleLead.slice(1);

  const chip = `${profile.experience.replace('years', 'yrs')} · ${profile.location.replace('India', 'IN')}`;

  return (
    <section id="top" aria-labelledby="hero-title" className="pb-12 pt-12 sm:pb-24 sm:pt-20">
      <div className="container-page">
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-10">
          <div className="order-2 md:order-1">
            <Reveal>
              <p className="hidden items-center gap-2.5 rounded-full border bg-card md:inline-flex px-3 py-1.5 font-mono text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                Available for work
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1
                id="hero-title"
                className="text-[clamp(1.875rem,9.5vw,2.25rem)] font-semibold leading-[1.1] tracking-tight md:mt-6 md:text-5xl md:leading-[1.08]"
              >
                Hi, I’m {firstName}.
                <span className="mt-1 block text-muted-foreground">
                  {roleLeadText} <span className="accent-word">{roleAccent}</span>.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-[52ch] leading-relaxed text-muted-foreground sm:leading-relaxed">
                {profile.tagline}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn btn-primary group">
                  Get in touch
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden
                  />
                </a>
                <a href="#stack" className="btn btn-ghost">
                  View stack
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="-ml-2 mt-8 flex items-center gap-1">
                {socials.map((social) => {
                  const Icon = socialIcons[social.key];
                  const external = !social.href.startsWith('mailto:');
                  return (
                    <li key={social.key}>
                      <a
                        href={social.href}
                        aria-label={`${social.label}: ${social.handle}`}
                        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-accent"
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120} className="order-1 md:order-2 md:justify-self-end">
            <div className="relative w-40 sm:w-48 md:mr-3.5 md:w-[280px] lg:w-[300px]">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-full border border-accent/60 md:translate-x-3.5 md:translate-y-3.5 md:rounded-2xl"
              />
              <div className="relative aspect-square overflow-hidden rounded-full border bg-muted md:aspect-[4/5] md:rounded-2xl">
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}, ${profile.role.toLowerCase()} based in ${profile.location}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 300px, (min-width: 768px) 280px, 192px"
                  className="origin-[32%_14%] scale-[1.4] object-cover md:scale-100 md:object-[50%_20%]"
                />
              </div>
              <p className="card absolute hidden whitespace-nowrap md:block px-3 py-2 font-mono text-[11px] text-muted-foreground md:-left-6 md:bottom-6 md:text-xs">
                <span className="text-accent" aria-hidden>
                  ●{' '}
                </span>
                {chip}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border bg-border sm:mt-14 md:mt-20 md:grid-cols-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-5 bg-background px-4 py-3.5 md:block md:px-5 md:py-5"
              >
                <dt className="eyebrow shrink-0">{fact.label}</dt>
                <dd className="text-right text-sm font-medium leading-snug text-foreground md:mt-2 md:text-left">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
