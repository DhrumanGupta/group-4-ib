import React from 'react'
import Card from './UI/Card'
import propTypes from 'prop-types'
import Link from './Utils/Link'

function Warehouse({ image, location, name, id }) {
  return (
    <Link href={`/warehouse/${id}`}>
      <Card className={'mx-auto h-full flex flex-col w-full'}>
        <img alt={'Warehouse Image'} src={image} className={'rounded-sm'} />
        <h2 className={'font-bold text-xl mt-1'}>{name}</h2>
        <p className={'text-gray-700'}>{location}</p>
        <br />
        <p className={'mt-auto text-sm text-gray-700'}>Click to see more</p>
      </Card>
    </Link>
  )
}

Warehouse.propTypes = {
  image: propTypes.string,
  location: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
}

Warehouse.defaultProps = {
  image:
    'https://www.prologis.com/sites/corporate/files/images/2019/09/large-ontario_dc9_3_11.jpg',
}

export default Warehouse
