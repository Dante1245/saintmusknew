/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: [
        "https://9000-firebase-studio-1754877362664.cluster-64pjnskmlbaxowh5lzq6i7v4ra.cloudworkstations.dev",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.coingecko.com',
      },
      {
        protocol: 'https',
        hostname: 'min-api.cryptocompare.com',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
};

export default nextConfig;
