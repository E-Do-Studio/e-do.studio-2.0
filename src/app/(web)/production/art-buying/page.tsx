import { Metadata } from 'next'
import { ArtBuyingView } from './_components/art-buying-view'

export const metadata: Metadata = {
  title: 'Art Buying / Catering / Casting | E-Do Studio',
  description: 'E-Do Studio vous propose un service complet d\'accompagnement pour vos productions photographiques et vidéo, du casting des modèles à la sélection des accessoires et à la restauration sur le plateau.'
}

export default function ArtBuyingPage() {
  return <ArtBuyingView />
}
