import type { CollectionConfig } from 'payload'
import { getCachedCloudinaryResource } from '../lib/cloudinary-cache'

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
      async (args) => {
        if (args.doc.cloudinaryPublicId) {
          const cachedResource = await getCachedCloudinaryResource(args.doc.cloudinaryPublicId)
          if (cachedResource) {
            args.doc.url = cachedResource.secure_url
            // autres propriétés à mettre à jour...
          }
        }
        return args.doc
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
