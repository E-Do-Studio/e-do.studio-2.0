'use client'

import { ServiceView } from '@/components/service/service-view'
import { useMachineImages } from '@/hooks/use-machine-images'

export function HorizontalView() {
  // Récupérer les images pour la machine Horizontal
  const { images: horizontalImages, loading } = useMachineImages('horizontal')

  return (
    <ServiceView 
      namespace="horizontal"
      imageUrl={horizontalImages && horizontalImages.length > 0 ? undefined : "/images/services/horizontal.jpg"}
      imageUrls={horizontalImages}
    />
  )
}
