'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'
import {
  HomeIcon,
  InformationCircleIcon as InfoIcon,
  StarIcon,
  RectangleGroupIcon as LayoutDashboardIcon,
} from '@heroicons/react/24/outline'

type IconKey = 'home' | 'info' | 'star' | 'dashboard'

export interface NavLinkItem {
  href: string
  icon: IconKey // Use the union type here
  text: string
  spaceX: number
}

// Icon mapper
const iconMapper: Record<
  IconKey,
  ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined
      titleId?: string | undefined
    } & RefAttributes<SVGSVGElement>
  >
> = {
  home: HomeIcon,
  info: InfoIcon,
  star: StarIcon,
  dashboard: LayoutDashboardIcon,
}

const NavLink = ({ href, icon, text, spaceX }: NavLinkItem) => {
  const pathname = usePathname()
  const IconComponent = iconMapper[icon]
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center h-full space-x-${spaceX} ${
        isActive
          ? 'text-[#00dc72] border-b-2  rounded-b-[2px] border-b-[#00dc72] '
          : 'hover:text-[#00dc72] '
      } `}
      prefetch={false}
    >
      <IconComponent className="h-5 w-5 pr-2" />
      <span>{text}</span>
    </Link>
  )
}

export default NavLink
