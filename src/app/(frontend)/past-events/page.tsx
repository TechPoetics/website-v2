import { EventCard } from '@/components/EventCard'
import { generateMetadata } from '../[slug]/page'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import PageClient from '../[slug]/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'

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
    sort: '-date.start',
  })

  return (
    <article>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url="/" />
      {draft && <LivePreviewListener />}

      <div>
        <div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl mb-4">Past Events</h1>
          <div className="grid gap-8 lg:grid-cols-2">
            {pastEvents.docs.map((d) => {
              return <EventCard key={d.id} event={d} />
            })}
          </div>
        </div>
      </div>
    </article>
  )
}

export { generateMetadata }
