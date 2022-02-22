import React from 'react'

function Card({ children, className }) {
  return (
    <div className={`bg-white shadow rounded p-10 ${className}`}>
      {children}
    </div>
  )
}

Card.defaultProps = {
  className: '',
}

export default Card
