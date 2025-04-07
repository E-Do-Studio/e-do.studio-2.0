'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export function CategoryDescription() {
    const searchParams = useSearchParams()
    const { t } = useTranslation('gallery')
    const currentCategory = searchParams?.get('category')

    if (!currentCategory) return null

    const description = t(`gallery.descriptions.${currentCategory}`, { defaultValue: '' })
    if (!description) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 backdrop-blur-sm"
        >
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
                {description}
            </p>
        </motion.div>
    )
} 