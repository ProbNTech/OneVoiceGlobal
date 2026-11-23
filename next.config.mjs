// Plain JavaScript rather than TypeScript: Hostinger's build servers have an old glibc, so Next.js falls back to
// its WebAssembly compiler there, and that compiler cannot load a next.config.ts.

/*
 * The site runs on shared Business Web Hosting, which caps how many
 * processes (and threads) the account may run at once. The client reported
 * on 14 November 2026 that the site was slow and close to that cap, so the
 * settings below keep the server's own work small:
 *
 * - Images. The image optimiser resizes each photograph the first time a
 *   size of it is asked for, then serves it from its disk cache. It used to
 *   encode AVIF as well as WebP; AVIF takes several times longer on a shared
 *   CPU (long enough to hit the optimiser's timeout), so only WebP is made,
 *   which every current browser shows. Sharp, which does the resizing, used
 *   to start a thread for every two CPU cores the server reports; on shared
 *   hosting that can be dozens per image, and each one counts against the
 *   account's process limit, so it now works on one thread. Fewer widths mean
 *   fewer copies of each photograph to make, and the cache keeps each copy
 *   for 30 days instead of 4 hours, so photographs are not remade all day.
 * - Builds use two workers rather than one per CPU core, for the same limit.
 */

/*
 * Search engines (23 November 2026). The site lives at
 * https://onevoiceglobal.org.uk, without "www". The same code is also
 * deployed on Vercel at one-voice-global.vercel.app, and Hostinger can serve
 * it on a temporary *.hostingersite.com address. Those copies must not
 * compete with the real site:
 *
 * - www.onevoiceglobal.org.uk redirects permanently (308) to the same page
 *   without "www". The rule matches the Host header only, so if a host never
 *   sends that name it simply never fires.
 * - Every response from a Vercel deployment, or from a *.vercel.app or
 *   *.hostingersite.com address, carries "X-Robots-Tag: noindex", which also
 *   covers images. The pages there carry a noindex meta tag too, and every
 *   page's canonical link points at onevoiceglobal.org.uk (src/lib/seo.ts).
 *   Positive matches only: a rule keyed to "any host but the real one" could
 *   noindex the live site if the hosting proxy ever rewrote the Host header.
 */
const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // The form's Google Sheets and email libraries are loaded by Node from node_modules rather than bundled.
  // On Hostinger's build (webpack, WebAssembly compiler) the bundled copy of gaxios, which googleapis uses for
  // its requests, came out broken ("Gaxios is not a constructor"), so every form submission failed with a
  // server error (reported 14 November 2026).
  serverExternalPackages: [
    "googleapis",
    "googleapis-common",
    "google-auth-library",
    "gaxios",
    "gcp-metadata",
    "nodemailer",
  ],
  images: {
    // Next 16 only serves qualities that are declared here.
    qualities: [75, 80, 90],
    formats: ["image/webp"],
    // Phones at 2x ask for 828 or 1080; full-width photographs top out at 1920.
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.onevoiceglobal.org.uk" }],
        destination: "https://onevoiceglobal.org.uk/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    if (process.env.VERCEL) return [{ source: "/:path*", headers: noindex }];
    return [
      { source: "/:path*", has: [{ type: "host", value: "(?<vercel>.+)\\.vercel\\.app" }], headers: noindex },
      { source: "/:path*", has: [{ type: "host", value: "(?<temporary>.+)\\.hostingersite\\.com" }], headers: noindex },
    ];
  },
  experimental: {
    imgOptConcurrency: 1,
    cpus: 2,
  },
};

export default nextConfig;
