'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { useToast } from '@/components/ui/use-toast'
import { getAverageColor } from '../../../lib/colorFunctions'
import WeatherCardSkeleton from '../../components-new/UX-Components/WeatherCardSkeleton'
import useDebouncedCallback from '../../../lib/loadashHooks'

import { IRootStore } from '../../../store'

import {
  FavouriteRequestProps,
  UserWeatherCard,
  Weather,
  WeatherCardProps,
} from '../interfaces/WeatherCardInterfaces'
import { useFavorites } from '../../hooks/useFavorite'

const NewWeatherCard = ({
  initialImage,
  initialWeather,
  userWeatherCards,
  email,
}: WeatherCardProps) => {
  const { unfavorite, favorite } = useFavorites()

  const data = useSelector((state: IRootStore) => state.weather.weatherData)
  const selectorImage = useSelector(
    (state: IRootStore) => state.preferences.townImage
  )
  const { toast } = useToast()
  const [isDark, setIsDark] = useState(false)
  const [allWeatherCards, setAllWeatherCards] =
    useState<UserWeatherCard[]>(userWeatherCards)
  const townImage = selectorImage ? selectorImage : initialImage
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const [name, setName] = useState<string>(
    typeof initialWeather !== 'boolean' ? initialWeather.name : ''
  )
  const [weather, setWeather] = useState<Weather['weather']>(
    typeof initialWeather !== 'boolean' ? initialWeather.weather : data.weather
  )
  const [main, setMain] = useState<Weather['main']>(
    typeof initialWeather !== 'boolean' ? initialWeather.main : data.main
  )

  useEffect(() => {
    let isCardInDb = allWeatherCards.some((e) => e.cardName === name)
    console.log('ISCARDINDB', isCardInDb)
    setIsFavorite(isCardInDb)
  }, [name, allWeatherCards])

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setName(data.name)
      setWeather(data.weather)
      setMain(data.main)
    } else if (typeof initialWeather !== 'boolean') {
      setName(initialWeather.name)
      setWeather(initialWeather.weather)
      setMain(initialWeather.main)
    }
  }, [data, initialWeather])

  const weatherData = weather?.[0]

  const saveFavoriteToDB = async ({
    name,
    townImage,
    temp,
    main,
  }: FavouriteRequestProps) => {
    let isCardAlreadySaved = false
    allWeatherCards.forEach((e) => {
      if (e.cardName == name) {
        isCardAlreadySaved = true
      }
    })

    try {
      if (isCardAlreadySaved) {
        return
      } else {
        const response = await favorite({
          name,
          townImage,
          temp,
          main,
          email,
          weatherData,
        })
        // const response = await axios.post(
        //   '/api/favorites',

        //   {
        //     email: email,
        //     cardName: name,
        //     image: townImage,
        //     name: 'NAME',
        //     temp: String(temp),
        //     main: weatherData.main,
        //   }
        // )
        if (response) {
          setAllWeatherCards(response.data.res.cards)
        }
      }
    } catch (error) {
      console.error('Error saving favorite status:', error)
    }
  }

  const deleteFavoriteFromDb = async (name: string) => {
    let isCardAlreadySaved = false
    allWeatherCards.forEach((e) => {
      if (e.cardName == name) {
        isCardAlreadySaved = true
      }
    })

    if (isCardAlreadySaved) {
      try {
        const response = await unfavorite({ name: name, email: email })
        console.log('RESPONSEdeleteFavoriteFromDb ', response)
        if (response) {
          setAllWeatherCards(response.data.res.cards)
        }
        toast({
          variant: 'destructive',
          title: 'You have removed a card from your favorites',
        })

        if (!response) {
          throw new Error('Failed to save favorite status')
        }
      } catch (error) {
        console.error('Error saving favorite status:', error)
      }
    } else {
      return
    }
  }

  const debouncedSaveFavorite = useDebouncedCallback({
    callback: saveFavoriteToDB,
    delay: 1500,
  })

  const debouncedDeleteFavorite = useDebouncedCallback({
    callback: deleteFavoriteFromDb,
    delay: 1500,
  })

  const isMountingRef = useRef(false)

  useEffect(() => {
    isMountingRef.current = true
  }, [])

  useEffect(() => {
    if (isMountingRef.current) {
      isMountingRef.current = false
      return
    }

    if (isFavorite) {
      debouncedSaveFavorite({
        name: name,
        townImage: townImage,
        temp: main.temp,
        main: weatherData.main,
        allWeatherCards,
      })
    } else {
      debouncedDeleteFavorite(name)
    }
  }, [isFavorite, debouncedSaveFavorite, debouncedDeleteFavorite])

  useEffect(() => {
    const fetchColor = async () => {
      if (townImage) {
        const { isDark } = await getAverageColor(townImage)
        setIsDark(isDark)
      }
    }
    fetchColor()
  }, [townImage])

  const toggleFavorite = () => setIsFavorite(!isFavorite)

  if (!weather || !main) {
    return <WeatherCardSkeleton />
  }

  return (
    <div className="col-span-2">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Image
            src={townImage || 'gas.svg'}
            alt={name}
            width={500}
            height={300}
            className="w-full rounded-lg"
            style={{ aspectRatio: '500/300', objectFit: 'cover' }}
          />
          <div className="absolute top-4 left-4 bg-[#0f1a2a] text-white px-4 py-2 rounded-md font-semibold">
            Basic Info
          </div>
          <div className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 rounded-md font-semibold">
            {Math.round(main.temp / 10)}°C
          </div>
          <div
            className="absolute top-4 right-4 bg-white text-black p-2 rounded-full cursor-pointer"
            onClick={toggleFavorite}
          >
            {isFavorite ? (
              <StarIconSolid className="h-5 w-5" />
            ) : (
              <StarIcon className="h-5 w-5" />
            )}
          </div>
          <div className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-md font-semibold">
            {weatherData.main}
          </div>
          <div className="absolute bottom-16 right-4 bg-white text-black px-4 py-2 rounded-md font-semibold">
            {name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewWeatherCard
