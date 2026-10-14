import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

// Fonts are bundled in app/fonts so builds never depend on reaching Google Fonts.
const sans = localFont({
  src: './fonts/plus-jakarta-sans-var.woff2',
  weight: '200 800',
  variable: '--font-sans',
});
const mono = localFont({
  src: './fonts/jetbrains-mono-var.woff2',
  weight: '100 800',
  variable: '--font-mono',
});
const serif = localFont({
  src: [
    { path: './fonts/instrument-serif-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-serif-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
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
