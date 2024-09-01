'use client'
import React from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../store'
import WeatherCardSkeleton from './UX-Components/WeatherCardSkeleton'
import WeatherInfoBox from './WeatherInfoBox'

const WeatherCard = () => {
  const data = useSelector((state: IRootStore) => state.weather.weatherData)

  // Destructuring data if it exists
  const { name, weather, main,wind } = data || {}
  const weatherData = weather?.[0]

  // Function to check if an object is empty
  function isEmpty(obj: any) {
    return obj && Object.keys(obj).length === 0
  }

  // Render conditionally based on whether data is available
  return (
    <div className="flex   flex-col  bg-gray-100 min-h-[400px] sm:w-[550px] max-w-[600px] max-h-[700px] w-full sm:h-[500px] h-full mx-4 sm:mx-0 rounded-xl shadow-lg shadow-gray-200">
      {isEmpty(data) ? (
        <WeatherCardSkeleton />
      ) : (
        <>
          <div className="flex flex-col rounded-t-sm pt-6  h-10 justify-center border-b-2 border-b-gray-200 pb-6">
            <h1 className="rotate-[360deg] text-xl capitalize  font-bold text-center">
              Details
            </h1>
          </div>
          <div className="flex justify-center justify-items-center max-h-[448px] h-full">
            <div className="grid h-full grid-cols-2 gap-4 w-full p-4 ">
              <WeatherInfoBox detail={main.humidity + " %"} kind="humidity"></WeatherInfoBox>

              <WeatherInfoBox detail={wind.speed + " m/s"} kind="wind"></WeatherInfoBox>
              <WeatherInfoBox detail={main.grnd_level + " m" + " / " + main.pressure + " hPa"} kind="Altitude  / Pressure" colSpan ="col-span-2"></WeatherInfoBox>
          
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default WeatherCard
