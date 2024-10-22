'use client'

import { useState, createContext, useContext } from 'react'
import { UserWeatherCard } from '../home2/interfaces/WeatherCardInterfaces'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import AllWeatherCards from './favoritePageComponents/AllWeatherCards'
import { Spinner } from '@chakra-ui/react'

interface FavoriteClientWrapperProps {
  initialWeatherCards: UserWeatherCard[]
  user: KindeUser
}

export const RefreshDataContext = createContext<() => Promise<void>>(() => Promise.resolve())

export const useRefreshData = () => useContext(RefreshDataContext)

export default function FavoriteClientWrapper({
  initialWeatherCards,
  user,
}: FavoriteClientWrapperProps) {
  const [weatherCards, setWeatherCards] = useState(initialWeatherCards)

  const refreshData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/favorites?id=${user.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    setWeatherCards(data.req.cards)
  }

  return (
    <RefreshDataContext.Provider value={refreshData}>
      <div>
        {user && weatherCards ? (
          <AllWeatherCards
            weatherCards={weatherCards}
            user={user}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </RefreshDataContext.Provider>
  )
}