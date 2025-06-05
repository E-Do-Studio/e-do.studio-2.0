'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next';
import { Logo } from '../commons/logo'
import { Clock } from './clock'
import { Button } from '../ui/button'
import { AnimatePresence } from 'framer-motion'
import { Phone, X } from 'lucide-react'
import { useMobileMenu } from '@/store/use-mobile-menu'
import { MobileMenu } from './mobile-menu'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useScroll } from '@/hooks/use-scroll'
import { cn } from '@/lib/utils'
import { useScrollDirection } from '@/hooks/use-scroll-direction'
import React from 'react'


type HeaderProps = {
  children: React.ReactNode
}

export type SubNavItem = {
  label: string;
  href: string;
  subItems?: SubNavItem[];
}

type NavItem = {
  label: string;
  href: string;
  subItems?: SubNavItem[];
}

const navigation: NavItem[] = [
  { 
    label: 'services', 
    href: '#', 
    subItems: [
      { 
        label: 'systeme_ecomm', 
        href: '#',
        subItems: [
          { label: 'eclipse', href: '/services/systeme-ecomm/eclipse' },
          { label: 'horizontal', href: '/services/systeme-ecomm/horizontal' },
          { label: 'vertical', href: '/services/systeme-ecomm/vertical' },
          { label: 'live', href: '/services/systeme-ecomm/live' },
        ]
      },
      { label: 'cyclorama', href: '/cyclorama' },
    ] 
  },
  { 
    label: 'production', 
    href: '#', 
    subItems: [
      { label: 'location_equipements', href: '/production/location-equipements' },
      { label: 'art_buying', href: '/production/art-buying' },
    ] 
  },
  { 
    label: 'post-production', 
    href: '/post-production'
  },
  { label: 'galerie', href: '/galerie?category=on_model' },
  { label: 'contact', href: '#contact' },
]

interface NavigationItemProps {
  children: React.ReactNode
  href: string
  hasSubItems?: boolean
  subItems?: SubNavItem[]
}

export type Navigation = NavItem[]

export function Header() {
  const { t } = useTranslation('layout')
  const { isOpen, toggle } = useMobileMenu()
  const scrolled = useScroll()
  const { scrollDirection } = useScrollDirection()

  const mobileMenuTranslations = {
    bookSession: t('header.cta.book'),
    address: `${t('footer.address.building')}, ${t('footer.address.city')}`
  }

  return (
    <>
      <header
        className={cn(
          'flex flex-row items-center justify-between',
          'backdrop-blur-sm bg-background/80 fixed top-0 z-[60] w-full',
          'transition-all duration-700 md:duration-500 ease-in-out',
          'container',
          !scrolled
            ? 'h-16 md:h-20'
            : scrollDirection === 'down'
              ? 'h-10 md:h-14'
              : 'h-12 md:h-14'
        )}
      >
        <div className="flex-1 flex items-center justify-between">
          <div className={cn(
            'z-10 transition-all duration-700 ease-in-out flex flex-row items-center gap-4',
            scrollDirection === 'down' && scrolled
              ? 'absolute left-1/2 -translate-x-1/2 scale-75 md:scale-90'
              : 'relative left-0 translate-x-0 scale-90 md:scale-100',
            'md:transition-all md:duration-500'
          )}>
            <div className={cn(
              'transition-all duration-700 ease-in-out',
              scrollDirection === 'down' && scrolled
                ? 'rotate-360 md:rotate-0'
                : 'rotate-0'
            )}>
              <Logo
                variant={scrollDirection === 'down' && scrolled ? 'mobile' : 'default'}
              />
            </div>
            <Clock className={cn(
              "transition-all duration-500 ease-in-out",
              scrollDirection === 'down' && scrolled
                ? 'hidden translate-y-2'
                : 'block translate-y-0'
            )} />
          </div>

          <Navigation className={cn(
            "hidden md:flex items-center",
            scrollDirection === 'down' && scrolled
              ? 'opacity-0 translate-y-2'
              : 'opacity-100 translate-y-0',
            'transition-all duration-300 ease-in-out'
          )}>
            {navigation.map((item) => (
              <NavigationItem 
                key={item.label} 
                href={item.href}
                subItems={item.subItems}
              >
                {t(`header.navigation.${item.label}`)}
              </NavigationItem>
            ))}
            <LanguageSwitcher />
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                'transition-all duration-300 ease-in-out',
                scrolled ? 'h-6 w-6' : 'h-8 w-8'
              )}
              onClick={() => window.open('tel:+33144041149', '_blank')}
            >
              <Phone size={scrolled ? 16 : 20} strokeWidth={1.5} />
            </Button>
            <Button
              asChild
              className={cn(
                'transition-all duration-300 ease-in-out ml-4',
                scrolled ? 'h-6 text-xs w-[130px]' : 'h-8 text-sm w-[150px]'
              )}
            >
              <Link href="/reservation">{t('header.cta.book')}</Link>
            </Button>
          </Navigation>

          <div className={cn(
            "flex md:hidden items-center gap-4",
            scrollDirection === 'down' && scrolled
              ? 'opacity-0 translate-y-2 absolute right-0'
              : 'opacity-100 translate-y-0',
            'transition-all duration-300 ease-in-out'
          )}>
            <LanguageSwitcher />

            <Phone
              size={scrolled ? 24 : 32}
              strokeWidth={1}
              className="transition-all duration-300 ease-in-out"
              onClick={() => window.open('tel:+33144041149', '_blank')}
            />

            <button
              onClick={toggle}
              className="flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={scrolled ? 24 : 32} strokeWidth={1} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 31 12"
                  className={cn(
                    'transition-all duration-300 ease-in-out',
                    scrolled ? 'w-6 h-6' : 'w-8 h-8'
                  )}
                >
                  <path
                    stroke="currentColor"
                    fill="none"
                    fillRule="evenodd"
                    d="M31 1H14.5M.5 11l30 .25"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            navigation={navigation}
            translations={mobileMenuTranslations}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function HeaderLeft({ children }: HeaderProps) {
  return <div className="flex flex-row items-center">{children}</div>
}

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const isEnglish = i18n.language === 'en'
  const scrolled = useScroll()

  const handleLanguageChange = async () => {
    const newLang = isEnglish ? 'fr' : 'en'
    await i18n.changeLanguage(newLang)

    // Revalidate all routes
    try {
      const { revalidateOnLanguageChange } = await import('@/app/actions')
      await revalidateOnLanguageChange()
    } catch (error) {
      console.error('Failed to revalidate routes:', error)
    }
  }

  return (
    <Button
      size="icon"
      className={cn(
        "rounded-full uppercase text-xs",
        "transition-all duration-300 ease-in-out",
        scrolled
          ? "min-w-7 min-h-7 w-7 h-7"
          : "min-w-8 min-h-8 w-8 h-8"
      )}
      onClick={handleLanguageChange}
    >
      {isEnglish ? 'fr' : 'en'}
    </Button>
  )
}

