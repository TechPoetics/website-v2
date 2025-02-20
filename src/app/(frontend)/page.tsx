import { EventCard } from '@/components/EventCard'
import { generateMetadata } from './[slug]/page'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import PageClient from './[slug]/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'
import { Event } from '@/payload-types'

export default async function Page() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const events = await payload.find({
    collection: 'events',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      date: true,
      description: true,
      image: true,
      location: true,
      registration: true,
    },
    sort: 'date_start',
  })

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url="/" />
      {draft && <LivePreviewListener />}

      <div className="max-w-5xl mx-auto grid gap-8 px-8 md:px-0 md:grid-cols-2">
        {events.docs.map((d) => {
          return <EventCard key={d.id} event={d as Event} />
        })}
      </div>
    </article>
  )
}

export { generateMetadata }
