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
import { useEffect } from 'react'


type HeaderProps = {
  children: React.ReactNode
}

const navigation = [
  { label: 'cyclorama', href: '/cyclorama' },
  { label: 'post-production', href: '/post-production/high_end' },
  { label: 'gallery', href: '/galerie?category=on_model' },
  { label: 'services', href: '#services' },
  { label: 'pricing', href: '#pricing' },
  { label: 'contact', href: '#contact' },
] as const

interface NavigationItemProps {
  children: React.ReactNode
  href: string
}

export type Navigation = typeof navigation

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
              <NavigationItem key={item.label} href={item.href}>
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

function NavigationItem({ children, href }: NavigationItemProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isPhoneLink = href.startsWith('tel:')
  const isAnchorLink = href.startsWith('#')
  const scrolled = useScroll()

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchorLink) {
      e.preventDefault()
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
  )
}