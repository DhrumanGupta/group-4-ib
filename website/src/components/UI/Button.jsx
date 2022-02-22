import React from 'react'
import propTypes from 'prop-types'

function Button({ children, onClick, className, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`my-2 block px-6 py-3 text-sm transition-colors duration-300 rounded rounded-full shadow-md text-white bg-orange-500 hover:bg-orange-600 shadow-orange-400/30 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

Button.proptypes = {
  onClick: propTypes.func,
  className: propTypes.string,
  disabled: propTypes.bool,
}

Button.defaultProps = {
  className: '',
  disabled: false,
}

export default Button
