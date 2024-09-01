import Hero from '../../components/Hero'

import HomeLayout from '../components-new/HomeLayout'
import customFetch from '../../utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect, useRouter } from 'next/navigation'
import { Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { UserWeatherCard } from '../home2/interfaces/WeatherCardInterfaces'
export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()

  if (!isLoggedIn) {
    redirect('/api/auth/login')
  }

  const user = await getUser()

  const response = await getWeatherCards(user?.email)

  const weatherCards: UserWeatherCard[] = response.cards

  return (
    <div>
      {user && weatherCards ? (
        <HomeLayout user={user} userWeatherCards={weatherCards}></HomeLayout>
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  )
}

export async function getWeatherCards(email: string | null | undefined) {
  try {
    if (email) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/favorites?id=` + email,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          next: { tags: ['weatherCards'] }, // Custom tags
        }
      )
      console.log('INASYNCRESPONSE', response)
      const data = await response.json()
      return data.req // Extract the data from the response
    }
  } catch (error) {
    return error
  }
}
