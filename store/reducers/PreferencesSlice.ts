// src/store/reducers/ui-slice.js
import { createSlice } from '@reduxjs/toolkit'

const PreferenceSlice = createSlice({
  name: 'preference',
  initialState: {
    townImage: '',
  },
  reducers: {
    setImage(state, action) {
      state.townImage = action.payload
    },
  },
})

export const { setImage } = PreferenceSlice.actions
export default PreferenceSlice.reducer
