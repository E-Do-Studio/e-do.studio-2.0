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

type HeaderProps = {
  children: React.ReactNode
}

const navigation = [
  // { label: 'services e-commerce', href: '/services-e-commerce' },
  // { label: 'production', href: '/production' },
  // { label: 'post-prod', href: '/post-prod' },
  { label: 'phone', href: 'tel:+33144041149' },
  { label: 'gallery', href: '/gallery' },
  { label: 'services', href: '/services' },
  { label: 'pricing', href: '/pricing' },
  { label: 'contact', href: '/contact' },
] as const

interface NavigationItemProps {
  children: React.ReactNode
  href: string
}

export type Navigation = typeof navigation

export function Header() {
  const { t } = useTranslation('layout')
  const { isOpen, toggle, close } = useMobileMenu()

  return (
    <>
      <header className="flex flex-row items-center justify-between container h-24 backdrop-blur-sm bg-background/80 fixed top-0 z-50">
        <HeaderLeft>
          <Logo />
          <Clock />
        </HeaderLeft>

        {/* Desktop Navigation */}
        <Navigation className="hidden md:flex">
          {navigation.map((item) => (
            <NavigationItem key={item.label} href={item.href}>
              {t(`header.navigation.${item.label}`)}
            </NavigationItem>
          ))}
          <LanguageSwitcher />
          <Button className="w-[180px]">{t('header.cta.book')}</Button>
        </Navigation>

        {/* Mobile Menu Button */}
        <div className="flex flex-row items-center gap-6 md:hidden">
          <button>
            <Phone
              size={32}
              strokeWidth={1}
              onClick={() => window.open('tel:+33144041149', '_blank')}
            />
          </button>
          <button
            onClick={toggle}
            className="md:hidden w-12 h-12 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={48} strokeWidth={0.8} />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 12" className="w-8 h-8">
                <path
                  stroke="currentColor"
                  fill="none"
                  fillRule="evenodd"
                  d="M31 1H14.5M.5 11l30 .25"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>{isOpen && <MobileMenu navigation={navigation} />}</AnimatePresence>
    </>
  )
}

function HeaderLeft({ children }: HeaderProps) {
  return <div className="flex flex-row items-center gap-8">{children}</div>
}

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const isEnglish = i18n.language === 'en'

  return (
    <Button
      size="icon"
      className="rounded-full w-8 h-8 uppercase text-xs"
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
  return (
    <Link href={href} className="text-sm hover:text-neutral-500 hover:underline transition-colors">
      {children}
    </Link>
  )
}
