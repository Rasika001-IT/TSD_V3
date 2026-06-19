/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Featured/inline images are served from the R2 CDN domain after migration.
    // WordPress host is kept ONLY as a transitional fallback during cutover; remove post-cutover.
    remotePatterns: [
      { protocol: 'https', hostname: 'media.thesuccessdigest.org' },
      { protocol: 'https', hostname: 'thesuccessdigest.com' },
    ],
  },
};

export default nextConfig;
