/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable static export for Netlify
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // SEO and performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Note: Custom headers are handled by netlify.toml for static export
}

module.exports = nextConfig
