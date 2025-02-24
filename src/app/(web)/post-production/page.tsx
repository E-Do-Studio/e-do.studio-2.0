'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { LandingSection } from '@/components/layout/landing-section'
import { PostProductionGrid, PostProductionItem } from './_components/post-production-grid'
import { getLanguage } from '@/lib/get-language'

export default async function PostProduction() {
  const payload = await getPayload({ config })
  const language = await getLanguage()

  const postProduction = await payload.find({
    collection: 'post-production',
    locale: language,
  })

  // Utiliser directement les slugs de la base de données
  const items = postProduction.docs as PostProductionItem[]

  return (
    <LandingSection title="Post-Production">
      <PostProductionGrid items={items} />
    </LandingSection>
  )
}