import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        qualities: [75, 100],
        localPatterns: [
            {
                pathname: '/images/**',
            },
        ],
    },
}

export default nextConfig
