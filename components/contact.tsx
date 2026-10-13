import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { experience, profile, socials, type SocialKey } from '@/lib/data';
import { Section } from '@/components/section';
import { Reveal } from '@/components/reveal';
import { ContactForm } from '@/components/contact-form';
import { CopyButton } from '@/components/copy-button';

const socialIcons: Record<SocialKey, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  email: Mail,
};

const iconClass = 'h-4 w-4 shrink-0 text-muted-foreground';
const rowClass = 'flex min-h-[3.25rem] items-center gap-3 px-4 py-3 sm:px-5';

export function Contact() {
  // Email already has its own row with a copy button, so it is not repeated below.
  const links = socials.filter((social) => social.key !== 'email');

  return (
    <Section
      id="contact"
      index={experience.length ? '05' : '04'}
      label="Contact"
      title={
        <>
          Let’s <span className="accent-word">talk</span>
        </>
      }
      description="Have a role or a project in mind? Send a message and I’ll reply by email."
    >
      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal className="min-w-0 lg:col-span-3">
          <ContactForm />
        </Reveal>

        <Reveal delay={100} className="min-w-0 lg:col-span-2">
          <div className="card overflow-hidden text-sm">
            <ul className="divide-y">
              <li className={rowClass}>
                <Mail className={iconClass} strokeWidth={1.75} aria-hidden="true" />
                <a href={`mailto:${profile.email}`} className="link min-w-0 flex-1 truncate py-1">
                  <span className="sr-only">Email: </span>
                  {profile.email}
                </a>
                <CopyButton value={profile.email} label="Email address" />
              </li>
              <li className={rowClass}>
                <Phone className={iconClass} strokeWidth={1.75} aria-hidden="true" />
                <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`} className="link py-1">
                  <span className="sr-only">Phone: </span>
                  {profile.phone}
                </a>
              </li>
              <li className={rowClass}>
                <MapPin className={iconClass} strokeWidth={1.75} aria-hidden="true" />
                <span>
                  <span className="sr-only">Location: </span>
                  {profile.location}
                </span>
              </li>
            </ul>

            <ul className="divide-y border-t">
              {links.map((social) => {
                const Icon = socialIcons[social.key];
                return (
                  <li key={social.key}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`${rowClass} group transition-colors hover:bg-muted/50 focus-visible:ring-inset focus-visible:ring-offset-0`}
                    >
                      <Icon className={iconClass} strokeWidth={1.75} aria-hidden="true" />
                      <span className="font-medium">{social.label}</span>
                      <span className="min-w-0 flex-1 truncate text-right font-mono text-xs text-muted-foreground">
                        {social.handle}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
