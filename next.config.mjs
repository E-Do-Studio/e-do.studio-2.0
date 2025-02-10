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
        pathname: '/api/images/**',
      },
      {
        protocol: 'https',
        hostname: 'superb-travesseiro-87230d.netlify.app',
      },
      {
        protocol: 'https',
        hostname: 'api.cappasity.com',
      },
    ],
    domains: ['localhost', '127.0.0.1', 'superb-travesseiro-87230d.netlify.app'],
  },
  // Your Next.js config here
}

export default withPayload(nextConfig)
