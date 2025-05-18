import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: "Boston Tech Poetics is a Boston-based creative collective exploring the intersection of technology, digital art, and interactive media through innovative projects and collaborations.",
  images: [
    {
      url: `${getServerSideURL()}/android-chrome-512x512.png`,
    },
  ],
  siteName: 'Boston Tech Poetics',
  title: 'Boston Tech Poetics',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
