import React from 'react'

export default async function Page() {
  // const { q: query } = await searchParamsPromise
  // const payload = await getPayload({ config: configPromise })

  // const posts = await payload.find({
  //   collection: 'search',
  //   depth: 1,
  //   limit: 12,
  //   select: {
  //     title: true,
  //     slug: true,
  //     categories: true,
  //     meta: true,
  //   },
  //   // pagination: false reduces overhead if you don't need totalDocs
  //   pagination: false,
  //   ...(query
  //     ? {
  //         where: {
  //           or: [
  //             {
  //               title: {
  //                 like: query,
  //               },
  //             },
  //             {
  //               'meta.description': {
  //                 like: query,
  //               },
  //             },
  //             {
  //               'meta.title': {
  //                 like: query,
  //               },
  //             },
  //             {
  //               slug: {
  //                 like: query,
  //               },
  //             },
  //           ],
  //         },
  //       }
  //     : {}),
  // })

  return (
    <div>
      {/* <PageClient /> */}
      <div className="">
        <h1 className="text-3xl md:text-5xl lg:text-6xl mb-4">About</h1>

        <div className=" mx-auto">Lorem Ipsum</div>
      </div>

      {/* {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container">No results found.</div>
      )} */}
    </div>
  )
}
