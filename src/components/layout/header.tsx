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
import { HEADER_HEIGHT } from '@/lib/constants'
import { useScroll } from '@/hooks/use-scroll'
import { cn } from '@/lib/utils'
import { useScrollDirection } from '@/hooks/use-scroll-direction'
import ReactGA from 'react-ga4'
import ReactPixel from 'react-facebook-pixel'

type HeaderProps = {
  children: React.ReactNode
}

const navigation = [
  { label: 'phone', href: 'tel:+33144041149' },
  { label: 'gallery', href: 'galerie?category=on_model' },
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

  return (
    <>
      <header
        className={cn(
          'flex flex-row items-center justify-between container',
          'backdrop-blur-sm bg-background/80 fixed top-0 z-50',
          'transition-all duration-200',
          scrolled ? 'h-16' : 'h-24',
        )}
      >
        {/* Logo toujours visible */}
        <div className="z-10">
          <Logo />
        </div>

        {/* Contenu qui disparaît */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-between',
          'pl-[140px] pr-[40px] md:pl-[180px] md:pr-[60px]',
          'transition-opacity duration-200',
          scrollDirection === 'down' && scrolled ? 'opacity-0' : 'opacity-100'
        )}>
          <HeaderLeft>
            <Clock className="transition-all duration-200" />
          </HeaderLeft>

          {/* Desktop Navigation */}
          <Navigation className="hidden md:flex">
            {navigation.map((item) => (
              <NavigationItem key={item.label} href={item.href}>
                {t(`header.navigation.${item.label}`)}
              </NavigationItem>
            ))}
            <LanguageSwitcher />
            <Button
              asChild
              className={cn(
                'transition-all duration-200',
                scrolled ? 'h-8 text-sm w-[150px]' : 'h-10 w-[180px]'
              )}
            >
              <Link href="/reservation">{t('header.cta.book')}</Link>
            </Button>
          </Navigation>

          {/* Mobile Menu Button */}
          <div className="flex flex-row items-center gap-6 md:hidden">
            <button>
              <Phone
                size={scrolled ? 24 : 32}
                strokeWidth={1}
                className="transition-all duration-200"
                onClick={() => window.open('tel:+33144041149', '_blank')}
              />
            </button>
            <button
              onClick={toggle}
              className={cn(
                'md:hidden flex items-center justify-center',
                'transition-all duration-200',
                scrolled ? 'w-10 h-10' : 'w-12 h-12'
              )}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X
                  size={scrolled ? 36 : 48}
                  strokeWidth={0.8}
                  className="transition-all duration-200"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 31 12"
                  className={cn(
                    'transition-all duration-200',
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

      {/* Mobile Menu */}
      <AnimatePresence>{isOpen && <MobileMenu navigation={navigation} />}</AnimatePresence>
    </>
  )
}

function HeaderLeft({ children }: HeaderProps) {
  return <div className="flex flex-row items-center">{children}</div>
}

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const isEnglish = i18n.language === 'en'

  return (
    <Button
      size="icon"
      className="rounded-full min-w-8 min-h-8 w-8 h-8 uppercase text-xs"
      onClick={() => i18n.changeLanguage(isEnglish ? 'fr' : 'en')}
    >
      {isEnglish ? 'fr' : 'en'}
    </Button>
  )
}

function Navigation({ children, className = '' }: HeaderProps & { className?: string }) {
  return (
    <nav className={`flex flex-row items-center gap-8 ${className}`}>
      {children}
    </nav>
  )
}

function NavigationItem({ children, href }: NavigationItemProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isPhoneLink = href.startsWith('tel:')

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault()

      // Si nous sommes sur une page différente, naviguer d'abord
      if (pathname !== '/') {
        router.push('/' + href)
        return
      }

      // Sur la même page, faire défiler en douceur
      const element = document.querySelector(href)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - HEADER_HEIGHT - 24

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`text-sm hover:text-neutral-500 hover:underline transition-colors ${isPhoneLink ? 'hidden [@media(min-width:1000px)]:block' : ''
        }`}
    >
      {children}
    </Link>
  )
}
