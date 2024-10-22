'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import useDebouncedCallback from '../../../lib/loadashHooks'
import WeatherCardSkeleton from '../../components-new/UX-Components/WeatherCardSkeleton'
import { Spinner } from '@chakra-ui/react'
import { getAverageColor } from '../../../lib/colorFunctions'
import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { UserWeatherCard } from '../../home2/interfaces/WeatherCardInterfaces'
import { useRefreshData } from '../FavoriteClientWrapper'
import { useFavorites } from '../../hooks/useFavorite'

type WeatherCardProps = {
  weatherCard: UserWeatherCard
  email: string | null
}

export const SingleWeatherCard = ({
  weatherCard,

  email,
}: WeatherCardProps) => {

  const { toast } = useToast()
  const [isFavorite, setIsFavorite] = useState<boolean>(true)
  const refreshData = useRefreshData()
  const { unfavorite } = useFavorites()

  const [isDark, setIsDark] = useState(false)
  const [weather, setWeather] = useState<UserWeatherCard>(weatherCard)

  // const deleteFavoriteFromDb = async (name: string) => {
  //   try {
  //     await axios.delete('/api/favorites', {
  //       params: { name: name, email: email },
  //     })

  //     toast({
  //       variant: 'destructive',
  //       title: 'You have removed a card from your favorites',
  //     })

  //     await refreshData()
  //   } catch (error) {
  //     console.error('Error saving favorite status:', error)
  //   }
  // }

  const handleUnfavorite = async () => {
    setIsFavorite(false)
    await unfavorite({name: weatherCard.cardName,email: email})
  }


//   const { toast } = useToast()

//   const [isFavorite, setIsFavorite] = useState<boolean>(true)


//  console.log("weather", weather)

//   const deleteFavoriteToDb = async (name: string) => {
//     try {
//       const response = await axios.delete('/api/favorites', {
//         params: { name: name, email: email },
//       })

//       toast({
//         variant: 'destructive',
//         title: 'You have removed a card from your favorites',
//       })

//       if (!response) {
//         throw new Error('Failed to save favorite status')
//       }
//     } catch (error) {
//       console.error('Error saving favorite status:', error)
//     }
//   }

 
  // const debounceDeleteFavorite = useDebouncedCallback({
  //   callback: deleteFavoriteToDb,
  //   delay: 2500,
  // })

  // const isMountingRef = useRef(false)

  // useEffect(() => {
  //   isMountingRef.current = true
  // }, [])

  //   useEffect(() => {
  //     if (isMountingRef.current) {
  //       isMountingRef.current = false // Set isFirstRender to false after the initial render
  //       return // Skip debouncing on initial render
  //     }

  //     if (isFavorite) {
       
  //     } else {
  //       debounceDeleteFavorite(weather.cardName)
  //     }
  //   }, [isFavorite, debounceDeleteFavorite])

  // Function to check if an object is empty
  function isEmpty(obj: any) {
    return obj && Object.keys(obj).length === 0
  }

  useEffect(() => {
    const fetchColor = async () => {
      if (weather.image) {
        const { isLight, isDark } = await getAverageColor(weather.image)

        if (isLight) {
          setIsDark(false)
        } else {
          setIsDark(true)
        }
      }
    }

    fetchColor()
  }, [weather])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="col-span-2">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative">
            <Image
              src={weather.image || ''}
              alt={weather.cardName}
              width={500}
              height={300}
              className="w-full rounded-lg"
              style={{ aspectRatio: '500/300', objectFit: 'cover' }}
            />
            <div className="absolute top-4 left-4 bg-[#0f1a2a] text-white px-4 py-2 rounded-md font-semibold">
              Basic Info
            </div>
            <div className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 rounded-md font-semibold">
              {Math.round(Number(weather.temp) / 10)}°C
            </div>
            <div
              className="absolute top-4 right-4 bg-white text-black p-2 rounded-full cursor-pointer"
              onClick={handleUnfavorite}
            >
              {isFavorite ? (
                <StarIconSolid className="h-5 w-5" />
              ) : (
                <StarIcon className="h-5 w-5" />
              )}
            </div>
            <div className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-md font-semibold">
              {weather.main}
            </div>
            <div className="absolute bottom-16 right-4 bg-white text-black px-4 py-2 rounded-md font-semibold">
              {weather.cardName}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
