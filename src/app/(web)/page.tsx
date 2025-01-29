import { PricingSection } from '@/app/(web)/_components/pricing-section'
import { ContactSection } from '@/app/(web)/_components/contact-section'
export default function Page() {
  return (
    <div className="text-xl container h-screen">
      <PricingSection />
      <ContactSection />
    </div>
  )
}
