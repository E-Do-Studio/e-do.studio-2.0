'use client'

import { MachineSection } from '@/components/service/machine-section'

export function LiveView() {
  return (
    <MachineSection 
      namespace="live"
      imageUrl="/img/machine-live.webp"
      showPricing={true}
    />
  )
}
