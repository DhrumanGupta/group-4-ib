import React, { useRef } from 'react'
import Button from './UI/Button'

function GivePackage({ packages, onGive }) {
  const selectRef = useRef(null)

  const give = () => {
    const selected = selectRef.current.value;
    const id = selected.split('#')[1]
    onGive(+id)
  }

  return (
    <div className={'mt-2'}>
      <span className={'flex'}>
      <h3 className={'text-lg'}>Give packages</h3>
      <select className={'mx-2'} ref={selectRef}>
        {
          packages.map(x => (
            <option key={x.id}>#{x.id}</option>
          ))
        }
      </select>
      </span>
      <Button onClick={give}>
        Give
      </Button>
    </div>
  )
}

export default GivePackage
