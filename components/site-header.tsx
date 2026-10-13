'use client';

import { useEffect, useState } from 'react';
import { ModeToggle } from '@/components/mode-toggle';
import { nav, profile } from '@/lib/data';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((node): node is HTMLElement => node !== null);
    if (!sections.length) return;

    // A section is "active" while it crosses a thin band just above the middle of the viewport.
    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        });
        const current = sections.filter((node) => inBand.has(node.id)).pop();
        setActive(current ? `#${current.id}` : null);
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md transition-colors duration-300',
        scrolled ? 'border-border' : 'border-transparent'
      )}
    >
      <div className="container-page flex h-14 items-center justify-between gap-3">
        <a
          href="#top"
          aria-label={`${profile.name}, back to top`}
          className="-ml-1 shrink-0 rounded-md px-1 py-2 font-mono text-[13px] tracking-tight text-foreground transition-colors hover:text-accent"
        >
          <span className="sm:hidden">{profile.shortName.toLowerCase()}</span>
          <span className="hidden sm:inline">{profile.name.toLowerCase()}</span>
        </a>

        <div className="flex min-w-0 items-center gap-1 sm:gap-3">
          <nav aria-label="Primary">
            <ul className="flex items-center sm:gap-2">
              {nav.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'relative block rounded-md px-1.5 py-2 text-[13px] lowercase transition-colors sm:px-2 sm:text-sm',
                        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          'absolute inset-x-1.5 bottom-1 h-px origin-left bg-accent transition-transform duration-300 sm:inset-x-2',
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
