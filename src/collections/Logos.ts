import type { CollectionConfig } from 'payload'

export const Logos: CollectionConfig = {
    slug: 'logos',
    admin: {
        group: 'Medias',
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    hooks: {
        beforeChange: [
            async ({ data }) => {
                const isImage = data.mimeType?.startsWith('image/')
                const isVideo = data.mimeType?.startsWith('video/')

                if (data.filename) {
                    if (isImage || isVideo) {
                        return {
                            ...data,
                            alt: data.filename
                                .replace(/\.[^/.]+$/, '')
                                .replace(/[-_]/g, ' ')
                                .trim(),
                        }
                    }
                }
                return data
            },
        ],
    },
    upload: {
        formatOptions: {
            format: 'webp',
            options: {
                quality: 60,
                effort: 6,
                lossless: false,
            },
        },
        mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'video/*'],
        adminThumbnail: 'thumbnail',
    },
    fields: [
        {
            name: 'url',
            type: 'text',
            admin: {
                hidden: true,
            },
        },
        {
            name: 'alt',
            type: 'text',
            required: false,
            admin: {
                description:
                    'Généré automatiquement depuis le nom du fichier pour les images. Optionnel pour les vidéos.',
            },
        },
        {
            name: 'brand',
            type: 'relationship',
            relationTo: 'brands',
            required: false,
            hasMany: false,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'mediaType',
            type: 'select',
            required: true,
            defaultValue: 'image',
            options: [
                { label: 'Image', value: 'image' },
                { label: 'Video', value: 'video' },
            ],
            admin: {
                position: 'sidebar',
                description: 'Type of media asset',
            },
        },
    ],
}
