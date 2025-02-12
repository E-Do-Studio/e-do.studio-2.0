'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { LandingSection } from '@/components/layout/landing-section'
import { notFound } from 'next/navigation'
import { CategoryGallery } from './_components/category-gallery'

interface PageProps {
  params: {
    category: string
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const payload = await getPayload({ config })

  // Convertir le paramètre de l'URL en format approprié
  const formattedCategory = params.category
    .split('-')
    .map(word => {
      // Si c'est "pique", le convertir en "Piqué"
      if (word.toLowerCase() === 'pique') return 'Piqué'
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')

  console.log('Searching for category:', formattedCategory) // Pour le debug

  // Récupérer la catégorie spécifique
  const postProduction = await payload.find({
    collection: 'post-production',
    where: {
      category: {
        equals: formattedCategory
      }
    }
  })

  console.log('Found items:', postProduction.docs) // Pour le debug

  if (!postProduction.docs.length) {
    notFound()
  }

  const item = postProduction.docs[0]

  return (
    <main className="container mx-auto">
      <LandingSection title={item.category}>
        <CategoryGallery item={item} />
      </LandingSection>
    </main>
  )
} 