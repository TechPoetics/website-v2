import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'A community for tech artists in the Boston area.',
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
