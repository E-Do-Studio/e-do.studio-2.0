import { Metadata } from 'next'

export const SITE_NAME = 'E-Do Studio'
export const DEFAULT_DESCRIPTION = 'Studio de photographie spécialisé dans le packshot automatisé, offrant des services professionnels de photographie et post-production pour vos produits.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://e-do.studio'

interface GenerateMetadataOptions {
    title: string
    description?: string
    noIndex?: boolean
    templateTitle?: boolean
    path?: string
}

export function generateMetadata({
    title,
    description,
    noIndex = false,
    templateTitle = true,
    path = '',
}: GenerateMetadataOptions): Metadata {
    // S'assurer que le titre ne dépasse pas 70 caractères
    const finalTitle = templateTitle
        ? `${title} | ${SITE_NAME}`.slice(0, 70)
        : title.slice(0, 70)

    // S'assurer que la description ne dépasse pas 200 caractères
    const finalDescription = (description || DEFAULT_DESCRIPTION).slice(0, 200)

    // Construire l'URL canonique
    const canonicalUrl = `${SITE_URL}${path}`

    return {
        title: finalTitle,
        description: finalDescription,
        robots: {
            index: !noIndex,
            follow: !noIndex,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1
        },
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: finalTitle,
            description: finalDescription,
            siteName: SITE_NAME,
            type: 'website',
            locale: 'fr_FR',
            url: canonicalUrl,
        },
        twitter: {
            card: 'summary_large_image',
            title: finalTitle,
            description: finalDescription,
        },
    }
} 