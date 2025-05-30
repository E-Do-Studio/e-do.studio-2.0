'use client'

import { MachineSection } from '@/components/service/machine-section'

export function HorizontalView() {
  return (
    <MachineSection
      namespace="horizontal"
      imageUrl="/img/machine-horizontal.webp"
      showPricing={true}
    />
  )
}
