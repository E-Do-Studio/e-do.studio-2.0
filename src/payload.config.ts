// storage-adapter-import-placeholder
import { resendAdapter } from '@payloadcms/email-resend'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { cloudinaryStorage } from 'payload-cloudinary'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'

import { Users } from './collections/Users'
import { Brands } from './collections/Brands'
import { Categories } from './collections/Categories'
import { Assets } from './collections/Assets'
import { Subcategories } from './collections/Sub-Category'
import { Videos } from './collections/Videos'
import sharp from 'sharp'

const serverURL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : process.env.PAYLOAD_PUBLIC_SERVER_URL

console.log('environnement', process.env.NODE_ENV)

export default buildConfig({
  debug: true,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(__dirname),
    },
  },
  serverURL,
  collections: [Users, Brands, Categories, Assets, Subcategories, Videos],
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
        assets: true,
      },
      folder: 'payload-media',
      enabled: true,
    }),
    uploadthingStorage({
      collections: {
        videos: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: 'contact@edostudio.com',
    defaultFromName: 'E-Do Studio',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  upload: {
    debug: true,
    limits: {
      fileSize: 20000 * 1024,
    },
  },
  cors: {
    origins: [
      'https://superb-travesseiro-87230d.netlify.app',
      'https://superb-travesseiro-87230d.netlify.app/admin',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    headers: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Pragma',
      'Expires',
      'Netlify-Vary',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Credentials',
      'Access-Control-Expose-Headers',
      'Access-Control-Max-Age',
    ],
  },
})
