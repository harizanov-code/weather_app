import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import NavLink, { NavLinkItem } from '../components/NavLink'
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import Profile from '../../components-new/Profile'

export interface NavMenuProps {
  layout: string
  spacing: string
  links: NavLinkItem[]
  isLoggedIn: boolean
  user: KindeUser | null
}

const NavMenu = ({
  layout,
  spacing,
  links,
  isLoggedIn,
  user,
}: NavMenuProps) => {
  return (
    <nav className={` ${layout} ${spacing}`}>
      {links.map((link, index) => (
        <NavLink
          key={index}
          href={link.href}
          icon={link.icon}
          text={link.text}
          spaceX={link.spaceX}
        />
      ))}
      {isLoggedIn ? (
        <>
          <Profile
            picture={user?.picture}
            given_name={user?.given_name}
          ></Profile>
        </>
      ) : (
        <>
          <LoginLink
            postLoginRedirectURL="/home"
            // href="login"
            className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg: text-light-blue text-xs capitalize font-normal leading-6"
          >
            Login
          </LoginLink>

          <RegisterLink
            postLoginRedirectURL="/checkUser"
            // href="register"
            className="rounded-md bg-indigo-600 px-3 py-2  text-light-blue  text-sm capitalize font-normal leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sing up
          </RegisterLink>
        </>
      )}
    </nav>
  )
}

export default NavMenu
