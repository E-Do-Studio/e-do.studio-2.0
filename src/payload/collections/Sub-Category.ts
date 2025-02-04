import type { CollectionConfig } from 'payload'

export const Subcategories: CollectionConfig = {
  slug: 'subcategories',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Gallery',
    description: 'Sous-catégories pour la classification des images',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'Nom de la sous-catégorie',
      },
    },
  ],
  timestamps: true,
}
