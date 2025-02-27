'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateOnLanguageChange() {
  // Revalidate all dynamic routes
  revalidatePath('/post-production/[category]')
  revalidatePath('/galerie')
  revalidatePath('/studio')
  revalidatePath('/contact')
  revalidatePath('/')
} 