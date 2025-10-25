/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['placekitten.com', 'picsum.photos'], // Placeholder image domains
  },
}

module.exports = nextConfig