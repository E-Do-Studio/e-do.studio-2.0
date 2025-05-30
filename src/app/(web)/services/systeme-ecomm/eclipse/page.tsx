import { Metadata } from 'next'
import { EclipseView } from './_components/eclipse-view'

export const metadata: Metadata = {
  title: 'Eclipse | E-Do Studio',
  description: 'Notre service Eclipse offre une solution de photographie avancée qui utilise un éclairage spécifique pour créer des images de produits sans ombre et avec une netteté exceptionnelle.'
}

export default function EclipsePage() {
  return <EclipseView />
}
