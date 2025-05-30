'use client'

import { MachineSection } from '@/components/service/machine-section'

export function VerticalView() {
  return (
    <MachineSection 
      namespace="vertical"
      imageUrl="/img/machine-vertical.webp"
      showPricing={true}
    />
  )
}
