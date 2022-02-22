import React, { useEffect } from 'react'
import useAxiosData from '../hooks/useAxiosData'
import { getAll } from '../utils/warehouseApi'
import Loading from '../components/UI/Loading'
import Warehouse from '../components/Warehouse'
import MetaDecorator from '../components/Utils/MetaDecorator'

function Warehouses(props) {
  const [warehouses, fetchWarehouses] = useAxiosData()

  useEffect(() => {
    fetchWarehouses(getAll)
  }, [])

  if (warehouses.loading || !warehouses.data) {
    return <Loading />
  }

  return (
    <main
      className={
        'grid mx-auto gap-4 grid-rows-1 h-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'
      }
    >
      <MetaDecorator title={'Warehouses'} />
      {warehouses.data.map((warehouse) => (
        <Warehouse {...warehouse} key={warehouse.id} />
      ))}
    </main>
  )
}

export default Warehouses
