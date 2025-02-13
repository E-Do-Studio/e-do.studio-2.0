'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { LandingSection } from '@/components/layout/landing-section'
import { notFound } from 'next/navigation'
import { CategoryGallery } from './_components/category-gallery'
import { PostProductionMenu } from '../_components/post-production-menu'

// Define the shape of your Payload data
export interface PostProductionDocument {
  id: string | number
  category: string
  assets: Array<{
    url: string
    alt: string
    description?: string
  }>
  description?: string
  price?: string | number
}

export default async function CategoryPage(params: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params.params

  const payload = await getPayload({ config })

  // Get all categories for menu
  const allCategories = await payload.find({
    collection: 'post-production',
  })

  // Transform the payload data to match the menu item type and ensure id is a string
  const menuItems = allCategories.docs.map(doc => ({
    id: String((doc as PostProductionDocument).id),
    category: (doc as PostProductionDocument).category
  }))

  const categoryMapping: { [key: string]: string } = {
    'pique': 'Pique',
    'on-model': 'On Model',
    // Ajouter d'autres mappings si nécessaire
  }

  const formattedCategory = categoryMapping[category] ||
    category
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')

  console.log('Formatted category:', formattedCategory)

  const postProduction = await payload.find({
    collection: 'post-production',
    where: {
      category: {
        equals: formattedCategory
      }
    }
  })

  console.log('Found documents:', postProduction.docs)

  if (!postProduction.docs.length) {
    console.log('No documents found for category:', formattedCategory)
    notFound()
  }

  const item = postProduction.docs[0] as PostProductionDocument

  return (
    <main className="container mx-auto">
      <LandingSection title="Post Production">
        <PostProductionMenu items={menuItems} />
        <CategoryGallery item={item} />
      </LandingSection>
    </main>
  )
} 