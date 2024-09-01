import WeatherCard from './WeatherCard'
import WeatherDetailsCard from './WeatherDetailsCard'
import Search from './SearchComponent'

import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import Image from 'next/image'
import ClientReduxProvider from './reduxComponents/ClientReduxProvider'
import axiosInstance from '../../axios/axios'
import axios from 'axios'
import customFetch from '../../utils'
import { fill } from 'lodash'
import { Box, HStack, VStack } from '@chakra-ui/react'
import { UserWeatherCard, Weather, weatherData } from '../home2/interfaces/WeatherCardInterfaces'


type HomeLayoutProps = {
  user: KindeUser
  userWeatherCards: UserWeatherCard[]
}
async function HomeLayout({ user, userWeatherCards }: HomeLayoutProps) {
  const userData = await getUser(user) 

  const initialWeather = await getInitialWeatherData(
    userData?.townName ? userData.townName : 'Sofia'
  )

  //grid xl:grid-flow-row grid-flow-col gap-x-24 gap-y-16

  return ( 
    <div className="flex mt-10 justify-center items-center w-full h-screen md:h-full ">
      <ClientReduxProvider initialWeather={initialWeather}>
        <VStack spacing={4} className="w-full h-full">
          <div className="col-span-2 flex justify-center w-full">
            <div className="bg-slate-200 rounded-md shadow-sm p-4 max-w-[300px]">
              <Search initialWeather={initialWeather} user={user} />
            </div>
          </div>
          <div className="flex sm:hidden min-w-[320px] min-h-[400px] max-h-[700px] max-w-[600px] w-full">
            <WeatherCard
              email={user.email}
              initialWeather={initialWeather}
              initialImage={userData?.townImage}
              userWeatherCards={userWeatherCards}
            />
          </div>
          <div className="flex sm:hidden pb-10 md:pb-0 w-full">
            <WeatherDetailsCard />
          </div>

          <div className="hidden sm:flex w-full h-full">
            <Box className="flex w-full h-full">
              <HStack gap={4} justify="center" className="w-full h-full">
                <div className="flex md:justify-end md:flex-auto h-full min-w-[320px] min-h-[400px] max-h-[700px] max-w-[600px] w-full">
                  <WeatherCard
                    email={user.email}
                    initialWeather={initialWeather}
                    initialImage={userData?.townImage}
                    userWeatherCards={userWeatherCards}
                  />
                </div>
                <div className="flex md:justify-start md:flex-auto h-full min-w-[320px] max-h-[700px] max-w-[600px] w-full">
                  <WeatherDetailsCard />
                </div>
              </HStack>
            </Box>
          </div>
        </VStack>
      </ClientReduxProvider>
    </div>
  )
}
export default HomeLayout

 export async function getInitialWeatherData(
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
