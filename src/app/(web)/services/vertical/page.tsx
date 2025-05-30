import { Metadata } from 'next'
import { VerticalView } from './_components/vertical-view'

export const metadata: Metadata = {
  title: 'Vertical | E-Do Studio',
  description: 'Notre service Vertical est conçu pour la photographie de produits en position debout, idéal pour mettre en valeur les objets qui nécessitent une présentation en hauteur.'
}

export default function VerticalPage() {
  return <VerticalView />
}
