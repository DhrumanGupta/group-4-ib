import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { warehouseRoutes } from '../../data/Routes'
import { getFromId } from '../../utils/warehouseApi'
import Loading from '../../components/UI/Loading'
import Package from '../../components/Package'

function Slug(props) {
  const router = useRouter()

  const [data, setData] = useState({ data: undefined, error: undefined })

  useEffect(() => {
    if (!router.isReady) return
    const { slug } = router.query

    getFromId(slug)
      .then((resp) => {
        setData({
          error: undefined,
          data: resp.data,
        })
      })
      .catch((err) => {
        setData({
          error: err,
          data: undefined,
        })
      })
  }, [router.isReady, router.query])

  if (data.error) {
    return <p>There was an error loading this page</p>
  }

  if (!data.data) {
    return <Loading />
  }

  return (
    <main
      className={
        'w-full mx-auto max-w-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'
      }
    >
      <h1 className={'font-bold text-2xl'}>{data.data.name}</h1>
      <h3>{data.data.location}</h3>

      <section
        className={
          'mt-4 grid mx-auto gap-4 grid-rows-1 h-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }
      >
        {data.data.packages.map((x) => (
          <Package key={x.id} {...x} />
        ))}
      </section>
    </main>
  )
}

export default Slug
