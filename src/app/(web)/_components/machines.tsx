'use client'

import { Tabs } from '@/app/(web)/_components/tabs'
import { Card } from '@/app/(web)/_components/card'
import { useState } from 'react'
import { motion } from 'motion/react'

type TimingPeriod = 'Heure' | 'Demi-journée' | 'Journée'

interface Machine {
  name: string
  price_per_hours: {
    hour: { price: number; description: string }[]
    half_day: { price: number; description: string }[]
    day: { price: number; description: string }[]
  }
}

const tabs = ['Cyclorama', 'Horizontal', 'Vertical', 'Live', 'Eclipse']

const machines: Machine[] = [
  {
    name: 'Cyclorama',
    price_per_hours: {
      hour: [
        {
          price: 1000,
          description: '1 heure de shooting\nSelf-service',
        },
      ],
      half_day: [
        {
          price: 1500,
          description: '4 heures de shooting\nSelf-service',
        },
      ],
      day: [
        {
          price: 2000,
          description: '8 heures de shooting\nSelf-service',
        },
      ],
    },
  },
  {
    name: 'Horizontal',
    price_per_hours: {
      hour: [
        {
          price: 1000,
          description: '1 heure de shooting \n Self-service',
        },
      ],
      half_day: [
        {
          price: 1500,
          description: '4 heures de shooting \n Self-service',
        },
      ],
      day: [
        {
          price: 2000,
          description: '8 heures de shooting \n Self-service',
        },
      ],
    },
  },
  {
    name: 'Vertical',
    price_per_hours: {
      hour: [
        {
          price: 1000,
          description: '1 heure de shooting \n Self-service',
        },
      ],
      half_day: [
        {
          price: 1500,
          description: '4 heures de shooting \n Self-service',
        },
      ],
      day: [
        {
          price: 2000,
          description: '8 heures de shooting \n Self-service',
        },
      ],
    },
  },
  {
    name: 'Eclipse',
    price_per_hours: {
      hour: [
        {
          price: 1000,
          description: '1 heure de shooting \n Self-service',
        },
      ],
      half_day: [
        {
          price: 1500,
          description: '4 heures de shooting \n Self-service',
        },
      ],
      day: [
        {
          price: 2000,
          description: '8 heures de shooting \n Self-service',
        },
      ],
    },
  },
  {
    name: 'Live',
    price_per_hours: {
      hour: [
        {
          price: 1000,
          description: '1 heure de shooting \n Self-service',
        },
      ],
      half_day: [
        {
          price: 1500,
          description: '4 heures de shooting \n Self-service',
        },
      ],
      day: [
        {
          price: 2000,
          description: '8 heures de shooting \n Self-service',
        },
      ],
    },
  },
]

const timingMap: Record<keyof Machine['price_per_hours'], TimingPeriod> = {
  hour: 'Heure',
  half_day: 'Demi-journée',
  day: 'Journée',
}

export const Machines = () => {
  const [activeTab, setActiveTab] = useState(tabs[0])

  function formatDescription(description: string) {
    return description.split('\n').map((text, i) => (
      <span key={i}>
        {text}
        {i !== description.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="flex flex-col gap-8">
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <motion.div
        className="grid grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {machines
          .filter((machine) => machine.name === activeTab)
          .map((machine) =>
            Object.entries(machine.price_per_hours).map(([period, options]) =>
              options.map((option, index) => (
                <motion.div
                  key={`${machine.name}-${period}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: period === 'hour' ? 0 : period === 'half_day' ? 0.05 : 0.1,
                  }}
                >
                  <Card
                    timing={timingMap[period as keyof Machine['price_per_hours']]}
                    price={option.price}
                    description={formatDescription(option.description)}
                  />
                </motion.div>
              )),
            ),
          )}
      </motion.div>
    </div>
  )
}
