import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  auth: false,
  admin: {
    useAsTitle: 'name',
    group: {
      fr: 'Galerie',
      en: 'Gallery',
    },
    description: 'Categories for the gallery',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'Name of the category',
      },
    },
    {
      name: 'subcategories',
      type: 'relationship',
      relationTo: 'subcategories',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
    },
    {
      name: 'assets',
      type: 'upload',
      relationTo: 'assets',
      hasMany: true,
      admin: {
        description: 'Images and videos associated with the category',
      },
      filterOptions: {
        mimeType: {
          contains: ['image/', 'video/'],
        },
      },
    },
  ],
  timestamps: true,
}
