export const siteConfig = {
    name: 'E-do Studio',
    url: 'https://e-do.studio',
    logo: 'https://e-do.studio/img/logo.png',
    description: 'Studio photo professionnel spécialisé dans le packshot automatisé et la photographie produit',
    address: {
        street: '69 Bd Victor Hugo',
        city: 'Saint-Ouen-sur-Seine',
        postalCode: '93400',
        country: 'FR'
    },
    contact: {
        phone: '+33 (0)1 44 04 11 49',
        email: 'contact@e-do.studio'
    },
    social: {
        linkedin: 'https://www.linkedin.com/company/e-do/posts/?feedView=all',
        instagram: 'https://www.instagram.com/edostudio/',
        facebook: 'https://www.facebook.com/EdoStudioAgency/'
    },
    openingHours: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
    },
    geo: {
        latitude: '48.9119',
        longitude: '2.3367'
    },
    services: {
        cyclorama: {
            name: 'Studio Cyclorama',
            url: '/cyclorama',
            image: 'https://e-do.studio/img/cyclorama.jpg',
            description: 'Studio photo professionnel avec cyclorama pour vos shootings produits et mode. Espace moderne et équipé, idéal pour vos prises de vue en packshot automatisé et photos créatives.',
            features: [
                'Surface de 120m²',
                'Cyclorama blanc',
                'Équipement professionnel',
                'Lumières LED',
                'Climatisation'
            ],
            priceRange: '€€',
            availability: 'https://e-do.studio/reservation'
        },
        postProduction: {
            name: 'Post-Production Photo',
            url: '/post-production/high_end',
            image: 'https://e-do.studio/img/post-production.jpg',
            description: 'Services professionnels de post-production photo : retouche, montage, correction colorimétrique. Expertise en retouche de packshot et photo produit pour un rendu optimal.',
            features: [
                'Retouche professionnelle',
                'Correction colorimétrique',
                'Détourage précis',
                'Optimisation web',
                'Formats multiples'
            ],
            priceRange: '€€',
            turnaroundTime: '24-48h'
        }
    }
} as const; 