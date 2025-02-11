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
          'transition-all duration-500 md:duration-300 ease-in-out',
          !scrolled
            ? 'h-16 md:h-20' :
            scrollDirection === 'down'
              ? 'h-10 md:h-14 px-[40px] md:px-[60px] py-2 md:py-3' :
              'h-12 md:h-14'
        )}
      >
        <div className={cn(
          'z-10 transition-all duration-500 ease-in-out',
          scrollDirection === 'down' && scrolled
            ? 'absolute left-1/2 -translate-x-1/2 scale-75 rotate-360 md:rotate-0 md:scale-90'
            : 'relative left-0 translate-x-0 scale-90 rotate-0 md:scale-100',
          'md:transition-all md:duration-300'
        )}>
          <Logo
            variant={scrollDirection === 'down' && scrolled ? 'mobile' : 'default'}
          />
        </div>

        <div className={cn(
          'absolute inset-0 flex items-center justify-between',
          'pl-[140px] pr-[40px] md:pl-[180px] md:pr-[60px]',
          'transition-all duration-300 ease-in-out',
          'transform-gpu',
          scrollDirection === 'down' && scrolled
            ? 'opacity-0 translate-y-2'
            : 'opacity-100 translate-y-0'
        )}>
          <HeaderLeft>
            <Clock className="transition-all duration-300 ease-in-out" />
          </HeaderLeft>

          <Navigation className={cn(
            "hidden md:flex",
            "transition-all duration-300 ease-in-out"
          )}>
            {navigation.map((item) => (
              <NavigationItem key={item.label} href={item.href}>
                {t(`header.navigation.${item.label}`)}
              </NavigationItem>
            ))}
            <LanguageSwitcher />
            <Button
              asChild
              className={cn(
                'transition-all duration-300 ease-in-out',
                scrolled ? 'h-8 text-sm w-[150px]' : 'h-10 w-[180px]'
              )}
            >
              <Link href="/reservation">{t('header.cta.book')}</Link>
            </Button>
          </Navigation>

          <div className={cn(
            "flex flex-row items-center gap-6 md:hidden",
            "transition-all duration-300 ease-in-out"
          )}>
            <button>
              <Phone
                size={scrolled ? 24 : 32}
                strokeWidth={1}
                className="transition-all duration-300 ease-in-out"
                onClick={() => window.open('tel:+33144041149', '_blank')}
              />
            </button>
            <button
              onClick={toggle}
              className={cn(
                'md:hidden flex items-center justify-center',
                'transition-all duration-300 ease-in-out',
                scrolled ? 'w-10 h-10' : 'w-12 h-12'
              )}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X
                  size={scrolled ? 36 : 48}
                  strokeWidth={0.8}
                  className="transition-all duration-300 ease-in-out"
                />
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

      if (pathname !== '/') {
        router.push('/' + href)
        return
      }

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