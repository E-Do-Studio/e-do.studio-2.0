'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Asterisk } from 'lucide-react';
import Image from 'next/image';

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
            <p className="text-xs md:text-sm text-black leading-relaxed font-medium">
                <Image src="/img/asterisk.png" alt="Asterisk" width={14} height={14} className='inline-block mr-1 mb-2' /> {description}
            </p>
        </motion.div>
    )
} 