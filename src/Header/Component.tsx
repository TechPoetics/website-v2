import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { cookies } from 'next/headers'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  return <HeaderClient isAuthenticated={!!token} data={headerData} />
}
