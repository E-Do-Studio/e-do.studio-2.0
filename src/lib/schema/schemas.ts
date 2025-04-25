import { siteConfig } from './config';

export function generateWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        }
    };
}

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: siteConfig.logo,
        description: siteConfig.description,
        address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.city,
            postalCode: siteConfig.address.postalCode,
            addressCountry: siteConfig.address.country
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: siteConfig.contact.phone,
            contactType: 'customer service',
            email: siteConfig.contact.email
        },
        sameAs: [
            siteConfig.social.linkedin,
            siteConfig.social.instagram,
            siteConfig.social.facebook
        ]
    };
}

export function generateLocalBusinessSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        image: siteConfig.logo,
        '@graph': [
            {
                '@type': 'PhotographyBusiness',
                name: siteConfig.name,
                description: siteConfig.description,
                url: siteConfig.url,
                telephone: siteConfig.contact.phone,
                email: siteConfig.contact.email,
                priceRange: '€€',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: siteConfig.address.street,
                    addressLocality: siteConfig.address.city,
                    postalCode: siteConfig.address.postalCode,
                    addressCountry: siteConfig.address.country
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: siteConfig.geo.latitude,
                    longitude: siteConfig.geo.longitude
                },
                openingHoursSpecification: [
                    {
                        '@type': 'OpeningHoursSpecification',
                        dayOfWeek: siteConfig.openingHours.days,
                        opens: siteConfig.openingHours.opens,
                        closes: siteConfig.openingHours.closes
                    }
                ],
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Services de photographie',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Packshot Automatisé',
                                description: 'Service de photographie produit automatisée pour l\'e-commerce'
                            }
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Location Studio Cyclorama',
                                description: 'Location de notre studio professionnel avec cyclorama'
                            }
                        }
                    ]
                }
            }
        ]
    };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${siteConfig.url}${item.item}`
        }))
    };
} 