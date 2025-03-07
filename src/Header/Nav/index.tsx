'use client'

import React, { useRef } from 'react'

import clsx from 'clsx'
import { MobileThemeToggle, ThemeToggle } from '@/providers/Theme/ThemeSelector'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import Link from 'next/link'
import { BarsIcon, BlueskyIcon, DiscordIcon, InstagramIcon } from '@/components/Icons'

export type NavLink = {
  title: string
  href: string
}

const links: NavLink[] = [
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
  {
    title: 'Admin',
    href: '/admin',
  },
]

export type SocialLink = {
  icon: React.ReactElement
  href: string
}

const socialLinks: SocialLink[] = [
  {
    icon: <DiscordIcon />,
    href: 'https://discord.gg/RkaZrjHAvU',
  },
  {
    icon: <InstagramIcon />,
    href: 'https://www.instagram.com/bostontechpoetics',
  },
  {
    icon: <BlueskyIcon />,
    href: 'https://bsky.app/profile/techpoetics.bsky.social',
  },
]

export const HeaderNav: React.FC = () => {
  return (
    <nav className="flex gap-3 items-center">
      <div className="hidden lg:flex">
        <DesktopNav />
      </div>

      <div className="flex lg:hidden gap-4">
        <MobileThemeToggle />
        <MobileNav />
      </div>
    </nav>
  )
}

export function DesktopNav() {
  return (
    <div className="flex gap-4">
      <nav className=" flex items-center justify-self-center">
        {links.map((l) => (
          <Link key={l.title} href={l.href} className={clsx('text-md transition-colors mx-2')}>
            {l.title}
          </Link>
        ))}
        {socialLinks.map((l) => (
          <Link key={l.href} href={l.href} className="w-6 mx-2" target="_blank">
            {l.icon}
          </Link>
        ))}
      </nav>

      <ThemeToggle />
    </div>
  )
}

export function MobileNav() {
  const drawerRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Drawer>
      <DrawerTrigger ref={drawerRef}>
        <BarsIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="hidden">
          <DrawerTitle>Navigation Menu</DrawerTitle>
          <DrawerDescription>
            Navigation to other pages on the Boston Tech Poetics website.
          </DrawerDescription>
        </DrawerHeader>
        <div className="h-[40vh] px-8 py-4 flex flex-col justify-between">
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
                className="text-md transition-colors text-lg"
              >
                {l.title}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-8 mb-10 mx-auto">
            {socialLinks.map((l) => (
              <Link key={l.href} href={l.href} className="w-8" target="_blank">
                {l.icon}
              </Link>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
