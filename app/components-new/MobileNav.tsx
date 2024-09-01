'use client'

import { Dialog } from '@headlessui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import Profile from './Profile'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { XMarkIcon } from '@heroicons/react/16/solid'
import { useDispatch } from 'react-redux'
import { toggleMobileMenu } from '../../store/reducers/MobileNavSlice'
import Link from 'next/link'
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

type MobileNavProps = {
  user: KindeUser
  mobileMenuOpen: boolean
}

const MobileNav = ({ user, mobileMenuOpen }: MobileNavProps) => {
  const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Favorites', href: '/favorites' },
    { name: 'Dashboard', href: '/dashboard' },
  ]

  const dispatch = useDispatch()

  const setMobileMenuOpen = () => {
    dispatch(toggleMobileMenu())
  }

  const handleLinkClick = () => {
    setTimeout(() => {
      setMobileMenuOpen()
    }, 3000) // 3 second delay
  }

  return (
    <div>
      <Dialog
        as="div"
        className="lg:hidden min-w-360px flex "
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <Dialog.Panel className="fixed inset-y-0  inset-0 right-0 z-10 w-screen overflow-y-auto bg-white sm:ring-1 sm:ring-gray-900/10">
          <div className="flex justify-between gap-x-6">
            {user ? (
              <Profile
                picture={user?.picture}
                given_name={user?.given_name}
              ></Profile>
            ) : (
              <></>
            )}

            <button
              type="button"
              className=" rounded-md mx-3 px-3 py-6 text-gray-700"
              onClick={() => setMobileMenuOpen()}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root sm:w-60">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    onClick={() => handleLinkClick()}
                    key={item?.name}
                    href={item?.href}
                    className="mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item?.name}
                  </Link>
                ))}
              </div>
              {user ? (
                <div className="py-6 px-6">
                  <LogoutLink className="text-md lg:font-semibold lg:leading-6 lg: text-gray-400  capitalize font-normal leading-6">
                    Logout
                  </LogoutLink>
                </div>
              ) : (
                <div className="py-6">
                  <LoginLink
                    postLoginRedirectURL="/home"
                    // href="login"
                    className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg: text-gray-300 text-xs capitalize font-normal leading-6"
                  >
                    Log in
                  </LoginLink>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}
export default MobileNav
