import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "OneVoice Global Foundation | Empowering People. Building Skills. Creating Opportunities.",
    template: "%s | OneVoice Global Foundation",
  },
  description:
    "OneVoice Skill Development Centre supports people from ethnic minority, disadvantaged and underserved communities across London to develop skills, build confidence, access employment and connect with their communities.",
  applicationName: siteConfig.name,
  openGraph: {
    title: "OneVoice Global Foundation",
    description: "Stronger Communities, Shared Opportunities, One World.",
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
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
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
