// storage-adapter-import-placeholder
import { resendAdapter } from '@payloadcms/email-resend'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
// import sharp from 'sharp'
import { cloudinaryStorage } from 'payload-cloudinary'

import { Users } from './collections/Users'
import { Brands } from './collections/Brands'
import { Categories } from './collections/Categories'
import { Images } from './collections/Images'
import { Subcategories } from './collections/Sub-Category'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Subcategories, Users, Images, Brands, Categories],
  localization: {
    locales: ['fr', 'en'],
    defaultLocale: 'en',
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  // sharp: sharp,
  plugins: [
    payloadCloudPlugin(),
    cloudinaryStorage({
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
      },
      collections: {
        media: true,
        images: true,
      },
      folder: 'payload-media', // Optional, defaults to 'payload-media'
      disableLocalStorage: true, // Optional, defaults to true
      enabled: true, // Optional, defaults to true
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: 'contact@edostudio.com',
    defaultFromName: 'E-Do Studio',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  upload: {
    limits: {
      fileSize: 20000 * 1024, // 20000ko max
    },
  },
})
