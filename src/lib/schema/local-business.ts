export const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://e-do.studio/#organization',
    name: 'E-do Studio',
    image: 'https://e-do.studio/img/studio.jpg',
    description: 'Studio photo professionnel avec cyclorama pour vos shootings produits et mode. Espace moderne et équipé, idéal pour vos prises de vue en packshot automatisé et photos créatives.',
    url: 'https://e-do.studio',
    telephone: '+33 (0)1 44 04 11 49',
    email: 'contact@e-do.studio',
    priceRange: '€€',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '69 Bd Victor Hugo',
        addressLocality: 'Saint-Ouen-sur-Seine',
        postalCode: '93400',
        addressCountry: 'FR'
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: '48.9119',
        longitude: '2.3367'
    },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
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
}; 