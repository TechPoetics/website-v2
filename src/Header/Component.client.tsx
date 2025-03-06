'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { JSX, useEffect, useRef, useState } from 'react'

import type { Header } from '@/payload-types'

import { ThemeToggle } from '@/providers/Theme/ThemeSelector'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import clsx from 'clsx'

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
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Past Events',
    href: '/events',
  },
  // {
  //   title: 'Showcase',
  //   href: '/showcase',
  // },
  {
    title: 'Login',
    href: '/admin',
  },
]

export const HeaderClient: React.FC<HeaderClientProps> = ({ isAuthenticated, adminBar }) => {
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

      <div className="flex justify-between px-6 py-4 backdrop-blur-xl">
        <Link href="/" className="justify-self-start">
          <h1 className="text-3xl lg:text-4xl">Boston Tech Poetics</h1>
        </Link>

        <div className="hidden lg:flex">
          <DesktopNav isAuthenticated={isAuthenticated} />
        </div>

        <div className="flex lg:hidden gap-4">
          <ThemeToggle />
          <MobileNav isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  )
}

interface NavProps {
  isAuthenticated: boolean
}

function DesktopNav({ isAuthenticated }: NavProps) {
  return (
    <div className="flex gap-4">
      <nav className=" flex items-center justify-self-center gap-8">
        {links.map((l) => (
          <Link
            key={l.title}
            href={l.href}
            className={clsx('text-md transition-colors', {
              hidden: l.href === '/admin' && isAuthenticated,
            })}
          >
            {l.title}
          </Link>
        ))}
      </nav>

      <ThemeToggle />
    </div>
  )
}

function MobileNav({ isAuthenticated }: NavProps) {
  const drawerRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Drawer>
      <DrawerTrigger ref={drawerRef}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="hidden">
          <DrawerTitle>Navigation Menu</DrawerTitle>
          <DrawerDescription>
            Navigation to other pages on the Boston Tech Poetics website.
          </DrawerDescription>
        </DrawerHeader>
        <div className="h-[40vh] px-8 py-4">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.title}
                href={l.href}
                onClick={() => {
                  // Automatically close the drawer when a link is clicked.
                  if (drawerRef) {
                    drawerRef.current?.click()
                  }
                }}
                className={clsx('text-md transition-colors text-lg', {
                  hidden: l.href === '/admin' && isAuthenticated,
                })}
              >
                {l.title}
              </Link>
            ))}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
