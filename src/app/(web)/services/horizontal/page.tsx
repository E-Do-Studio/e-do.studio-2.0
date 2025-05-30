import { Metadata } from 'next'
import { HorizontalView } from './_components/horizontal-view'

export const metadata: Metadata = {
  title: 'Horizontal | E-Do Studio',
  description: 'Notre service Horizontal est spécialisé dans la photographie de produits à plat, offrant une solution idéale pour les vêtements, accessoires, et objets présentés en vue de dessus.'
}

export default function HorizontalPage() {
  return <HorizontalView />
}
