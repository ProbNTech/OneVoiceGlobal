// Plain JavaScript rather than TypeScript: Hostinger's build servers have an old glibc, so Next.js falls back to
// its WebAssembly compiler there, and that compiler cannot load a next.config.ts.

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Next 16 only serves qualities that are declared here.
    qualities: [75, 80, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
