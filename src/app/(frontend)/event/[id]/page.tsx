import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { EventCard } from '@/components/EventCard'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = events.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    id?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { id = '' } = await paramsPromise
  const url = '/event/' + id

  const event = await queryEventById({
    id,
  })

  if (!event) {
    return <PayloadRedirects url={url} />
  }

  return (
    <article>
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <div className="max-w-2xl mx-auto px-8 md:px-0">
        {/* <EventCard event={event} onEventPage /> */}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { id = '' } = await paramsPromise
  const event = await queryEventById({
    id,
  })

  return generateMeta({ doc: event })
}

const queryEventById = cache(async ({ id }: { id: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      id: {
        equals: id,
      },
    },
  })

  return result.docs?.[0] || null
})
