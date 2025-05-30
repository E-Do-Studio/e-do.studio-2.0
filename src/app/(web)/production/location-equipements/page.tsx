import { Metadata } from 'next'
import { LocationEquipementsView } from './_components/location-equipements-view'

export const metadata: Metadata = {
  title: 'Location d\'Équipements Photo | E-Do Studio',
  description: 'E-Do Studio met à votre disposition une large gamme d\'équipements photographiques professionnels pour vos projets.'
}

export default function LocationEquipementsPage() {
  return <LocationEquipementsView />
}
