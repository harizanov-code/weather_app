'use client'
import Image from 'next/image'
import { Fragment } from 'react'
import {
  Disclosure,
  Menu,
  Transition,
  MenuItems,
  MenuItem,
  MenuButton,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type ProfileProps = {
  picture?: string | null
  given_name?: string | null | undefined
}

const Profile = ({ picture, given_name }: ProfileProps) => {
  return (
    <div className="flex items-center   px-6 sm:px-0 sm:ml-6 ">
      <div className="flex items-center justify-center">
        {/* <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button> */}

        {/* Profile dropdown */}
        <Menu as="div" className="relative ">
          <div className='-inset-1.5 rounded-full p-[6px] hover:bg-[#00dc72] bg-[white]'>
            <MenuButton className="relative flex rounded-full   text-sm lg:text-md ">
              
              <span className="sr-only">Open user menu</span>
              <Image
                src={picture ? picture : '/vercel.svg'}
                alt=""
                width={42}
                height={42}
                className="h-12 w-12 rounded-full z-10"
              ></Image>
            </MenuButton>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    Your Profile
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    Settings
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <>
                    <LogoutLink
                      postLogoutRedirectURL="/home2"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Sign out
                    </LogoutLink>
                  </>
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}
export default Profile
