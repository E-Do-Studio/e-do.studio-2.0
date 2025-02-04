import type { CollectionConfig } from 'payload'
import path from 'path'

export const Images: CollectionConfig = {
  slug: 'images',
  access: {
    read: () => true,
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
    staticDir: path.resolve(__dirname, '../../public/images'),
    formatOptions: {
      format: 'webp',
      options: {
        quality: 60,
        effort: 6,
        lossless: false,
      },
    },
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
    adminThumbnail: 'thumbnail',
    // imageSizes: [
    //   {
    //     name: 'thumbnail',
    //     width: 400,
    //     height: 300,
    //     position: 'centre',
    //     formatOptions: {
    //       format: 'webp',
    //       options: {
    //         quality: 60,
    //         effort: 6,
    //       },
    //     },
    //   },
    //   {
    //     name: 'card',
    //     width: 768,
    //     height: 1024,
    //     position: 'centre',
    //     formatOptions: {
    //       format: 'webp',
    //       options: {
    //         quality: 75,
    //         effort: 6,
    //       },
    //     },
    //   },
    // ],
  },
  fields: [
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
