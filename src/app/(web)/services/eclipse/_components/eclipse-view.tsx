'use client'

import { MachineSection } from '@/components/service/machine-section'
import { useMachineImages } from '@/hooks/use-machine-images'
import { useEffect } from 'react'

export function EclipseView() {
  // Récupérer les images pour la machine Eclipse
  const { images: eclipseImages, loading } = useMachineImages('eclipse')
  
  // Log pour déboguer
  useEffect(() => {
    console.log('EclipseView - eclipseImages:', eclipseImages)
    console.log('EclipseView - loading:', loading)
  }, [eclipseImages, loading])

  // Images réelles du dossier de la machine Eclipse
  const machineImages = [
    '/img/machines/eclipse/13:09_CUDCRBSS25-TOP-6.jpg',
    '/img/machines/eclipse/ALTER-P241218103146-Front-5.webp',
    '/img/machines/eclipse/A_MAGAZINE-Side-tiff-16.webp',
    '/img/machines/eclipse/CARVEN-BELMONDO PINK-Side-1.webp',
    '/img/machines/eclipse/combo4-face + boite-tiff-1.webp',
    '/img/machines/eclipse/Coperni-FOIL BRIDGE BOOT-34-tiff-1.webp',
    '/img/machines/eclipse/Coperni-MÉDIUM BELT CABAS RED-45-tiff-1 copy.webp',
    '/img/machines/eclipse/Gants-coussin-tiff-6.webp',
    '/img/machines/eclipse/HAT-FRONT-tiff-3 copy.jpg',
    '/img/machines/eclipse/Multipink Necklace-TOP-_-2.webp',
    '/img/machines/eclipse/Nick Nora.jpg',
    '/img/machines/eclipse/ORLINSKI POMPOM-cote droit-tiff-1.webp'
  ]

  return (
    <MachineSection 
      namespace="eclipse"
      imageUrl={undefined} // Désactiver l'image statique
      imageUrls={machineImages} // Utiliser les images réelles du dossier de la machine
      showPricing={true}
    />
  )
}
