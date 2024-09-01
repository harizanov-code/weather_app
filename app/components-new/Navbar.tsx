import Link from 'next/link'
import Image from 'next/image'

import NavbarLink from './NavbarLink'

import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components'

import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import Profile from './Profile'

import MobileNavButton from './MobileNavButton'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import MobileNav from './MobileNav'
import ClientReduxProvider from './reduxComponents/ClientReduxProvider'
import MobileNavWithRedux from './reduxComponents/MobileNavWithRedux'
import MobileNavButtonWithRedux from './reduxComponents/MobileNavButtonWithRedux'
import NavbarLinks from './NavbarLinks'

export default async function Example() {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()

  const user = await getUser()

  return (
    <header className=" bg-dark-nav rounded-b-md ">
      <nav
        className=" min-w-360px xl:mx-[20px] flex  max-w-[2560px] items-center justify-between lg:gap-x-7  lg:px-8"
        aria-label="Global"
      >
        <div className="flex mx-2 align-middle ">
          <Link href="/home" className="">
            <span className="sr-only">Your Company</span>
            <Image
              src="/weather-icon-main.svg"
              alt="logo"
              width={25}
              height={25}
              className="object-contain sm:w-[70px] sm:h-[50px]"
            />
          </Link>
        </div>
        <NavbarLinks></NavbarLinks>
        <div className="flex grow justify-center items-center text-light-blue  h-12 lg:hidden">
          {' '}
          Weather
        </div>
        <div className="hidden  lg:flex  grow  items-center justify-end gap-x-6 text-light-blue  text-sm  lg:text-md capitalize font-normal leading-6">
          {isLoggedIn ? (
            <>
              <Profile
                picture={user?.picture}
                given_name={user?.given_name}
              ></Profile>
              <LogoutLink>Logout</LogoutLink>
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
        </div>
        <ClientReduxProvider>
          <MobileNavButtonWithRedux />
          {user ? <MobileNavWithRedux user={user} /> : <></>}
        </ClientReduxProvider>
      </nav>
      {/*       
      <ClientReduxProvideFr>
       
      </ClientReduxProvideFr> */}
    </header>
  )
}
