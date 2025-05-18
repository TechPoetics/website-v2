import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

export const siteTitle = 'Boston Tech Poetics';
export const siteDescription = "Boston Tech Poetics is a Boston-based creative collective exploring the intersection of technology, digital art, and interactive media through innovative projects and collaborations."

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: siteDescription,
  images: [
    {
      url: `${getServerSideURL()}/android-chrome-512x512.png`,
    },
  ],
  siteName: siteTitle,
  title: siteTitle,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
