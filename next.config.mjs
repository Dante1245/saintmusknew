
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'api.qrserver.com' },
            { protocol: 'https', hostname: 'coin-images.coingecko.com' },
            { protocol: 'https', hostname: 'assets.coingecko.com' },
            { protocol: 'https', hostname: 'images.cryptocompare.com' },
            { protocol: 'https', hostname: 'randomuser.me' },
        ],
    },
};

export default nextConfig;
