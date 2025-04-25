import { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateMetadata({
  title: 'Services de Post-Production Photo',
  description: 'Services professionnels de post-production photo : retouche, montage, correction colorimétrique. Expertise en retouche de packshot et photo produit pour un rendu optimal.',
  noIndex: false
})

export default function PostProductionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="container">
      {children}
    </main>
  )
}