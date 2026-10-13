import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  adjustFontFallback: false,
});

const title = 'Ravikishan Chauhan — Software Engineer';
const description =
  'Software engineer in New Delhi with 2.5+ years of experience building web products end to end with React, Next.js, Node.js, PostgreSQL, Docker and the cloud, and adding AI features to them.';

export const metadata: Metadata = {
  metadataBase: new URL('https://ravi-x.vercel.app'),
  title,
  description,
  authors: [{ name: 'Ravikishan Chauhan', url: 'https://github.com/ravichauhan1' }],
  openGraph: { title, description, type: 'website', images: ['/ravi.jpg'] },
  twitter: { card: 'summary', title, description, images: ['/ravi.jpg'] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} ${serif.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
