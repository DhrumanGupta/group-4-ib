import { useRouter } from 'next/router'
import Link from './Link'

function NavLink({ to, exact, children, activeClassName, ...props }) {
  const { pathname } = useRouter()
  const isActive = exact ? pathname === to : pathname.startsWith(to)

  if (isActive) {
    props.className = props.className
      ? `${props.className} ${activeClassName}`
      : activeClassName
  }

  return (
    <Link href={to} {...props}>
      {children}
    </Link>
  )
}

export default NavLink
