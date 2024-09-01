import React from 'react'
import Link from 'next/link'

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from '../../../src/components/ui/sheet'

import { Button } from '../../../src/components/ui/button'
import {
  HomeIcon,
  InformationCircleIcon as InfoIcon,
  StarIcon,
  RectangleGroupIcon as LayoutDashboardIcon,
} from '@heroicons/react/24/outline'
import { MenuIcon } from './Icons'
import NavMenu from './NavMenu'
import WeatherProLogo from './WeatherProLogo'
import Home from '../../page'
import { NavLinkItem } from './NavLink'

const links: NavLinkItem[] = [
  { href: '/home2', icon: 'home', text: 'Home', spaceX: 1 },
  { href: '/about', icon: 'info', text: 'About', spaceX: 1 },
  { href: '/favorite', icon: 'star', text: 'Favorite', spaceX: 1 },
  {
    href: '/dashboard',
    icon: 'dashboard',
    text: 'Dashboard',
    spaceX: 1,
  },
]

const DesktopNav = () => (
  <NavMenu layout="h-[60px] hidden md:flex space-x-6" spacing="" links={links} />
)

const MobileNav = () => (
  <NavMenu
    layout="grid"
    spacing="gap-4 p-4"
    links={links.map((link) => ({ ...link, spaceX: 2 }))}
  />
)

const Header = async () => {
  return (
    <>
      <header className="bg-[#0f1a2a] text-white">
        <div className="container mx-auto flex items-center justify-between ">
          <div className="flex items-center space-x-4 justify-between w-full">
            <Link href="#" prefetch={false}>
              <WeatherProLogo />
            </Link>
            <div className={'md:hidden'}>
              <Sheet>
                <SheetTitle></SheetTitle>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="hover:text-[#00dc72]">
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-64 bg-[#0f1a2a] text-white"
                >
                  <MobileNav />
                </SheetContent>
              </Sheet>
            </div>

            <DesktopNav />
          </div>
        </div>
      </header>
    </>
  )
}
export default Header
