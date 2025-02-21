import { EventCard } from '@/components/EventCard'
import { generateMetadata } from '../[slug]/page'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import PageClient from '../[slug]/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'
import { Event } from '@/payload-types'

export default async function Page() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const pastEvents = await payload.find({
    collection: 'events',
    depth: 1,
    // TODO paginate?
    limit: 100,
    overrideAccess: false,
    where: {
      'date.end': {
        less_than: new Date(),
      },
    },
    select: {
      title: true,
      slug: true,
      date: true,
      description: true,
      image: true,
      location: true,
      registration: true,
      links: true,
    },
    sort: '-date.start',
  })

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url="/" />
      {draft && <LivePreviewListener />}

      <div className="max-w-5xl mx-auto px-8 md:px-0">
        <div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl mb-4">Past Events</h1>
          <div className="grid gap-8 md:grid-cols-2">
            {pastEvents.docs.map((d) => {
              return <EventCard key={d.id} event={d as Event} />
            })}
          </div>
        </div>
      </div>
    </article>
  )
}

export { generateMetadata }
