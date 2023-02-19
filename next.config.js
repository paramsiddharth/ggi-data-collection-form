require('./src/lib/init');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/not-found',
        destination: '/404'
      }
    ];
  }
};

module.exports = nextConfig;
