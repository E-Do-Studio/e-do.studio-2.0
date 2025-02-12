'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function PostProduction() {
  const payload = await getPayload({ config })

  const postProduction = await payload.find({
    collection: 'post-production',

  })

  console.log(postProduction)
  return <div>Post Production</div>
}
