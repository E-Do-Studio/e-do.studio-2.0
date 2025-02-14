'use client'

import { useTranslation } from 'react-i18next'
import { Separator } from '@/components/ui/separator'
import { motion } from 'motion/react'

interface CardProps {
  timing: string
  price: number
  description: React.ReactNode
}

export const Card = ({ timing, price, description }: CardProps) => {
  const { t } = useTranslation('home')

  return (
    <motion.div
      className="flex justify-between md:flex-col gap-4 p-4 flex-1 bg-neutral-100 rounded-lg cursor-pointer"
      whileHover={{
        scale: 1.03,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <div className="flex flex-col">
        <h3 className="">{timing}</h3>
        <p className="text-neutral-500">{description}</p>
      </div>
      <Separator className="hidden md:block mt-6" />
      <p className="text-2xl font-medium">
        {price}€ <span className="text-sm">{t('pricing.tax')}</span>
      </p>
    </motion.div>
  )
}
