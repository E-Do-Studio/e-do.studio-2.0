import { v2 as cloudinary } from 'cloudinary'
import type { CollectionConfig } from 'payload/types'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    // Add custom upload handler
    handlers: {
      upload: async ({ data, file }) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'auto',
          })

          return {
            filename: result.public_id,
            width: result.width,
            height: result.height,
            url: result.secure_url,
          }
        } catch (error) {
          console.error('Cloudinary upload failed:', error)
          throw error
        }
      },
      // Add delete handler if needed
      deleteFile: async ({ filename }) => {
        try {
          await cloudinary.uploader.destroy(filename)
        } catch (error) {
          console.error('Cloudinary delete failed:', error)
          throw error
        }
      },
    },
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'width',
      type: 'number',
    },
    {
      name: 'height',
      type: 'number',
    },
    // Add other fields as needed
  ],
}
