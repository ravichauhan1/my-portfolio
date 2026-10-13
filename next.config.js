/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: false },
      { source: '/projects', destination: '/', permanent: false },
      { source: '/contact', destination: '/#contact', permanent: false },
    ];
  },
};

module.exports = nextConfig;
