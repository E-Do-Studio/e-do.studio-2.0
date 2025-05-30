import { Metadata } from 'next'
import { RetoucheVideoView } from './_components/retouche-video-view'

export const metadata: Metadata = {
  title: 'Retouche Vidéo | E-Do Studio',
  description: 'E-Do Studio propose un service de retouche vidéo professionnel pour sublimer vos contenus audiovisuels, avec une attention particulière portée à la cohérence visuelle, la colorimétrie et les effets spéciaux.'
}

export default function RetoucheVideoPage() {
  return <RetoucheVideoView />
}
