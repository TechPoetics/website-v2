import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderHero } from '@/heros/RenderHero'
import PageClient from '../[slug]/page.client'

export default async function Page() {
  const { isEnabled: draft } = await draftMode()
  const url = '/about'

  const page = await queryAboutPage()

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

const queryAboutPage = cache(async () => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: 'about',
      },
    },
  })

  return result.docs?.[0] || null
})
