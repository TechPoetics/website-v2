'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { JSX, useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/providers/Theme/ThemeSelector'

interface HeaderClientProps {
  data: Header
  isAuthenticated: boolean
  adminBar: JSX.Element
}

type Link = {
  title: string
  href: string
}

const links: Link[] = [
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Past Events',
    href: '/past-events',
  },
  {
    title: 'Showcase',
    href: '/showcase',
  },
]

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, isAuthenticated, adminBar }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // bg-[#F2F1EA]/80 border-[#E8E8E8]
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 "
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {adminBar}
      <div className="grid grid-cols-3 px-6 py-4 backdrop-blur-xl">
        <Link href="/" className="justify-self-start">
          <h1 className="text-3xl lg:text-4xl">Boston Tech Poetics</h1>
        </Link>
        <nav className="hidden md:flex items-center justify-self-center gap-8">
          {links.map((l) => (
            <Link key={l.title} href={l.href} className="text-md transition-colors">
              {l.title}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4 justify-self-end">
          <ThemeToggle />
          {!isAuthenticated && (
            <Button variant="link" asChild>
              <Link href="/admin" className="text-sm transition-colors">
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
