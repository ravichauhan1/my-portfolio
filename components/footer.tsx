import { Github, Linkedin, Mail, Youtube } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built with Next.js, Tailwind CSS, and shadcn/ui.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/ravichauhan1" target="_blank" rel="noreferrer">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="https://www.linkedin.com/in/ravixc1" target="_blank" rel="noreferrer">
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href="https://www.youtube.com/@codewithravi_js" target="_blank" rel="noreferrer">
            <Youtube className="h-5 w-5" />
          </Link>
          <Link href="mailto:ravixc1@gmail.com">
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}