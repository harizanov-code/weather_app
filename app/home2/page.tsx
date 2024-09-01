import PageLayout, { UserWeatherCard } from './components/PageLayout'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { Spinner } from '@chakra-ui/react'
import { getWeatherCards } from '../home/page'

export default async function Component() {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()

  if (!isLoggedIn) {
    redirect('/api/auth/login')
  }

  const user = await getUser()

  console.log('INRESPONSEUSER', user)
  const response = await getWeatherCards(user?.email)
  console.log('INRESPONSE', response)
  const weatherCards: UserWeatherCard[] = response.cards

  return (
    <div className="min-h-screen bg-gray-100">
      <div>
        {user && weatherCards ? (
          <PageLayout user={user} userWeatherCards={weatherCards}></PageLayout>
        ) : (
          <Spinner></Spinner>
        )}
      </div>
    </div>
  )
}
