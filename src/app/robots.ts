import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://e-do.studio/sitemap.xml',
        host: 'https://e-do.studio',
    }
} 