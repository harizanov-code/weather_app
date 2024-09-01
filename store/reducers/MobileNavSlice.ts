// src/store/reducers/ui-slice.js
import { createSlice } from '@reduxjs/toolkit'

const MobileNavSlice = createSlice({
  name: 'mobile',
  initialState: {
    mobileMenuOpen: false,
  },
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
  },
})

export const { toggleMobileMenu } = MobileNavSlice.actions
export default MobileNavSlice.reducer