function Navigation({ children, className = '' }: HeaderProps & { className?: string }) {
  return (
    <nav className={cn(
      'flex-1 flex items-center justify-end',
      'gap-4 [@media(max-width:999px)]:gap-3.5',
      className
    )}>
      {children}
    </nav>
  )
}

function NavigationItem({ children, href, subItems }: NavigationItemProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isPhoneLink = href.startsWith('tel:')
  const isAnchorLink = href.startsWith('#')
  const scrolled = useScroll()
  const { scrollDirection } = useScrollDirection()
  const [showSubMenu, setShowSubMenu] = React.useState(false)
  const hasSubItems = subItems && subItems.length > 0
  const { t } = useTranslation('layout')
  
  // État pour suivre quel sous-menu est actuellement survolé
  const [hoveredSubItem, setHoveredSubItem] = React.useState<string | null>(null)

  const getHeaderHeight = () => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      if (!scrolled) return 64 // h-16
      return scrollDirection === 'down' ? 40 : 48 // h-10 ou h-12
    } else {
      if (!scrolled) return 80 // h-20
      return 56 // h-14
    }
  }

  const scrollToElement = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      const isMobile = window.innerWidth < 768
      const headerHeight = getHeaderHeight()

      // Ajustement des marges de sécurité selon la section
      let safetyMargin = isMobile ? 0 : 24 // Garder desktop inchangé
      if (isMobile) {
        switch (targetId) {
          case 'services':
            safetyMargin = 64 // Augmenter significativement la marge pour services
            break
          case 'pricing':
            safetyMargin = 24 // Marge standard pour pricing
            break
          case 'contact':
            safetyMargin = 24 // Marge standard pour contact
            break
          default:
            safetyMargin = 24
        }
      }

      const offset = headerHeight + safetyMargin

      // Attendre que le layout soit stable
      setTimeout(() => {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }, 100)
    }
  }

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchorLink) {
      e.preventDefault()
      const targetId = href.slice(1)

      if (pathname === '/') {
        scrollToElement(targetId)
      } else {
        try {
          await router.push('/')
          // Attendre que la page soit chargée avant de scroller
          setTimeout(() => {
            scrollToElement(targetId)
          }, 500)
        } catch (error) {
          console.error('Navigation error:', error)
        }
      }
    }
  }



  return (
    <div className="relative group">
      {hasSubItems ? (
        <button
          className={cn(
            'hover:text-neutral-500 hover:underline transition-colors flex items-center gap-1',
            scrolled ? 'text-[13px]' : 'text-sm',
            isPhoneLink ? 'hidden [@media(min-width:1000px)]:block' : ''
          )}
          onClick={() => setShowSubMenu(!showSubMenu)}
        >
          {children}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn('transition-transform', showSubMenu ? 'rotate-180' : '')}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      ) : (
        <Link
          href={isAnchorLink ? '#' : href}
          onClick={handleClick}
          className={cn(
            'hover:text-neutral-500 hover:underline transition-colors',
            scrolled ? 'text-[13px]' : 'text-sm',
            isPhoneLink ? 'hidden [@media(min-width:1000px)]:block' : ''
          )}
        >
          {children}
        </Link>
      )}
      
      {hasSubItems && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-md py-2 min-w-[180px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {subItems?.map((item) => (
            <div 
              key={item.label}
              className="relative group/item"
            >
              {item.subItems ? (
                <div className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 transition-colors cursor-pointer">
                  <span>{t(`header.navigation.${item.label}`)}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="9 6 15 12 9 18"></polyline>
                  </svg>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                >
                  {t(`header.navigation.${item.label}`)}
                </Link>
              )}
              
              {/* Sous-menu de niveau 2 */}
              {item.subItems && (
                <div 
                  className="absolute left-full top-0 bg-white shadow-md rounded-md py-2 min-w-[180px] z-50 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200"
                >
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    >
                      {t(`header.navigation.${subItem.label}`)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}