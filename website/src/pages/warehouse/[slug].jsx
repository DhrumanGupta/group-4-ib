import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getFromId } from '../../utils/warehouseApi'
import Loading from '../../components/UI/Loading'
import Package from '../../components/Package'
import useAxiosData from '../../hooks/useAxiosData'
import useSWR from 'swr'
import { warehouseRoutes as wareHouseRoutes } from '../../data/Routes'

function Slug() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { data, error, mutate } = useSWR(
    mounted ? `${wareHouseRoutes.get}/${router.query.slug}` : null,
    () => getFromId(router.query.slug)
  )

  useEffect(() => {
    if (!router.isReady) return
    setMounted(true)
  }, [router.isReady])

  if (error) {
    return <p>There was an error loading this page</p>
  }

  if (!data && !error) {
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

      {data.data.packages.length <= 0 && (
        <main className={'flex grow items-center justify-center h-full'}>
          <p className={'text-gray-500 text-lg md:text-xl lg:text-2xl'}>
            Wow, such empty
          </p>
        </main>
      )}

      <section
        className={
          'mt-4 grid mx-auto gap-4 grid-rows-1 h-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }
      >
        {data.data.packages.map((x) => (
          <Package key={x.id} {...x} mutate={mutate} />
        ))}
      </section>
    </main>
  )
}

export default Slug
