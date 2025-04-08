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
    }
} as const; 