/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack doesn't support this option yet, but it's good to have for Webpack
  // and future compatibility.
  experimental: {
    allowedDevOrigins: [
      'https://*.googleusercontent.com',
      'https://*.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
