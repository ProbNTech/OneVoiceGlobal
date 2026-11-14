// Tailwind runs through PostCSS so it works under both Turbopack (next dev) and webpack (next build --webpack,
// which Hostinger needs because its WebAssembly fallback compiler cannot run Turbopack).
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
