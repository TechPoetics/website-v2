import React from 'react'

import type { Header } from '@/payload-types'
import { draftMode } from 'next/headers'
import { AdminBar } from '@/components/AdminBar'
import { HeaderNav } from './Nav'
import Link from 'next/link'

export async function Header() {
  const { isEnabled } = await draftMode()
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50">
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />

        <div className="flex justify-between px-6 py-4 backdrop-blur-xl">
          <Link href="/" className="justify-self-start">
            <h1 className="text-3xl lg:text-4xl">Boston Tech Poetics</h1>
          </Link>

          <HeaderNav />
        </div>
      </header>
    </div>
  )
}
