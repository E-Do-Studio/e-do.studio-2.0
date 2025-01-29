'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { Card } from '@/app/(web)/_components/card'
import { Tabs } from '@/app/(web)/_components/tabs'
import { machines, tabs, timingMap } from '@/app/(web)/_components/machines-data'
import type { Machine } from '@/app/(web)/_components/machines-data'

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
        className="flex flex-col justify-between md:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {machines
          .filter((machine) => machine.name === activeTab)
          .map((machine) =>
            Object.entries(machine.price_per_hours).map(([period, options]) =>
              options.map((option, index) => (
                <motion.div
                  key={`${machine.name}-${period}-${index}`}
                  className="flex-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: period === 'hour' ? 0 : period === 'half_day' ? 0.1 : 0.2,
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
