import { siteConfig } from './config';

export function generateCycloramaSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${siteConfig.url}${siteConfig.services.cyclorama.url}`,
        name: siteConfig.services.cyclorama.name,
        description: siteConfig.services.cyclorama.description,
        provider: {
            '@type': 'PhotographyBusiness',
            name: siteConfig.name,
            image: siteConfig.logo
        },
        image: siteConfig.services.cyclorama.image,
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'EUR',
                valueAddedTaxIncluded: true
            },
            availabilityStarts: '2024-01-01',
            url: siteConfig.services.cyclorama.availability
        },
        additionalProperty: siteConfig.services.cyclorama.features.map(feature => ({
            '@type': 'PropertyValue',
            name: 'Feature',
            value: feature
        }))
    };
}

export function generatePostProductionSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${siteConfig.url}${siteConfig.services.postProduction.url}`,
        name: siteConfig.services.postProduction.name,
        description: siteConfig.services.postProduction.description,
        provider: {
            '@type': 'PhotographyBusiness',
            name: siteConfig.name,
            image: siteConfig.logo
        },
        image: siteConfig.services.postProduction.image,
        offers: {
            '@type': 'Offer',
            priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'EUR',
                valueAddedTaxIncluded: true
            }
        },
        additionalProperty: [
            ...siteConfig.services.postProduction.features.map(feature => ({
                '@type': 'PropertyValue',
                name: 'Feature',
                value: feature
            })),
            {
                '@type': 'PropertyValue',
                name: 'TurnaroundTime',
                value: siteConfig.services.postProduction.turnaroundTime
            }
        ]
    };
}

export function generateGallerySchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${siteConfig.url}${siteConfig.services.gallery.url}`,
        name: siteConfig.services.gallery.name,
        description: siteConfig.services.gallery.description,
        image: siteConfig.services.gallery.image,
        provider: {
            '@type': 'PhotographyBusiness',
            name: siteConfig.name,
            image: siteConfig.logo
        },
        about: {
            '@type': 'PhotographyService',
            serviceType: 'Fashion Photography',
            category: siteConfig.services.gallery.categories,
            additionalProperty: siteConfig.services.gallery.features.map(feature => ({
                '@type': 'PropertyValue',
                name: 'Feature',
                value: feature
            }))
        }
    };
} 