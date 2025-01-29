import { Separator } from '@/components/ui/separator'
import { motion } from 'motion/react'

interface CardProps {
  timing: string
  price: number
  description: React.ReactNode
}

export const Card = ({ timing, price, description }: CardProps) => {
  return (
    <motion.div
      className="flex flex-col gap-4 p-4 bg-neutral-100 rounded-lg cursor-pointer"
      whileHover={{
        scale: 1.03,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <div className="flex flex-col">
        <h3 className="text-2xl font-abc-favorit font-bold">{timing}</h3>
        <p className="text-base text-neutral-500 font-medium">{description}</p>
      </div>
      <Separator className="mt-6" />
      <p className="text-2xl font-medium">
        {price}€ <span className="text-sm">HT</span>
      </p>
    </motion.div>
  )
}
