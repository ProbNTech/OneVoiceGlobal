import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { brand, siteUrl } from "@/data/site";
import { seo } from "@/data/seo";
import { isIndexable, pageMetadata } from "@/lib/seo";
import { orangeCssVariables } from "@/styles/brand-colours";
import "./globals.css";

/**
 * Display face for the new design: Fraunces, a soft serif. The SOFT axis
 * rounds its terminals, which is what keeps large headings gentle rather than
 * bookish; the italic carries the accent half of each two-tone title.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

/** Body and interface face for the new design. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/* The first design's faces, still used by the legacy pages. Not preloaded,
   so the redesigned pages don't download them. */
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap", preload: false });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap", preload: false });

/*
 * Site-wide defaults. Every page sets its own title, description, canonical
 * address and social cards through `pageMetadata` (src/lib/seo.ts); these
 * cover anything without them, such as the not-found page. Relative
 * addresses resolve against the real domain, onevoiceglobal.org.uk, on every
 * host, so the Vercel copy points search engines there too.
 */
const home = pageMetadata("/");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo["/"].absoluteTitle,
    template: `%s | ${brand.name}`,
  },
  description: home.description,
  applicationName: brand.name,
  openGraph: { ...home.openGraph, url: undefined },
  twitter: home.twitter,
  // Only the real site may be indexed; the Vercel copy and other staging hosts are not (see src/lib/seo.ts).
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf7f1",
};

/* Marks the page as able to run scroll reveals before it first paints, so
   nothing is hidden for visitors without JavaScript. */
const revealScript = "document.documentElement.classList.add('js-reveal')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      // The reveal script adds a class before React loads.
      suppressHydrationWarning
      className={`${fraunces.variable} ${jakarta.variable} ${inter.variable} ${manrope.variable} h-full antialiased`}
      // The brand orange, from its one home in styles/brand-colours.ts, for styles/site.css to build on.
      style={orangeCssVariables()}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
