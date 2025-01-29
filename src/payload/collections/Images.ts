import type { CollectionConfig } from 'payload'
import path from 'path'

export const Images: CollectionConfig = {
  slug: 'images',
  access: {
    read: () => true,
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
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 60,
            effort: 6,
          },
        },
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 75,
            effort: 6,
          },
        },
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Généré automatiquement depuis le nom du fichier',
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
        description: 'Sera appliqué à toutes les images uploadées',
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
        description: "Sous-catégorie de l'image",
      },
    },
  ],
}
