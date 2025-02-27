import { EventCard } from '@/components/EventCard'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import PageClient from './past-events/[id]/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const upcomingEvents = await payload.find({
    collection: 'events',
    depth: 1,
    // TODO paginate?
    limit: 100,
    overrideAccess: false,
    where: {
      'date.end': {
        greater_than_equal: new Date(),
      },
    },
    sort: '-date.start',
  })

  return (
    <article>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url="/" />
      {draft && <LivePreviewListener />}

      <h1 className="text-3xl md:text-5xl lg:text-6xl mb-4">Upcoming Events</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {upcomingEvents.docs.map((d) => {
          return <EventCard key={d.id} event={d} />
        })}
      </div>
    </article>
  )
}
