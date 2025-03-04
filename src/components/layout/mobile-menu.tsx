'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import type { Navigation } from './header'
import { useMobileMenu } from '@/store/use-mobile-menu'
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'


interface MobileMenuProps {
  navigation: Navigation
  translations: {
    bookSession: string
    address: string
  }
}

export function MobileMenu({ navigation, translations }: MobileMenuProps) {
  const { close } = useMobileMenu()
  const { t } = useTranslation('layout')
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = async (href: string) => {
    const isAnchorLink = href.startsWith('#')

    // Close menu first
    close()

    if (isAnchorLink) {
      const targetId = href.slice(1)

      if (pathname === '/') {
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Stocker l'ID de l'ancre pour le scroll après navigation
        sessionStorage.setItem('scrollToId', targetId)

        // Navigation vers la page d'accueil
        await router.push('/')
      }
    } else {
      await router.push(href)
    }
  }

  // Effet pour gérer le scroll après la navigation
  useEffect(() => {
    if (pathname === '/') {
      const scrollToId = sessionStorage.getItem('scrollToId')
      if (scrollToId) {
        const element = document.getElementById(scrollToId)
        if (element) {
          // Petit délai pour s'assurer que la page est rendue
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' })
            sessionStorage.removeItem('scrollToId')
          }, 100)
        }
      }
    }
  }, [pathname])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }} // Reduced animation duration
      className={cn('fixed inset-0 z-50 md:hidden', 'bg-background flex flex-col', 'pt-24')}
    >
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.2 }} // Reduced animation duration
        className="flex flex-col container h-full"
      >
        <div className="flex flex-col flex-1 justify-center gap-8">
          {navigation
            .filter((item) => item.label !== 'phone' as any)
            .map((item) => (
              <motion.div
                key={item.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick(item.href)
                  }}
                  className="text-4xl font-light hover:text-neutral-500 transition-colors"
                >
                  {t(`header.navigation.${item.label}`)}
                </Link>
              </motion.div>
            ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="py-8"
        >
          <Button
            onClick={() => {
              handleClick('/reservation')
              close()
            }}
            className="w-full text-lg py-6"
          >
            {translations.bookSession}
          </Button>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="py-8"
        >
          <Link
            href="tel:+33144041149"
            onClick={close}
            className="block text-2xl font-light hover:text-neutral-500 transition-colors"
          >
            {t('header.navigation.phone')}
          </Link>
          <Link
            href="mailto:contact@e-do.studio"
            onClick={close}
            className="block text-xl font-light hover:text-neutral-500 transition-colors"
          >
            contact@e-do.studio
          </Link>
          <p className="text-xl">{translations.address}</p>
        </motion.div>
      </motion.nav>
    </motion.div>
  )
}
