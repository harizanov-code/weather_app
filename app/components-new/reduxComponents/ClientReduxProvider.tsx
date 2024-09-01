// src/components/ClientReduxProvider.js
'use client'

import React from 'react'
import { Provider } from 'react-redux'
import store from '../../../store'

import InitialWeatherLoader from './initialWeatherLoader'
import { Weather } from '../../home2/interfaces/WeatherCardInterfaces'

type ClientReduxProviderProps = {
  children: any
  initialWeather?: Weather | boolean
}

const ClientReduxProvider = ({
  children,
  initialWeather,
}: ClientReduxProviderProps) => {
  return (
    <Provider store={store}>
      {initialWeather && (
        <InitialWeatherLoader initialWeather={initialWeather} />
      )}
      {children}
    </Provider>
  )
}

export default ClientReduxProvider
