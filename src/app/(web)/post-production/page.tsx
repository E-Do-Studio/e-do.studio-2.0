'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { LandingSection } from '@/components/layout/landing-section'
import { PostProductionGrid, PostProductionItem } from './_components/post-production-grid'

export default async function PostProduction() {
  const payload = await getPayload({ config })

  const postProduction = await payload.find({
    collection: 'post-production',
  })

  return (
    <LandingSection title="Post Production">
      <PostProductionGrid items={postProduction.docs as PostProductionItem[]} />
    </LandingSection>
  )
}
