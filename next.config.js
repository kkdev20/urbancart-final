/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'picsum.photos',
      'api.lorem.space',
      'fakestoreapi.com',
      'via.placeholder.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: '**.picsum.photos',
      },
    ],
  },
};

module.exports = nextConfig;