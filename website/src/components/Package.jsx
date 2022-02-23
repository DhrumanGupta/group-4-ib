import React, { useState } from 'react'
import Card from './UI/Card'
import { BiPackage } from 'react-icons/bi'
import Button from './UI/Button'
import {
  take as takePackage,
  sanitize as sanitizePackage,
} from '../utils/packageApi'

function Package({
  id,
  deliveryLocation,
  sanitized,
  warehouseId,
  heldById,
  mutate,
}) {
  const mutateData = () => {
    mutate ? mutate() : location.reload()
  }

  const take = async () => {
    try {
      await takePackage(id)
      mutateData()
    } catch {
      alert('There was an error taking the package')
    }
  }

  const sanitize = async () => {
    try {
      await sanitizePackage(id)
      await mutateData()
    } catch {
      alert('There was an error sanitizing the package')
    }
  }

  return (
    <Card className={'grid grid-cols-4'}>
      <BiPackage className={'w-full h-full text-orange-300'} />
      <span className={'ml-6 col-span-3'}>
        <p className={'font-semibold'}>Package #{id}</p>
        <p>{deliveryLocation}</p>
        <p className={'mt-2 text-gray-600'}>
          {sanitized ? (
            <span className={'text-green-400'}>Sanitized</span>
          ) : (
            <span className={'text-red-400'}>Not Sanitized</span>
          )}
        </p>
        {warehouseId && (
          <Button
            onClick={take}
            className={`!my-0 !rounded-lg !px-4 !py-2 !mt-2`}
          >
            Take
          </Button>
        )}
        {heldById && !sanitized && (
            <Button
              onClick={sanitize}
              className={`!rounded-lg !px-4 !py-2 !mt-2`}
            >
              Sanitize
            </Button>
        )}
      </span>
    </Card>
  )
}

export default Package
