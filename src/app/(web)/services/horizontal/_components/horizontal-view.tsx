'use client'

import { MachineSection } from '@/components/service/machine-section'
import { useMachineImages } from '@/hooks/use-machine-images'
import { useEffect } from 'react'

export function HorizontalView() {
  // Récupérer les images pour la machine Horizontal
  const { images: horizontalImages, loading } = useMachineImages('horizontal')
  
  // Log pour déboguer
  useEffect(() => {
    console.log('HorizontalView - horizontalImages:', horizontalImages)
    console.log('HorizontalView - loading:', loading)
  }, [horizontalImages, loading])

  // Images réelles du dossier de la machine Horizontal
  const machineImages = [
    '/img/machines/horizontal/BOMPARD-AK584_T4535.png',
    '/img/machines/horizontal/BOMPARD-a928_T4977.png',
    '/img/machines/horizontal/ET19MYC43_2.jpg',
    '/img/machines/horizontal/ET201AM21_2.jpg',
    '/img/machines/horizontal/FURSAC_D2ELFA-TR23-71-2.jpg',
    '/img/machines/horizontal/Kid_Super_18_Front.jpg',
    '/img/machines/horizontal/MARE-Kimono_Brown_Stripe_Front.jpg',
    '/img/machines/horizontal/MARE-short_creme__Front_JPG.jpg',
    '/img/machines/horizontal/Paris_navy_65_2.jpg',
    '/img/machines/horizontal/SKATEBOARDS-1-TIFF-1_alex_mileshin.jpg',
    '/img/machines/horizontal/manteau_2_Front.jpg',
    '/img/machines/horizontal/veste_beige_-_front_Front-2.jpg'
  ]

  return (
    <MachineSection 
      namespace="horizontal"
      imageUrl={undefined} // Désactiver l'image statique
      imageUrls={machineImages} // Utiliser les images réelles du dossier de la machine
      showPricing={true}
    />
  )
}
