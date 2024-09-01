// src/store/reducers/ui-slice.js
import { createSlice } from '@reduxjs/toolkit'

const WeatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: {},
  },
  reducers: {
    setInitialWeather(state, action) {
      state.weatherData = action.payload
    },
    setData(state, action) {
      state.weatherData = action.payload
    },
  },
})

export const { setData, setInitialWeather } = WeatherSlice.actions
export default WeatherSlice.reducer
