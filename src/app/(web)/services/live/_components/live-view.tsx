'use client'

import { MachineSection } from '@/components/service/machine-section'
import { ImageGrid } from '@/components/ui/image-grid'
import { useMachineImages } from '@/hooks/use-machine-images'
import { useEffect, useState } from 'react'

export function LiveView() {
  // Récupérer les images pour la machine Live
  const { images: liveImages, loading } = useMachineImages('live')
  
  // Log pour déboguer
  useEffect(() => {
    console.log('LiveView - liveImages:', liveImages)
    console.log('LiveView - loading:', loading)
  }, [liveImages, loading])

  // Images réelles du dossier de la machine Live
  const machineImages = [
    '/img/machines/live/AW23SH003UDN002_AW23PT002UDEN002-Fullbody-TIFF-7.webp',
    '/img/machines/live/AW23SH005UPL002_AW23PT001UPL002_AW23SH006UPL002-Fullbody-TIFF-1.webp',
    '/img/machines/live/CO021WHITE-Fullbody-3.webp',
    '/img/machines/live/FROB28162KBLA01_C.webp',
    '/img/machines/live/FTOP28051KBLA01_B.webp',
    '/img/machines/live/JA024BLACK-Fullbody-1.webp',
    '/img/machines/live/Kendall-Fullbody-JPG-2.jpg',
    '/img/machines/live/OCEAN_BRAZIL-Fullbody-TIFF-2.webp',
    '/img/machines/live/P230614125726-_14-TIFF-3.webp',
    '/img/machines/live/P230614150900-_12-TIFF-5.webp',
    '/img/machines/live/P230614154250-_14-TIFF-5.webp',
    '/img/machines/live/SURF_DRESS-Fullbody-TIFF-8.webp'
  ]

  return (
    <MachineSection 
      namespace="live"
      imageUrl={undefined} // Désactiver l'image statique
      imageUrls={machineImages} // Utiliser les images réelles du dossier de la machine
      showPricing={true}
    />
  )
}
