import { Metadata } from "next";
import { generateMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateMetadata({
  title: 'Galerie',
  description: 'Découvrez notre galerie de packshots automatisés',
  noIndex: false
})

export default function GalerieLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='container mx-auto'>
      {children}
    </main>
  )
}
