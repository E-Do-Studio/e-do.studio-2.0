import { generateCycloramaSchema } from '@/lib/schema/service-schemas';

export function CycloramaStructuredData() {
    const cycloramaSchema = generateCycloramaSchema();

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(cycloramaSchema)
            }}
        />
    );
} 