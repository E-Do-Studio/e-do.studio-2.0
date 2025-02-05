// storage-adapter-import-placeholder
import { resendAdapter } from '@payloadcms/email-resend'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { cloudinaryStorage } from 'payload-cloudinary'

import { Users } from './collections/Users'
import { Brands } from './collections/Brands'
import { Categories } from './collections/Categories'
import { Images } from './collections/Images'
import { Subcategories } from './collections/Sub-Category'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const dbUri = process.env.DATABASE_URI
console.log('Database connection string:', dbUri?.replace(/:[^:@]*@/, ':****@'))

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Brands, Categories, Images, Subcategories],
  localization: {
    locales: ['fr', 'en'],
    defaultLocale: 'en',
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      max: 10,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: 5000,
    },
  }),
  sharp: sharp,
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
