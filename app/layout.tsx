import './global.css';
import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from './components/nav';
import Footer from './components/footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cn } from '@/lib/cn';
import { SITE_URL } from '@/lib/site';

// If you want explicit control:
// export const revalidate = 300; // or leave to defaults

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Nick Treffiletti — Platform Architecture & Engineering',
    template: '%s | Nick Treffiletti — Platform Architecture & Engineering',
  },
  description:
    'Opinionated essays on platform architecture, developer platforms, and cloud-native ops.',
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/rss' },
  },
  openGraph: {
    title: 'Nick Treffiletti — Platform Architecture & Engineering',
    description:
      'Opinionated essays on platform architecture, developer platforms, and cloud-native ops.',
    url: SITE_URL,
    siteName: 'Nick Treffiletti — Platform Architecture & Engineering',
    locale: 'en_US',
    type: 'website',
    images: [{ url: `${SITE_URL}/og`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nick Treffiletti — Platform Architecture & Engineering',
    description:
      'Opinionated essays on platform architecture, developer platforms, and cloud-native ops.',
    images: [`${SITE_URL}/og`],
  },
  authors: [{ name: 'Nick Treffiletti', url: SITE_URL }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // When you add GSC verification, drop the token here:
  verification: {
    google: 'TmzlnEmspSSOIbkSu1YU5w-d_i8fDrEhIXnqlhcx1dY',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={cn(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable,
      )}
    >
      <head>
        {process.env.NODE_ENV === 'production' && (
          <script
            data-goatcounter="https://nicktreffiletti.goatcounter.com/count"
            async
            src="//gc.zgo.at/count.js"
          />
        )}
      </head>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto font-sans">
        {/* Accessible skip link */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50
                     rounded bg-neutral-900 text-white px-3 py-2 text-sm"
        >
          Skip to content
        </a>

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': `${SITE_URL}/#person`,
              name: 'Nick Treffiletti',
              alternateName: 'Nicholas Treffiletti',
              url: SITE_URL,
              sameAs: [
                'https://linkedin.com/in/nicktreffiletti',
                'https://github.com/treffiletti',
                'https://medium.com/@newyorknick',
              ],
            }),
          }}
        />

        <header>
          <Navbar />
        </header>

        <main id="content" className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {children}
        </main>

        <footer>
          <Footer />
        </footer>

        {/* keep these late in the body */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
