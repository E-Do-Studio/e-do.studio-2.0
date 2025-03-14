export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'E-do Studio',
    url: 'https://e-do.studio',
    logo: 'https://e-do.studio/img/logo.png',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '69 Bd Victor Hugo',
        addressLocality: 'Saint-Ouen-sur-Seine',
        postalCode: '93400',
        addressCountry: 'FR'
    },
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+33 (0)1 44 04 11 49',
        contactType: 'customer service',
        email: 'contact@e-do.studio'
    },
    sameAs: [
        'https://www.linkedin.com/company/e-do/posts/?feedView=all',
        'https://www.instagram.com/edostudio/',
        'https://www.facebook.com/EdoStudioAgency/'
    ]
}; 