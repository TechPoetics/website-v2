import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getEventsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'events',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      // TODO remove?
      {
        loc: `${SITE_URL}/search`,
        lastmod: dateFallback,
      },
      // TODO upcoming events?
      {
        loc: `${SITE_URL}/past-events`,
        lastmod: dateFallback,
      },
    ]

    const sitemap = results.docs
      ? results.docs
          .filter((event) => Boolean(event?.slug))
          // TODO handle upcoming events
          .map((event) => ({
            loc: `${SITE_URL}/past-events/${event?.id}`,
            lastmod: event.updatedAt || dateFallback,
          }))
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['events-sitemap'],
  {
    tags: ['events-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getEventsSitemap()

  return getServerSideSitemap(sitemap)
}
