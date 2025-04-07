export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'E-do Studio',
    url: 'https://e-do.studio',
    description: 'Studio photo professionnel spécialisé dans le packshot automatisé et la photographie produit',
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://e-do.studio/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
    }
}; 