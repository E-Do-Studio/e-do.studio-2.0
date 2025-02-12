import type { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    group: 'Medias',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    adapter: 'uploadthing',
  },
  fields: [
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'subCategory',
      type: 'relationship',
      relationTo: 'subcategories',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
