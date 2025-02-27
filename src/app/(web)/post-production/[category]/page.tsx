'use server'

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
  }>
  description?: string
  subcategories: Subcategory[]
  main_image?: {
    url: string
    alt: string
  }
}

export default async function CategoryPage(params: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params.params

  const payload = await getPayload({ config })
  const language = await getLanguage()

  // Get all categories for menu
  const allCategories = await payload.find({
    collection: 'post-production',
    locale: language
  })

  // Transform en utilisant le slug
  const menuItems = allCategories.docs.map(doc => ({
    id: String((doc as PostProductionDocument).id),
    category: (doc as PostProductionDocument).category,
    slug: (doc as PostProductionDocument).slug
  }))

  // Recherche par slug
  const postProduction = await payload.find({
    collection: 'post-production',
    where: {
      slug: {
        equals: category
      }
    },
    locale: language
  })

  if (!postProduction.docs.length) {
    notFound()
  }

  const item = postProduction.docs[0] as PostProductionDocument

  return (
    <div className='mt-20'>
      <LandingSection title="POST-PRODUCTION">
        <Description />
        <PostProductionMenu items={menuItems} />
        <CategoryGallery item={item} />
      </LandingSection>
    </div>
  )
} 