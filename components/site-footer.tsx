import { profile, socials } from '@/lib/data';

const linkClass = 'inline-block py-1.5 text-muted-foreground transition-colors hover:text-foreground';

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container-page flex flex-col gap-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {socials.map((social) => {
            const external = !social.href.startsWith('mailto:');
            return (
              <li key={social.key}>
                <a
                  href={social.href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className={linkClass}
                >
                  {social.label.toLowerCase()}
                  <span aria-hidden className="ml-1 text-xs">
                    ↗
                  </span>
                </a>
              </li>
            );
          })}
          <li>
            <a href="#top" className={linkClass}>
              back to top
              <span aria-hidden className="ml-1 text-xs">
                ↑
              </span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
