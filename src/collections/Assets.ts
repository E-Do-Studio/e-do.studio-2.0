import type { CollectionConfig } from 'payload'

export const Assets: CollectionConfig = {
  slug: 'assets',
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
    afterRead: [
      ({ doc }) => {
        const isImage = doc.mimeType?.startsWith('image/')
        const isVideo = doc.mimeType?.startsWith('video/')

        if (doc.filename && !doc.alt && (isImage || isVideo)) {
          return {
            ...doc,
            alt: doc.filename
              .replace(/\.[^/.]+$/, '')
              .replace(/[-_]/g, ' ')
              .trim(),
          }
        }
        return doc
      },
    ],
  },
  admin: {
    group: 'Gallery',
  },
  upload: {
    adapter: 'cloudinary',
    // formatOptions: {
    //   format: 'webp',
    //   options: {
    //     quality: 60,
    //     effort: 6,
    //     lossless: false,
    //   },
    // },
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
      name: 'subcategory',
      type: 'relationship',
      relationTo: 'subcategories',
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
    {
      name: 'duration',
      type: 'number',
      required: false,
      admin: {
        description: 'Duration in seconds (for videos only)',
        condition: (data) => data.mediaType === 'video',
      },
    },
  ],
}
