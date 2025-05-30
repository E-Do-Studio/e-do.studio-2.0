'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import type { Navigation, SubNavItem } from './header'
import { useMobileMenu } from '@/store/use-mobile-menu'
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'


interface MobileMenuProps {
  navigation: Navigation
  translations: {
    bookSession: string
    address: string
  }
}

type ExpandedState = {
  [key: string]: boolean;
};

export function MobileMenu({ navigation, translations }: MobileMenuProps) {
  const { close } = useMobileMenu()
  const { t } = useTranslation('layout')
  const pathname = usePathname()
  const router = useRouter()
  const [expandedItems, setExpandedItems] = React.useState<ExpandedState>({})
  
  const toggleExpanded = (itemKey: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }))
  }

  const handleClick = async (href: string) => {
    const isAnchorLink = href.startsWith('#')

    // Close menu first
    close()

    if (isAnchorLink) {
      const targetAnchor = href.split('#')[1]

      if (pathname === '/') {
        const element = document.querySelector(`#${targetAnchor}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        try {
          // Navigate to home page first
          await router.push('/')

          // Use router.refresh() to ensure the page is fully loaded
          router.refresh()

          // Wait for the page to be fully loaded and then scroll
          const checkAndScroll = () => {
            const element = document.querySelector(`#${targetAnchor}`)
            if (element) {
              setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            } else {
              // If element not found, try again after a short delay
              setTimeout(checkAndScroll, 100)
            }
          }

          // Start checking after initial delay
          setTimeout(checkAndScroll, 500)
        } catch (error) {
          console.error('Navigation error:', error)
        }
      }
    } else {
      await router.push(href)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn('fixed inset-0 z-50 md:hidden', 'bg-background flex flex-col', 'pt-24')}
    >
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
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
                className="flex flex-col"
              >
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className="flex items-center justify-between text-4xl font-light hover:text-neutral-500 transition-colors"
                    >
                      {t(`header.navigation.${item.label}`)}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className={cn('transition-transform ml-2', expandedItems[item.label] ? 'rotate-180' : '')}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    
                    {expandedItems[item.label] && (
                      <div className="mt-4 ml-6 flex flex-col gap-3">
                        {item.subItems.map((subItem) => (
                          <div key={subItem.label} className="flex flex-col">
                            {subItem.subItems ? (
                              <>
                                <button
                                  onClick={() => toggleExpanded(`${item.label}-${subItem.label}`)}
                                  className="flex items-center justify-between text-2xl font-light hover:text-neutral-500 transition-colors"
                                >
                                  {t(`header.navigation.${subItem.label}`)}
                                  <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="18" 
                                    height="18" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    className={cn('transition-transform ml-2', expandedItems[`${item.label}-${subItem.label}`] ? 'rotate-180' : '')}
                                  >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                  </svg>
                                </button>
                                
                                {expandedItems[`${item.label}-${subItem.label}`] && (
                                  <div className="mt-2 ml-4 flex flex-col gap-2">
                                    {subItem.subItems.map((nestedItem) => (
                                      <Link
                                        key={nestedItem.label}
                                        href={nestedItem.href}
                                        onClick={(e) => {
                                          e.preventDefault()
                                          handleClick(nestedItem.href)
                                        }}
                                        className="text-xl font-light hover:text-neutral-500 transition-colors"
                                      >
                                        {t(`header.navigation.${nestedItem.label}`)}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                href={subItem.href}
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleClick(subItem.href)
                                }}
                                className="text-2xl font-light hover:text-neutral-500 transition-colors"
                              >
                                {t(`header.navigation.${subItem.label}`)}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
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
                )}
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
