'use client'

import { MachineSection } from '@/components/service/machine-section'
import { useMachineImages } from '@/hooks/use-machine-images'
import { useEffect } from 'react'

export function VerticalView() {
  // Récupérer les images pour la machine Vertical
  const { images: verticalImages, loading } = useMachineImages('vertical')
  
  // Log pour déboguer
  useEffect(() => {
    console.log('VerticalView - verticalImages:', verticalImages)
    console.log('VerticalView - loading:', loading)
  }, [verticalImages, loading])

  // Images réelles du dossier de la machine Vertical
  const machineImages = [
    '/img/machines/vertical/13-bias cut dress black-Fullbody-2.jpg',
    '/img/machines/vertical/2-UND002RIBBEDJERSEYRLIPSTICKRED-1-VAILLANT-1.jpg',
    '/img/machines/vertical/5-UE JACKET _Side.jpg',
    '/img/machines/vertical/51-UE ROBOT grey detail _Front.webp',
    '/img/machines/vertical/GIAMBATTISTA_23FWPVCA5091-09VIS-6750_26.webp',
    '/img/machines/vertical/JPG-23-12-F-TO042-00_Front.webp',
    '/img/machines/vertical/Leslie Amon-bomber leather_Front.webp'
  ]

  return (
    <MachineSection 
      namespace="vertical"
      imageUrl={undefined} // Désactiver l'image statique
      imageUrls={machineImages} // Utiliser les images réelles du dossier de la machine
      showPricing={true}
    />
  )
}
