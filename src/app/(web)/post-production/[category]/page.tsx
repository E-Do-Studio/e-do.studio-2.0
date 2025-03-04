'use server'

import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { LandingSection } from '@/components/layout/landing-section'
import { notFound } from 'next/navigation'
import { CategoryGallery } from './_components/category-gallery'
import { PostProductionMenu } from '../_components/post-production-menu'
import { getLanguage } from '@/lib/get-language'
import { Description } from './_components/description'

interface Subcategory {
  id: string
  name: string
  price: number
}

export interface PostProductionDocument {
  id: string | number
  category: string
  slug: string
  assets: Array<{
    url: string
    alt: string
    description?: string
    brand?: {
      name: string
    }
  }>
  description?: string
  subcategories: Subcategory[]
  main_image?: {
    url: string
    alt: string
  }
}

// Séparation des requêtes pour permettre le streaming
async function getMenuItems() {
  const payload = await getPayload({ config })
  const language = await getLanguage()

  const allCategories = await payload.find({
    collection: 'post-production',
    locale: language,
    depth: 0, // Réduire la profondeur de la requête
    limit: 10 // Limiter le nombre de résultats
  })

  return allCategories.docs.map(doc => ({
    id: String((doc as PostProductionDocument).id),
    category: (doc as PostProductionDocument).category,
    slug: (doc as PostProductionDocument).slug
  }))
}

async function getCategoryData(category: string) {
  const payload = await getPayload({ config })
  const language = await getLanguage()

  const postProduction = await payload.find({
    collection: 'post-production',
    where: {
      slug: {
        equals: category
      }
    },
    locale: language,
    depth: 1 // Réduire la profondeur de la requête
  })

  if (!postProduction.docs.length) {
    notFound()
  }

  return postProduction.docs[0] as PostProductionDocument
}

export default async function CategoryPage(params: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params.params

  return (
    <div className='mt-20'>
      <LandingSection title="POST-PRODUCTION">
        <Description />
        <Suspense fallback={<div className="h-12 bg-neutral-100 animate-pulse rounded-lg" />}>
          {/* @ts-expect-error Async Component */}
          <MenuSection category={category} />
        </Suspense>
        <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-neutral-100 animate-pulse rounded-lg" />
          ))}
        </div>}>
          {/* @ts-expect-error Async Component */}
          <GallerySection category={category} />
        </Suspense>
      </LandingSection>
    </div>
  )
}

async function MenuSection({ category }: { category: string }) {
  const menuItems = await getMenuItems()
  return <PostProductionMenu items={menuItems} />
}

async function GallerySection({ category }: { category: string }) {
  const item = await getCategoryData(category)
  return <CategoryGallery item={item} />
} 