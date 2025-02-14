import { CollectionConfig } from 'payload';

export const PostProduction: CollectionConfig = {
  slug: 'post-production',
  auth: false,
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  labels: {
    singular: 'Post-Production',
    plural: 'Post-Production',
  },
  admin: {
    group: 'Post-Production',
  },
  fields: [
    {
      name: 'category',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'assets',
      type: 'upload',
      relationTo: 'assets',
      hasMany: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'subcategories',
      type: 'array',
      label: 'Subcategories and Prices',
      labels: {
        singular: 'Subcategory',
        plural: 'Subcategories',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
          label: 'Subcategory Name',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Price',
        }
      ]
    },
    {
      name: 'main_image',
      type: 'upload',
      label: 'Main Image',
      relationTo: 'assets',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
