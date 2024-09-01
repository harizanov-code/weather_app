import { configureStore } from '@reduxjs/toolkit'

import MobileNavSlice from './reducers/MobileNavSlice'
import WeatherSlice from './reducers/WeatherSlice'

import PreferencesSlice from './reducers/PreferencesSlice'
import { Weather } from '../app/home2/interfaces/WeatherCardInterfaces'

const store = configureStore({
  reducer: {
    mobileMenu: MobileNavSlice,
    weather: WeatherSlice,
    preferences: PreferencesSlice,
  },
})

export interface IRootStore {
  mobileMenu: {
    mobileMenuOpen: boolean
  }
  weather: {
    weatherData: Weather
  }
  preferences: {
    townImage: string
  }
}

export default store
