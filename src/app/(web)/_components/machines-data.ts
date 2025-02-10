export type TimingPeriod = string

export interface Machine {
  name: string
  slug: string | string[]
  price_per_hours: {
    hour: { price: number; description: string }[]
    half_day: { price: number; description: string }[]
    day: { price: number; description: string }[]
  }
  images: string[]
}

export const tabs = ['Cyclorama', 'Eclipse', 'Live', 'Vertical', 'Horizontal']

const HORIZONTAL_IMAGE = 'https://images.unsplash.com/photo-1737203214144-05123b9df2da?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1737270019710-62b36a249aca?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export function createMachines(t: (key: string) => string): Machine[] {
  return [
    {
      name: 'Cyclorama',
      slug: 'cyclorama',
      price_per_hours: {
        hour: [{ price: 1000, description: t('pricing.description.hour') }],
        half_day: [{ price: 1500, description: t('pricing.description.half_day') }],
        day: [{ price: 2000, description: t('pricing.description.day') }],
      },
      images: [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE],
    },
    {
      name: 'Eclipse',
      slug: 'access',
      price_per_hours: {
        hour: [{ price: 1000, description: t('pricing.description.hour') }],
        half_day: [{ price: 1500, description: t('pricing.description.half_day') }],
        day: [{ price: 2000, description: t('pricing.description.day') }],
      },
      images: [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE],
    },
    {
      name: 'Live',
      slug: 'on_model',
      price_per_hours: {
        hour: [{ price: 1000, description: t('pricing.description.hour') }],
        half_day: [{ price: 1500, description: t('pricing.description.half_day') }],
        day: [{ price: 2000, description: t('pricing.description.day') }],
      },
      images: [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE],
    },
    {
      name: 'Vertical',
      slug: ["ghost", "pique"],
      price_per_hours: {
        hour: [{ price: 1000, description: t('pricing.description.hour') }],
        half_day: [{ price: 1500, description: t('pricing.description.half_day') }],
        day: [{ price: 2000, description: t('pricing.description.day') }],
      },
      images: [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE],
    },
    {
      name: 'Horizontal',
      slug: 'flat',
      price_per_hours: {
        hour: [{ price: 1000, description: t('pricing.description.hour') }],
        half_day: [{ price: 1500, description: t('pricing.description.half_day') }],
        day: [{ price: 2000, description: t('pricing.description.day') }],
      },
      images: [HORIZONTAL_IMAGE, HORIZONTAL_IMAGE, HORIZONTAL_IMAGE, HORIZONTAL_IMAGE, HORIZONTAL_IMAGE],
    },
  ]
}
export function createTimingMap(t: (key: string) => string): Record<keyof Machine['price_per_hours'], TimingPeriod> {
  return {
    hour: t('pricing.timing.hour'),
    half_day: t('pricing.timing.half_day'),
    day: t('pricing.timing.day'),
  }
}

