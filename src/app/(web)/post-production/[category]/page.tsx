'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { LandingSection } from '@/components/layout/landing-section'
import { notFound } from 'next/navigation'
import { CategoryGallery } from './_components/category-gallery'
import { PostProductionMenu } from '../_components/post-production-menu'

export default async function CategoryPage(params: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params.params

  const payload = await getPayload({ config })

  // Get all categories for menu
  const allCategories = await payload.find({
    collection: 'post-production',
  })

  // Créer un mapping inverse pour retrouver la catégorie originale
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

  const item = postProduction.docs[0]
  return (
    <main className="container mx-auto">
      <LandingSection title="Post Production">
        <PostProductionMenu items={allCategories.docs} />
        <CategoryGallery item={item} />
      </LandingSection>
    </main>
  )
} 