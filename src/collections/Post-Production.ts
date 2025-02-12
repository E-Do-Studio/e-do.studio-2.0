import { CollectionConfig } from 'payload';

export const PostProduction: CollectionConfig = {
  slug: 'post-production',
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
