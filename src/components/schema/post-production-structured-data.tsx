import { generatePostProductionSchema } from '@/lib/schema/service-schemas';

export function PostProductionStructuredData() {
    const postProductionSchema = generatePostProductionSchema();

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(postProductionSchema)
            }}
        />
    );
} 