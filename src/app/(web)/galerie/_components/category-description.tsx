'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Asterisk } from 'lucide-react';

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
        >
            <p className="text-xs md:text-sm text-black leading-relaxed">
                <Asterisk className='w-4 h-4 inline-block mr-1 mb-2' /> {description}
            </p>
        </motion.div>
    )
} 