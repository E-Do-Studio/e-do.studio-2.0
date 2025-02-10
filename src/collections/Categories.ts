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
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
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
      label: 'Images',
      relationTo: 'assets',
      hasMany: true,
      filterOptions: {
        mimeType: {
          contains: ['image/'],
        },
      },
    },
    {
      name: 'videos',
      type: 'upload',
      label: 'Videos',
      relationTo: 'videos',
      hasMany: true,
      filterOptions: {
        mimeType: {
          contains: ['video/'],
        },
      },
    },
    {
      name: 'links',
      type: 'array',
      admin: {
        description: 'Links to the category',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
  timestamps: true,
}
