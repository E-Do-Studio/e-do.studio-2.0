import { Metadata } from 'next'
import { ReservationFrame } from './_components/reservation-frame'

export const metadata: Metadata = {
  title: 'Studio Photofolio - Réservation - réservation en ligne',
  description: 'Pour vos shootings à la journée ou demi-journée, effectuez une demande de réservation en choisissant vos dates et horaires ci-dessous. Si vous avez des questions rendez-vous sur la page Contact, nous vous répondrons très rapidement.',
}

export default function ReservationPage() {
  return (
    <main className="flex flex-col min-h-screen pt-20">
      <ReservationFrame />
    </main>
  )
} 