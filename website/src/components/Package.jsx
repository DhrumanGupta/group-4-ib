import React from 'react'
import Card from './UI/Card'
import { BiPackage } from 'react-icons/bi'

function Package({ id, deliveryLocation, sanitized, warehouse, heldBy }) {
  return (
    <Card className={'grid grid-cols-4'}>
      <BiPackage className={'w-full h-full text-orange-300'} />
      <span className={'ml-6 col-span-3'}>
        <p className={'font-semibold'}>Destination:</p>
        <p>{deliveryLocation}</p>
        <p className={'mt-2 text-gray-600'}>
          {sanitized ? 'Sanitized' : 'Not Sanitized'}
        </p>
        <p className={'text-gray-600'}>{warehouse && `In ${warehouse.name}`}</p>
        <p className={'text-gray-600'}>{heldBy && `With ${heldBy.name}`}</p>
      </span>
    </Card>
  )
}

export default Package
