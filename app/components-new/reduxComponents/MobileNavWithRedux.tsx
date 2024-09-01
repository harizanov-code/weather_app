// src/components/MobileNavWithRedux.js
'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../../store'
import MobileNav from '../MobileNav'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'

type MobileNavProps = {
  user: KindeUser
}
const MobileNavWithRedux = ({ user }: MobileNavProps) => {
  const mobileMenuOpen = useSelector((state: IRootStore) =>
    state.mobileMenu.mobileMenuOpen ? state.mobileMenu.mobileMenuOpen : false
  )

  return mobileMenuOpen ? (
    <MobileNav user={user} mobileMenuOpen={mobileMenuOpen} />
  ) : null
}

export default MobileNavWithRedux
