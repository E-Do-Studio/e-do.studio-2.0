import { Metadata } from 'next'
import { LiveView } from './_components/live-view'

export const metadata: Metadata = {
  title: 'Live | E-Do Studio',
  description: 'Notre service Live offre une solution de photographie et vidéographie en temps réel, idéale pour les démonstrations de produits, les événements et les sessions interactives.'
}

export default function LivePage() {
  return <LiveView />
}
