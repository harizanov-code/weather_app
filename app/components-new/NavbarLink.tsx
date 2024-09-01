// Import necessary modules

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { HomeIcon, StarIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { BeakerIcon } from '@heroicons/react/24/outline'
// Define props for NavbarLink component
type NavbarLinkProps = {
  route: string

  name: string
  className?: string // Add className prop
}

const iconMapping: Record<string, React.ElementType> = {
  home: HomeIcon,
  about: BeakerIcon,
  favorite: StarIcon,
  dashboard: UserCircleIcon,
}
// Define NavbarLink component
const NavbarLink = ({
  route,

  name,
  className,
}: NavbarLinkProps) => { 
  const pathname = usePathname()

  const isActive = pathname === `/${route}`
  const Icon = iconMapping[route.toLowerCase()]
  return (
    <div
      className={`flex justify-center hover:text-dark-nav text-light-blue  hover:bg-light-blue w-32   ${
        isActive
          ? 'border-b-4   skew-y-12 rounded-b-[-20px] border-b-light-blue '
          : ''
      } rounded-md`}
    >
      <Link
        href={`/${route}`}
        className={`flex lg:flex-row lg:gap-2 sm:flex-col justify-center items-center   ${className}`}
      >
        <Icon className="flex w-6 h-6" />
        {/* Render the name */}
        <span className="flex text-sm lg:text-md capitalize font-normal leading-6">
          {name}
        </span>
      </Link>
    </div>
  )
}

export default NavbarLink
