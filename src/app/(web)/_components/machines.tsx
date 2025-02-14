'use client'

import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/app/(web)/_components/card'
import { Tabs } from '@/app/(web)/_components/tabs'
import { tabs, createMachines, createTimingMap } from '@/app/(web)/_components/machines-data'
import type { Machine } from '@/app/(web)/_components/machines-data'
import { CarouselMachines } from '@/app/(web)/_components/carousel-machines'
import { Button } from '@/components/ui/button'

interface Asset {
  id: string
  url: string
  filename: string
  alt?: string
  sizes: {
    thumbnail?: {
      url: string
      width: number
      height: number
    }
    card?: {
      url: string
      width: number
      height: number
    }
    tablet?: {
      url: string
      width: number
      height: number
    }
  }
}

interface Link {
  id: string
  url: string
}

interface Category {
  id: number
  slug: string
  name: string
  assets: Asset[]
  videos: string[]
  links: Link[]
  subcategories: any[]
  updatedAt: string
  createdAt: string
}

interface CategoriesResponse {
  docs: Category[]
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  page: number
  totalDocs: number
  totalPages: number
}

export const Machines = ({ categories }: { categories: CategoriesResponse }) => {
  const { t } = useTranslation('home')
  const reorderedTabs = tabs.filter(tab => tab.toLowerCase() !== 'cyclorama').concat(['Cyclorama'])
  const [activeTab, setActiveTab] = useState(reorderedTabs[0])

  const machines = createMachines(t)
  const timingMap = createTimingMap(t)

  const activeMachine = machines.find(
    (machine) => machine.name.toLowerCase() === activeTab.toLowerCase()
  )

  // Récupérer les assets des catégories correspondant au slug de la machine active
  const carouselImages = activeMachine
    ? categories?.docs
      ?.filter(category => {
        const slugs = Array.isArray(activeMachine.slug)
          ? activeMachine.slug
          : [activeMachine.slug]
        return slugs.includes(category.slug)
      })
      ?.flatMap(category => category.assets || [])
      ?.slice(0, 10) // Prendre seulement les 10 premières images
      ?.map(asset => {
        // Utiliser la version tablet de l'image si disponible, sinon l'URL originale
        return { url: asset.sizes?.tablet?.url || asset.url, alt: asset?.alt }
      })
    : []

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
      <Tabs tabs={reorderedTabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <motion.div
        className="flex flex-col justify-between md:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {machines
          .filter((machine) => machine.name.toLowerCase() === activeTab.toLowerCase())
          .map((machine) => {
            if (machine.customContent) {
              return (
                <motion.div
                  key={machine.name}
                  className="w-full text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-6 text-lg">
                    {machine.customContent.description}
                  </p>
                  <Button
                    onClick={() => {
                      const contactSection = document.getElementById('contact')
                      contactSection?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {machine.customContent.buttonText}
                  </Button>
                </motion.div>
              )
            }

            return Object.entries(machine.price_per_hours || {}).map(([period, options]) =>
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
              ))
            )
          })}
      </motion.div>

      {carouselImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CarouselMachines images={carouselImages} alt={activeMachine?.name} />
        </motion.div>
      )}
    </div>
  )
}
