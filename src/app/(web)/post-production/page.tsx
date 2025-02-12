'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { LandingSection } from '@/components/layout/landing-section'
import Image from 'next/image'
import { PostProductionGrid } from './_components/post-production-grid'

export default async function PostProduction() {
  const payload = await getPayload({ config })

  const postProduction = await payload.find({
    collection: 'post-production',
  })

  console.log(postProduction.docs)

  return (
    <main className='container mx-auto'>
      <LandingSection title="Post Production">
        <PostProductionGrid items={postProduction.docs} />
      </LandingSection>
    </main>
  )
}
