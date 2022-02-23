import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getFromId } from '../../utils/warehouseApi'
import Loading from '../../components/UI/Loading'
import Package from '../../components/Package'
import useAxiosData from '../../hooks/useAxiosData'
import useSWR, { mutate } from 'swr'
import { packageRoutes, warehouseRoutes as wareHouseRoutes } from '../../data/Routes'
import { getMine, give } from '../../utils/packageApi'
import GivePackage from '../../components/GivePackage'

function Slug() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const {slug} = router.query
  const warehouseData = useSWR(
    mounted ? `${wareHouseRoutes.get}/${slug}` : null,
    () => getFromId(slug)
  )

  const myPackagesData = useSWR(packageRoutes.getMine, getMine)

  useEffect(() => {
    if (!router.isReady) return
    setMounted(true)
  }, [router.isReady])

  if (warehouseData.error || myPackagesData.error) {
    return <p>There was an error loading this page</p>
  }

  if (!warehouseData.data && !warehouseData.error) {
    return <Loading />
  }

  return (
    <main
      className={
        'w-full mx-auto max-w-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl grow flex flex-col'
      }
    >
      <h1 className={'font-bold text-2xl'}>{warehouseData.data.data.name}</h1>
      <h3>{warehouseData.data.data.location}</h3>

      {
        myPackagesData.data && myPackagesData.data.data.length > 0 && (
          <span className={'mt-2'}>
            <GivePackage packages={myPackagesData.data.data} onGive={async (id) => {
              await give({packageId: id, warehouseId: slug})
              await myPackagesData.mutate(null)
              await warehouseData.mutate(null)
            }}/>
          </span>
        )
      }

      {warehouseData.data.data.packages.length <= 0 && (
          <p className={'text-gray-500 text-lg md:text-xl lg:text-2xl block text-center mt-auto my-auto'}>
            Wow, such empty
          </p>
      )}

      <section
        className={
          'mt-4 grid mx-auto gap-4 grid-rows-1 h-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }
      >
        {warehouseData.data.data.packages.map((x) => (
          <Package key={x.id} {...x} mutate={warehouseData.mutate} />
        ))}
      </section>
      <br/>
    </main>
  )
}

export default Slug
