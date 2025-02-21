import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { cookies, draftMode } from 'next/headers'
import { AdminBar } from '@/components/AdminBar'

export async function Header() {
  const { isEnabled } = await draftMode()
  const headerData: Header = await getCachedGlobal('header', 1)()

  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  return (
    <div>
      <HeaderClient
        isAuthenticated={!!token}
        data={headerData}
        adminBar={(
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
        )}
      />
    </div>
  )
}
