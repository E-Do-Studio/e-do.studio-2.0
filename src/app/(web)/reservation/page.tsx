import { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { ReservationFrame } from './_components/reservation-frame'

export const metadata: Metadata = generateMetadata({
  title: 'Réservation de Studio Photo',
  description: 'Réservez votre séance de packshot automatisé en ligne. Choisissez vos dates et horaires pour des shootings à la journée ou demi-journée. Service client réactif pour répondre à vos besoins.',
})

export default function ReservationPage() {
  return <ReservationFrame />
} 