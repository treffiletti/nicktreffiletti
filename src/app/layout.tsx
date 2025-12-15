import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import type React from "react";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/cn";

const InterVariable = localFont({
  variable: "--font-inter",
  src: [
    { path: "./InterVariable.woff2", style: "normal" },
    { path: "./InterVariable-Italic.woff2", style: "italic" },
  ],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nick Treffiletti — Platform Architecture & Engineering",
    template: "%s | Nick Treffiletti — Platform Architecture & Engineering",
  },
  description:
    "Opinionated essays on platform architecture, developer platforms, and cloud-native ops.",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/rss" },
  },
  openGraph: {
    title: "Nick Treffiletti — Platform Architecture & Engineering",
    description:
      "Opinionated essays on platform architecture, developer platforms, and cloud-native ops.",
    url: SITE_URL,
    siteName: "Nick Treffiletti — Platform Architecture & Engineering",
    locale: "en_US",
    type: "website",
    images: [{ url: `${SITE_URL}/og`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nick Treffiletti — Platform Architecture & Engineering",
    description:
      "Opinionated essays on platform architecture, developer platforms, and cloud-native ops.",
    images: [`${SITE_URL}/og`],
  },
  authors: [{ name: "Nick Treffiletti", url: SITE_URL }],
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
  verification: {
    google: "TmzlnEmspSSOIbkSu1YU5w-d_i8fDrEhIXnqlhcx1dY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={cn(
        GeistMono.variable,
        GeistSans.variable,
        InterVariable.variable,
        "scroll-pt-16 font-sans antialiased dark:bg-gray-950",
      )}
    >
      <head>
        {process.env.NODE_ENV === "production" && (
          <script
            data-goatcounter="https://analytics.nicktreffiletti.com/count"
            async
            src="//gc.zgo.at/count.js"
          ></script>
        )}
      </head>
      <body>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${SITE_URL}/#person`,
              name: "Nick Treffiletti",
              alternateName: "Nicholas Treffiletti",
              url: SITE_URL,
              sameAs: [
                "https://linkedin.com/in/nicktreffiletti",
                "https://github.com/treffiletti",
                "https://medium.com/@newyorknick",
              ],
            }),
          }}
        />
        <div className="isolate">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
