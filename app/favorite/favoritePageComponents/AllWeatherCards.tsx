'use client'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'

import { SingleWeatherCard } from './SingleWeatherCard'
import { UserWeatherCard } from '../../home2/interfaces/WeatherCardInterfaces'

type AllWeatherCardsProps = {
  weatherCards: UserWeatherCard[]
  user: KindeUser
}

const AllWeatherCards = ({ weatherCards, user }: AllWeatherCardsProps) => {
  return (
    <div className="grid my-8 grid-cols-1 xl:grid-cols-2 gap-4">
      {weatherCards.map((card) => {
        return (
          <div key={card.id} className="grid justify-center">
            <SingleWeatherCard
              weatherCard={card}
              email={user.email}
            ></SingleWeatherCard>
          </div>
        )
      })}
    </div>
  )
}
export default AllWeatherCards
