import { generateWebsiteSchema, generateOrganizationSchema, generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/schema/schemas';

interface StructuredDataProps {
    breadcrumbs?: Array<{
        name: string;
        item: string;
    }>;
}

export function StructuredData({ breadcrumbs }: StructuredDataProps) {
    const websiteSchema = generateWebsiteSchema();
    const organizationSchema = generateOrganizationSchema();
    const localBusinessSchema = generateLocalBusinessSchema();
    const breadcrumbSchema = breadcrumbs ? generateBreadcrumbSchema(breadcrumbs) : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessSchema)
                }}
            />
            {breadcrumbSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumbSchema)
                    }}
                />
            )}
        </>
    );
} 