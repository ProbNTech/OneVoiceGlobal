import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { siteConfig } from "@/config/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/**
 * Body typeface. Variable font, loaded as a CSS variable so the design tokens
 * in globals.css can reference it (`--font-inter`).
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Display / heading typeface.
 */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "OneVoice Global Foundation | Empowering People, Building Skills",
    template: "%s | OneVoice Global Foundation",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    title: "OneVoice Global Foundation",
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#103d63",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
