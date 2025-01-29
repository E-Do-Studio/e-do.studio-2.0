import { PricingSection } from '@/app/(web)/_components/pricing-section'
import { ContactSection } from '@/app/(web)/_components/contact-section'
import { ServiceSection } from './_components/service-section'

export default function Page() {

  return (
    <div className="text-xl container min-h-screen">
      <ServiceSection />
      <PricingSection />
      <ContactSection />

    </div>
  )
}
