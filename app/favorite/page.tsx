import { redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Spinner } from '@chakra-ui/react'
import { UserWeatherCard } from '../home2/interfaces/WeatherCardInterfaces'
import AllWeatherCards from './favoritePageComponents/AllWeatherCards'

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
        <AllWeatherCards weatherCards={weatherCards} user={user} />
      ) : (
        <Spinner />
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
          cache: 'no-store', // This ensures we always get fresh data
        }
      )
      const data = await response.json()
      return data.req
    }
  } catch (error) {
    return error
  }
}