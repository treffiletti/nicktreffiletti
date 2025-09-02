import "./global.css";
import type { Metadata } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nick Treffiletti — Platform Architecture & Engineering",
    template: "%s | Nick Treffiletti — Platform Architecture & Engineering",
  },
  description: "Opinionated essays on platform architecture, developer platforms, and cloud-native ops.",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss",
    },
  },
  openGraph: {
    title: "Nick Treffiletti — Platform Architecture & Engineering",
    description: "Opinionated essays on platform architecture, developer platforms, and cloud-native ops.",
    url: SITE_URL,
    siteName: "Nick Treffiletti — Platform Architecture & Engineering",
    locale: "en_US",
    type: "website",
  },
  // NEW: nicer Twitter cards
  twitter: {
    card: "summary_large_image",
    title: "Nick Treffiletti — Platform Architecture & Engineering",
    description: "Opinionated essays on platform architecture, developer platforms, and cloud-native ops.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx("text-black bg-white dark:text-white dark:bg-black", GeistSans.variable, GeistMono.variable)}>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive" // ensures it’s hoisted into <head> before hydration
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://www.nicktreffiletti.com/#person",
              name: "Nick Treffiletti",
              alternateName: "Nicholas Treffiletti",
              url: "https://www.nicktreffiletti.com",
              sameAs: ["https://linkedin.com/in/nicktreffiletti", "https://github.com/treffiletti", "https://medium.com/@newyorknick"],
            }),
          }}
        />
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
