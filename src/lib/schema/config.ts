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
            description: 'Services professionnels de post-production photo haute qualité : retouche avancée, montage créatif, correction colorimétrique experte. Spécialisation en retouche beauté et photo de mode.',
            features: [
                'Retouche beauté avancée',
                'Correction colorimétrique professionnelle',
                'Retouche créative',
                'Optimisation haute qualité',
                'Formats adaptés à vos besoins'
            ],
            priceRange: '€€€',
            turnaroundTime: '48-72h'
        },
        gallery: {
            name: 'Galerie Photo',
            url: '/galerie?category=on_model',
            image: 'https://e-do.studio/img/gallery-on-model.jpg',
            description: 'Découvrez notre galerie de photos on model, mettant en valeur notre expertise en photographie de mode et notre maîtrise technique.',
            categories: ['on_model', 'fashion', 'beauty'],
            features: [
                'Photos haute résolution',
                'Retouche professionnelle',
                'Direction artistique',
                'Mise en scène créative',
                'Éclairage professionnel'
            ]
        }
    }
} as const; 