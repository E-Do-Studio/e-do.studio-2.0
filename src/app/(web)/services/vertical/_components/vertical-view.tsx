'use client'

import { ServiceView } from '@/components/service/service-view'
import { useMachineImages } from '@/hooks/use-machine-images'

export function VerticalView() {
  // Récupérer les images pour la machine Vertical
  const { images: verticalImages, loading } = useMachineImages('vertical')

  return (
    <ServiceView 
      namespace="vertical"
      imageUrl={verticalImages && verticalImages.length > 0 ? undefined : "/images/services/vertical.webp"}
      imageUrls={verticalImages}
    />
  )
}
