// reduxComponents/InitialWeatherLoader.js
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


import { setInitialWeather } from '../../../store/reducers/WeatherSlice'
import { Weather } from '../../home2/interfaces/WeatherCardInterfaces'

type InitialWeatherLoaderProps = {
  initialWeather: Weather | boolean
}

const InitialWeatherLoader = ({
  initialWeather,
}: InitialWeatherLoaderProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (initialWeather) {
      dispatch(setInitialWeather(initialWeather))
    }
  }, [dispatch, initialWeather])

  return null // This component doesn't render anything
}

export default InitialWeatherLoader
