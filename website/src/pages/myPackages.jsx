import React from 'react'
import { getMine } from '../utils/packageApi'
import Loading from '../components/UI/Loading'
import Package from '../components/Package'
import useSWR from 'swr'
import { packageRoutes } from '../data/Routes'

function MyPackages() {
  const { mutate, data, error } = useSWR(packageRoutes.getMine, getMine)

  if (error) {
    return <p>There was an error loading this page</p>
  }

  if (!data && !error) {
    return <Loading />
  }

  if (data.data.length <= 0) {
    return (
      <main className={'flex grow items-center justify-center'}>
        <p className={'text-gray-500 text-lg md:text-xl lg:text-2xl'}>
          Wow, such empty
        </p>
      </main>
    )
  }

  return (
    <main
      className={
        'w-full mx-auto max-w-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'
      }
    >
      <section
        className={
          'mt-4 grid mx-auto gap-4 grid-rows-1 h-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }
      >
        {data.data.map((packageData) => (
          <Package key={packageData.id} {...packageData} mutate={mutate} />
        ))}
      </section>
    </main>
  )
}

export default MyPackages
