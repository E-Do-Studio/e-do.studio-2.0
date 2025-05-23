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
        pathname: '/api/assets/**',
      },
      { protocol: 'https', hostname: 'e-do.studio' },
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
        port: '3000',
      },
      {
        protocol: 'http',
        hostname: '195.35.25.154',
      },
      {
        protocol: 'https',
        hostname: '195.35.25.154',
      },
      {
        protocol: 'https',
        hostname: 'cdn.brandfetch.io',
      },
    ],
    domains: ['localhost', '127.0.0.1', '195.35.25.154', 'e-do.studio'],
  },
};

export default withPayload(nextConfig);

