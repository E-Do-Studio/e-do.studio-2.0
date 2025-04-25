'use client';

import { websiteSchema } from '@/lib/schema/website';
import { localBusinessSchema } from '@/lib/schema/local-business';
import { organizationSchema } from '@/lib/schema/organization';

interface SchemaProviderProps {
    breadcrumbItems?: Array<{
        position: number;
        name: string;
        item: string;
    }>;
}

export function SchemaProvider({ breadcrumbItems }: SchemaProviderProps) {
    const breadcrumbSchema = breadcrumbItems ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems.map(item => ({
            '@type': 'ListItem',
            position: item.position,
            name: item.name,
            item: `https://e-do.studio${item.item}`
        }))
    } : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            {breadcrumbSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
            )}
        </>
    );
} 