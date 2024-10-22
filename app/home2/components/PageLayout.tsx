import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import Image from 'next/image'

import { fill } from 'lodash'
import { Box, HStack, VStack } from '@chakra-ui/react'
import ClientReduxProvider from '../../components-new/reduxComponents/ClientReduxProvider'
import Search from '../../components-new/SearchComponent'
import NewWeatherCard from './NewWeatherCard'

import axiosInstance from '../../../axios/axios'
import customFetch from '../../../utils'
import NewDetailsComponent from './NewDetailsComponent'
import WeatherForecastCompartment from './WeatherForecastCompartment'
import { Weather, weatherData } from '../interfaces/WeatherCardInterfaces'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'

export interface UserWeatherCard {
  id: number
  cardName: string
  image: string
  name: string
  temp: string
  main: string
  userId: number
}

type HomeLayoutProps = {
  user: KindeUser
  userWeatherCards: UserWeatherCard[]
}
async function PageLayout({ user, userWeatherCards }: HomeLayoutProps) {
  const userData = await getUser(user)
  let isLoading = true
  let initialWeather: Weather | boolean = false
  try {
    initialWeather = await getInitialWeatherData(
      userData?.townName ? userData.townName : 'Sofia'
    )
  } catch (error) {
    console.error('Error fetching weather data:', error)
  } finally {
    isLoading = false
  }
  let forecastData
  // try {
  //   forecastData = await axios.get(
  //     `api.openweathermap.org/data/2.5/forecast/daily?q=${
  //       userData?.townName
  //     }&cnt=${'7'}&appid=${process.env.WEATHER_API_SERVER_SIDE}`
  //   )
  //   // forecastData = await axios.get(
  //   //   `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userData?.townName}/last7days/next5days?unitGroup=metric&key=${process.env.VISUAL_CROSSING_API_KEY} `
  //   // )`

  //   console.log('forecastData', forecastData)
  // } catch (error) {
  //   console.error('Error fetching Forecast data:', error)
  // }

  console.log('InitialTown', userData?.townName)
  //grid xl:grid-flow-row grid-flow-col gap-x-24 gap-y-16

  return (
    <main className="container mx-auto p-4">
      <ClientReduxProvider initialWeather={initialWeather}>
        <div className="flex flex-col mb-5 max-w-[217px]">
          <h2 className="text-2xl font-semibold mb-4">Search your town</h2>
          {isLoading ? (
            <Skeleton className={'w-[217px] h-16'} />
          ) : (
            <Search initialWeather={initialWeather} user={user} />
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <NewWeatherCard
            email={user.email}
            initialWeather={initialWeather}
            initialImage={userData?.townImage}
            userWeatherCards={userWeatherCards}
          />
          <NewDetailsComponent />
        </div>

        <div className="mt-8"></div>
        <WeatherForecastCompartment />
      </ClientReduxProvider>
    </main>
  )
}
export default PageLayout

async function getInitialWeatherData(
  townName: string
): Promise<Weather | boolean> {
  try {
    const { data: initialWeather }: weatherData = await customFetch.get(
      `?q=${townName}&appid=${'c71908ba9ec78182aa40386062f39572'}`
    )

    return initialWeather
  } catch (error) {
    return false
  }
}

type getUserProps = {
  townImage: string
  townName: string
}
export async function getUser(user: KindeUser): Promise<getUserProps | null> {
  try {
    const { data } = await axiosInstance.get('/api/preferences', {
      params: {
        email: user.email,
      },
    })

    const { townName, townImage } = data
    return { townName, townImage }
  } catch (error) {
    return null
  }
}
