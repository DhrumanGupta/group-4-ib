import React from 'react'

function Layout({ children }) {
  return (
    <>
      <h1>Test</h1>
      <div className={'flex grow'}>{children}</div>
      <br />
    </>
  )
}

export default Layout
