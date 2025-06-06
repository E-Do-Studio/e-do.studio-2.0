// storage-adapter-import-placeholder
import { resendAdapter } from '@payloadcms/email-resend'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { s3Storage } from '@payloadcms/storage-s3'
import { Users } from './collections/Users'
import { Brands } from './collections/Brands'
import { Categories } from './collections/Categories'
import { Assets } from './collections/Assets'
import { Subcategories } from './collections/Sub-Category'
import { PostProduction } from './collections/Post-Production'
import { Logos } from './collections/Logos'
// import sharp from 'sharp'

const serverURL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : process.env.PAYLOAD_PUBLIC_SERVER_URL


export default buildConfig({
  debug: true,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(__dirname),
    },
  },
  serverURL,
  collections: [Users, Brands, Categories, Assets, Subcategories, PostProduction, Logos],
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
    s3Storage({
      collections: {
        assets: true,

      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION!,
      },
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: 'contact@e-do.studio',
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
      'https://www.e-do.studio',
      'https://e-do.studio',
      'https://www.e-do.studio/admin',
      'https://e-do.studio/admin',
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
