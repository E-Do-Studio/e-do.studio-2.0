'use client'

import { MachineSection } from '@/components/service/machine-section'

export function EclipseView() {
  return (
    <MachineSection 
      namespace="eclipse"
      imageUrl="/img/machine-eclipse.webp"
      showPricing={true}
    />
  )
}
