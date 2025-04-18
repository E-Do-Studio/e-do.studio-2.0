import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.citypng.com',
      },
      {
        protocol: 'https',
        hostname: 'e7.pngegg.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'e-do.studio',
      },
      {
        protocol: 'https',
        hostname: 'e-do.studio/admin',
      },
      {
        protocol: 'https',
        hostname: 'api.cappasity.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    domains: ['localhost', '127.0.0.1', 'e-do.studio'],
  },
  // Your Next.js config here
}

export default withPayload(nextConfig)
