/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // cacheComponents intentionally left off (its default): this app has no
  // dynamic routes or data fetching, and as of Next 16 the flag has open
  // bugs interacting with output:'export'. See
  // docs/superpowers/specs/2026-08-23-portfolio-design.md ("Architecture").
};

export default nextConfig;
