'use client'
import { Bars3Icon } from '@heroicons/react/16/solid'
import { useDispatch } from 'react-redux'
import MobileNav from './MobileNav'
import { toggleMobileMenu } from '../../store/reducers/MobileNavSlice'

const MobileNavButton = ({ onClick }: any) => {
  return (
    <div className="flex mx-2 lg:hidden">
      <button
        type="button"
        className=" inline-flex items-center justify-center rounded-md  text-gray-700"
        onClick={onClick}
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  )
}
export default MobileNavButton
