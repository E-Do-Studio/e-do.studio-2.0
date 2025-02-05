import type { CollectionConfig } from 'payload'

export const Images: CollectionConfig = {
  slug: 'images',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.filename) {
          return {
            ...data,
            alt: data.filename
              .replace(/\.[^/.]+$/, '')
              .replace(/[-_]/g, ' ')
              .trim(),
          }
        }
        return data
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc.filename && !doc.alt) {
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
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
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
      required: true,
      admin: {
        description:
          'Généré automatiquement depuis le nom du fichier. Vous pouvez le modifier si nécessaire.',
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
  ],
}
