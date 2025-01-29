export type TimingPeriod = 'Heure' | 'Demi-journée' | 'Journée'

export interface Machine {
  name: string
  price_per_hours: {
    hour: { price: number; description: string }[]
    half_day: { price: number; description: string }[]
    day: { price: number; description: string }[]
  }
}

export const tabs = ['Cyclorama', 'Horizontal', 'Vertical', 'Live', 'Eclipse']

export const machines: Machine[] = [
  {
    name: 'Cyclorama',
    price_per_hours: {
      hour: [{ price: 1000, description: '1 heure de shooting\nSelf-service' }],
      half_day: [{ price: 1500, description: '4 heures de shooting\nSelf-service' }],
      day: [{ price: 2000, description: '8 heures de shooting\nSelf-service' }],
    },
  },
  {
    name: 'Horizontal',
    price_per_hours: {
      hour: [{ price: 1000, description: '1 heure de shooting \n Self-service' }],
      half_day: [{ price: 1500, description: '4 heures de shooting \n Self-service' }],
      day: [{ price: 2000, description: '8 heures de shooting \n Self-service' }],
    },
  },
  {
    name: 'Vertical',
    price_per_hours: {
      hour: [{ price: 1000, description: '1 heure de shooting \n Self-service' }],
      half_day: [{ price: 1500, description: '4 heures de shooting \n Self-service' }],
      day: [{ price: 2000, description: '8 heures de shooting \n Self-service' }],
    },
  },
  {
    name: 'Eclipse',
    price_per_hours: {
      hour: [{ price: 1000, description: '1 heure de shooting \n Self-service' }],
      half_day: [{ price: 1500, description: '4 heures de shooting \n Self-service' }],
      day: [{ price: 2000, description: '8 heures de shooting \n Self-service' }],
    },
  },
  {
    name: 'Live',
    price_per_hours: {
      hour: [{ price: 1000, description: '1 heure de shooting \n Self-service' }],
      half_day: [{ price: 1500, description: '4 heures de shooting \n Self-service' }],
      day: [{ price: 2000, description: '8 heures de shooting \n Self-service' }],
    },
  },
]

export const timingMap: Record<keyof Machine['price_per_hours'], TimingPeriod> = {
  hour: 'Heure',
  half_day: 'Demi-journée',
  day: 'Journée',
}
