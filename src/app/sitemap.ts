import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SITE_URL } from '@/lib/metadata'

type SlugDocument = {
  slug?: string | null
  updatedAt?: string | Date | null
}

const baseUrl = SITE_URL.replace(/\/$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: Array<{
    path: string
    priority: number
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  }> = [
    { path: '/', priority: 1, changeFrequency: 'daily' },
    { path: '/galerie', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/post-production', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/post-production/retouche-video', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/services/eclipse', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/services/horizontal', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/services/live', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/services/vertical', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/reservation', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/cyclorama', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/legal', priority: 0.3, changeFrequency: 'yearly' },
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  let categoryDocs: SlugDocument[] = []
  let postProductionDocs: SlugDocument[] = []

  try {
    const payload = await getPayload({ config })
    const [categories, postProduction] = await Promise.all([
      payload.find({
        collection: 'categories',
        limit: 200,
        locale: 'fr',
      }),
      payload.find({
        collection: 'post-production',
        limit: 200,
        locale: 'fr',
      }),
    ])

    categoryDocs = categories.docs as SlugDocument[]
    postProductionDocs = postProduction.docs as SlugDocument[]
  } catch (error) {
    console.error('Failed to fetch dynamic sitemap data', error)
  }

  const galleryEntries: MetadataRoute.Sitemap = categoryDocs
    .filter((doc): doc is Required<Pick<SlugDocument, 'slug'>> & SlugDocument => Boolean(doc.slug))
    .map((doc) => ({
      url: `${baseUrl}/galerie?category=${doc.slug}`,
      lastModified: doc.updatedAt ? new Date(doc.updatedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  const postProductionEntries: MetadataRoute.Sitemap = postProductionDocs
    .filter(
      (doc): doc is Required<Pick<SlugDocument, 'slug' | 'updatedAt'>> &
        SlugDocument => Boolean(doc.slug) && doc.slug !== '360'
    )
    .map((doc) => ({
      url: `${baseUrl}/post-production/${doc.slug}`,
      lastModified: doc.updatedAt ? new Date(doc.updatedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [...staticEntries, ...galleryEntries, ...postProductionEntries]
}
