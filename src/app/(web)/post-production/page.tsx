'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { redirect } from 'next/navigation'
import { getLanguage } from '@/lib/get-language'

export default async function PostProduction() {
  const payload = await getPayload({ config })
  const language = await getLanguage()

  const postProduction = await payload.find({
    collection: 'post-production',
    locale: language,
  })

  // Filtrer les items pour exclure la catégorie avec le slug "360"
  const items = postProduction.docs.filter(doc => doc.slug !== '360')

  // Chercher la catégorie Lookbook
  const lookbookItem = items.find(item => item.slug === 'lookbook')
  
  // Rediriger vers Lookbook si elle existe, sinon vers la première catégorie disponible
  if (lookbookItem) {
    redirect(`/post-production/lookbook`)
  } else if (items.length > 0) {
    redirect(`/post-production/${items[0].slug}`)
  }

  // Fallback au cas où il n'y a pas de catégories
  redirect('/')
}