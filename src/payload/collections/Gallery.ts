import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'brand', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },

    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'subcategory',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      filterOptions: {
        // where: {
        //   isSubcategory: {
        //     equals: true,
        //   },
        // },
      },
      label: 'Sous-catégorie',
      admin: {
        description: 'Sélectionnez une sous-catégorie pour cette image',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: "Ordre d'affichage dans la galerie",
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
  ],
  timestamps: true,
}
