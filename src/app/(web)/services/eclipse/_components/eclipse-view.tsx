'use client'

import { ServiceView } from '@/components/service/service-view'
import { useMachineImages } from '@/hooks/use-machine-images'

export function EclipseView() {
  // Utiliser des images hardcodées pour tester
  const hardcodedImages = [
    '/img/machines/eclipse/ALTER-P241218103146-Front-5.webp',
    '/img/machines/eclipse/A_MAGAZINE-Side-tiff-16.webp',
    '/img/machines/eclipse/CARVEN-BELMONDO PINK-Side-1.webp'
  ]

  return (
    <ServiceView 
      namespace="eclipse"
      imageUrl={undefined} // Désactiver l'image statique
      imageUrls={hardcodedImages} // Utiliser des images hardcodées
    />
  )
}
