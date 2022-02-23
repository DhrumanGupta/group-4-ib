import React from 'react'
import useUser from '../../hooks/useUser'
import NavLink from '../Utils/Navlink'
import Link from '../Utils/Link'
import NextLink from 'next/link'
import { logout } from '../../utils/userApi'

const NavbarItem = ({ to, children, exact }) => {
  return (
    <NavLink
      to={to}
      exact={exact}
      activeClassName={'text-gray-900'}
      className="mr-5 hover:text-gray-900"
    >
      {children}
    </NavLink>
  )
}

const AuthOnly = () => {
  const { mutate } = useUser()
  return (
    <>
      <NavbarItem to={'/warehouses'}>Warehouses</NavbarItem>
      <NavbarItem to={'/myPackages'}>My Packages</NavbarItem>
      <a
        href={'#'}
        className={'md:mr-3 hover:text-gray-900'}
        onClick={async () => {
          await logout()
          mutate(null)
        }}
      >
        Logout
      </a>
    </>
  )
}

const AnonymousOnly = () => {
  return (
    <>
      <NavbarItem to={'/login'}>Login</NavbarItem>
    </>
  )
}

const Navbar = () => {
  const { loggedIn } = useUser()

  return (
    <header className={'text-gray-600 body-font'}>
      <div
        className={
          'container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'
        }
      >
        <Link
          href={'/'}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">Home</span>
        </Link>
        <nav
          className={
            'md:ml-auto flex flex-wrap items-center text-base justify-center'
          }
        >
          {loggedIn ? <AuthOnly /> : <AnonymousOnly />}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
