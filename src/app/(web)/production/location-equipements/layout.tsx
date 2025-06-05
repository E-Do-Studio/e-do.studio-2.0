import { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateMetadata({
  title: 'Location d\'Équipements Photo et Vidéo',
  description: 'E-Do Studio vous met en relation avec des prestataires de confiance pour tous vos besoins en équipements photo et vidéo professionnels.',
})

export default function LocationEquipementsLayout({ children }: { children: React.ReactNode }) {
  return <main className='container'>{children}</main>
}
