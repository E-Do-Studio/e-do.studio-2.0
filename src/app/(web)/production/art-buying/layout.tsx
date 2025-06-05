import { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateMetadata({
  title: 'Art Buying / Catering / Casting',
  description: 'E-Do Studio vous propose un service complet d\'accompagnement pour vos productions photographiques et vidéo, du casting des modèles à la sélection des accessoires et à la restauration sur le plateau.',
})

export default function ArtBuyingLayout({ children }: { children: React.ReactNode }) {
  return <main className='container'>{children}</main>
}
