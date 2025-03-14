import { MetadataRoute } from 'next'
import { payload } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Récupération des projets depuis Payload CMS
  const projects = await payload.find({
    collection: 'projects',
  })

  // URLs statiques de base
  const staticUrls = [
    {
      url: 'https://e-do.studio',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://e-do.studio/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://e-do.studio/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // URLs dynamiques des projets
  const projectUrls = projects.docs.map((project) => ({
    url: `https://e-do.studio/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...staticUrls, ...projectUrls]
}