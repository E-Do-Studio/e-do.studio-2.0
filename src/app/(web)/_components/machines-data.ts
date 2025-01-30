export type TimingPeriod = 'Heure' | 'Demi-journée' | 'Journée'

export interface Machine {
  name: string
  price_per_hours: {
    hour: { price: number; description: string }[]
    half_day: { price: number; description: string }[]
    day: { price: number; description: string }[]
  }
  images: string[]
}

export const tabs = ['Cyclorama', 'Horizontal', 'Vertical', 'Live', 'Eclipse']

const HORIZONTAL_IMAGE = 'https://images.unsplash.com/photo-1737203214144-05123b9df2da?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1737270019710-62b36a249aca?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export const machines: Machine[] = [
  {
    name: 'Cyclorama',
    price_per_hours: {
      hour: [{ price: 1000, description: '1 heure de shooting\nSelf-service' }],
      half_day: [{ price: 1500, description: '4 heures de shooting\nSelf-service' }],
      day: [{ price: 2000, description: '8 heures de shooting\nSelf-service' }],
    },
    images: [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE],
  },
  {
    name: 'Horizontal',
    price_per_hours: {
      hour: [{ price: 1000, description: '1 heure de shooting\nSelf-service' }],
      half_day: [{ price: 1500, description: '4 heures de shooting\nSelf-service' }],
      day: [{ price: 2000, description: '8 heures de shooting\nSelf-service' }],
    },
    images: [HORIZONTAL_IMAGE, HORIZONTAL_IMAGE, HORIZONTAL_IMAGE, HORIZONTAL_IMAGE, HORIZONTAL_IMAGE],
  },
  {
    name: 'Vertical',
    price_per_hours: {
      hour: [{ price: 1000, description: '1 heure de shooting\nSelf-service' }],
      half_day: [{ price: 1500, description: '4 heures de shooting\nSelf-service' }],
      day: [{ price: 2000, description: '8 heures de shooting\nSelf-service' }],
    },
    images: [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE],
  },
  {
    name: 'Live',
    price_per_hours: {
      hour: [{ price: 1000, description: '1 heure de shooting\nSelf-service' }],
      half_day: [{ price: 1500, description: '4 heures de shooting\nSelf-service' }],
      day: [{ price: 2000, description: '8 heures de shooting\nSelf-service' }],
    },
    images: [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE],
  },
  {
    name: 'Eclipse',
    price_per_hours: {
      hour: [{ price: 1000, description: '1 heure de shooting\nSelf-service' }],
      half_day: [{ price: 1500, description: '4 heures de shooting\nSelf-service' }],
      day: [{ price: 2000, description: '8 heures de shooting\nSelf-service' }],
    },
    images: [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE],
  },
]

export const timingMap: Record<keyof Machine['price_per_hours'], TimingPeriod> = {
  hour: 'Heure',
  half_day: 'Demi-journée',
  day: 'Journée',
}
