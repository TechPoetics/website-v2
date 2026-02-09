import { EventCard } from '@/components/EventCard'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import PageClient from './events/[id]/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const upcomingEvents = await payload.find({
    collection: 'events',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    where: {
      'date.end': {
        greater_than_equal: new Date(),
      },
    },
    sort: 'date.start',
  })

  return (
    <article>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url="/" />
      {draft && <LivePreviewListener />}

      <div className="pt-4 md:pt-2">
        <div className='mb-4'>
          <h2 className="text-2xl md:text-3xl mb-4">Upcoming Events</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {upcomingEvents.docs.length === 0 && (
              "No upcoming events"
            )}

            {upcomingEvents.docs.map((d) => {
              return <EventCard key={d.id} event={d} />
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl mb-4">About</h2>
          <p>
            Boston Tech Poetics is a collective of artists drawn to technology and technologists inspired by the arts.
            We have monthly meetings and our events range from showcasing featured speakers, providing an open space for anyone to share their work with the community, and organizing cool workshops and other activities.

            If you would like to get involved, join our <Link href="https://discord.gg/RkaZrjHAvU" aria-label='discord-link' target='_blank' className='underline'>Discord</Link>!
          </p>
        </div>
      </div>
    </article>
  )
}
