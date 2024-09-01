import { redirect } from 'next/navigation'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import AllWeatherCards from './favoritePageComponents/AllWeatherCards'
import { getUser as getUserPreferences } from '../components-new/HomeLayout'
import { Spinner } from '@chakra-ui/react'
import { UserWeatherCard } from '../home2/interfaces/WeatherCardInterfaces'
export default async function Favorite() {
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
        <AllWeatherCards
          weatherCards={weatherCards}
          user={user}
        ></AllWeatherCards>
      ) : (
        <>
          <Spinner></Spinner>
        </>
      )}
    </div>
  )
}

async function getWeatherCards(email: string | null | undefined) {
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
      const data = await response.json()
      return data.req // Extract the data from the response
    }
  } catch (error) {
    return error
  }
}
