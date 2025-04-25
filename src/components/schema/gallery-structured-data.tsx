import { generateGallerySchema } from '@/lib/schema/service-schemas';

export function GalleryStructuredData() {
    const gallerySchema = generateGallerySchema();

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(gallerySchema)
            }}
        />
    );
} 