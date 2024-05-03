const nextConfig = {
    images: {
        domains: [
            'c5.patreon.com',
            'images.unsplash.com',
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'c5.patreon.com',
                port: "443",
                pathname: '/upload',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: "443",
                pathname: '/photo-',
            },
        ],
    },

};

export default nextConfig;
