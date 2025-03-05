/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      process.env.PAYLOAD_PUBLIC_SERVER_URL?.replace(/https?:\/\//, '')
    ].filter(Boolean),
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  // Optimisation du chargement des ressources
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  // Optimisation du préchargement des ressources
  onDemandEntries: {
    // Période pendant laquelle une page doit rester en mémoire
    maxInactiveAge: 25 * 1000,
    // Nombre de pages à garder en mémoire
    pagesBufferLength: 2,
  },
}

export default nextConfig 