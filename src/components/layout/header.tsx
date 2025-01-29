'use client'

import Link from 'next/link'
import { Logo } from '../commons/logo'
import { Clock } from './clock'
import { Button } from '../ui/button'

type HeaderProps = {
  children: React.ReactNode
}

const navigation = [
  { label: 'services e-comm', href: '/services-e-comm' },
  { label: 'production', href: '/production' },
  { label: 'post-prod', href: '/post-prod' },
  { label: 'cyclo', href: '/cyclorama' },
  { label: 'gallery', href: '/gallery' },
  { label: 'contact', href: '/contact' },
] as const

interface NavigationItemProps {
  children: React.ReactNode
  href: string
}

export function Header() {
  return (
    <header className="flex flex-row items-center justify-between container h-16 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <HeaderLeft>
        <Logo />
        <Clock />
      </HeaderLeft>
      <Navigation>
        {navigation.map((item) => (
          <NavigationItem key={item.label} href={item.href}>
            {item.label}
          </NavigationItem>
        ))}
      </Navigation>
    </header>
  )
}

function HeaderLeft({ children }: HeaderProps) {
  return <div className="flex flex-row items-center gap-8">{children}</div>
}

function Navigation({ children }: HeaderProps) {
  return (
    <nav className="flex flex-row items-center gap-8">
      {children}
      <Button variant="outline" size="sm">
        book a session
      </Button>
    </nav>
  )
}

function NavigationItem({ children, href }: NavigationItemProps) {
  return (
    <Link href={href} className="text-sm hover:text-gray-600 transition-colors">
      {children}
    </Link>
  )
}
