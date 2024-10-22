'use client'
import { useToast } from '@/components/ui/use-toast'

import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../store'
import WeatherCardSkeleton from './UX-Components/WeatherCardSkeleton'
import { Button, Spinner } from '@chakra-ui/react'
import { usePathname, useSearchParams } from 'next/navigation'
import useDebouncedCallback from '../../lib/loadashHooks'
import axios from 'axios'

import { getAverageColor } from '../../lib/colorFunctions'
import { UserWeatherCard, Weather } from '../home2/interfaces/WeatherCardInterfaces'

type WeatherCardProps = { 
  initialImage?: string | undefined
  initialWeather: boolean | Weather
  email: string | null
  userWeatherCards: UserWeatherCard[]
}
type WeatherProp = {
  id: number
  main: string
  description: string
  icon: string
}[]

type MainProp = {
  temp: number
  grnd_level: string
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}
const WeatherCard = ({
  initialImage,
  initialWeather,
  userWeatherCards,
  email,
}: WeatherCardProps) => {
  const data = useSelector((state: IRootStore) => state.weather.weatherData)
  const selectorImage = useSelector(
    (state: IRootStore) => state.preferences.townImage
  )

  const { toast } = useToast()
  const [isDark, setIsDark] = useState(false)
  const [allWeatherCards, setAllWeatherCards] =
    useState<UserWeatherCard[]>(userWeatherCards)
  const townImage = selectorImage ? selectorImage : initialImage
  const [isCardAvailable, setIsCardAvailable] = useState<boolean>(false)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  // Destructuring data if it exists

  const [name, setName] = useState<string>(
    typeof initialWeather !== 'boolean' ? initialWeather.name : ''
  )
  const [weather, setWeather] = useState<WeatherProp>(
    typeof initialWeather !== 'boolean' ? initialWeather.weather : data.weather
  )
  const [main, setMain] = useState<MainProp>(
    typeof initialWeather !== 'boolean' ? initialWeather.main : data.main
  )

  useEffect(() => {
    let isCardInDb = false
    allWeatherCards.forEach((e) => {
      //
      //
      //
      if (e.cardName == name) {
        //
        //
        isCardInDb = true
        setIsFavorite(true)
      }
    })
    if (!isCardInDb) {
      setIsFavorite(false)
    }
  }, [name])

  useEffect(() => {
  
    if (Object.keys(data).length > 0) {
      setName(data.name)
      setWeather(data.weather)
      setMain(data.main)
    } else {
      if (typeof initialWeather !== 'boolean') {
        setName(initialWeather.name)
        setWeather(initialWeather.weather)
        setMain(initialWeather.main)
      }
    }
  }, [data])

  const weatherData = weather?.[0]


  type FavouriteRequestProps = {
    name: string
    townImage: string
    temp: string
    main: MainProp
  }
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
        const response = await axios.post(
          '/api/favorites',

          {
            email: email,
            cardName: name,
            image: townImage,
            name: 'NAME',
            temp: String(temp),
            main: weatherData.main,
          }
        )

        setAllWeatherCards(response.data.res.cards)

        toast({
          title: 'You have favorited a card',
          description: 'Navigate the favorite page to see it in details',
        })
      }
    } catch (error) {
      console.error('Error saving favorite status:', error)
    }
  }
  const deleteFavoriteToDb = async (name: string) => {
    let isCardAlreadySaved = false
    allWeatherCards.forEach((e) => {
      if (e.cardName == name) {
        isCardAlreadySaved = true
      }
    })

    if (isCardAlreadySaved) {
      try {
        const response = await axios.delete('/api/favorites', {
          params: { name: name, email: email },
        })

        setAllWeatherCards(response.data.res.cards)
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
    delay: 2500,
  })
  const debounceDeleteFavorite = useDebouncedCallback({
    callback: deleteFavoriteToDb,
    delay: 2500,
  })

  const isMountingRef = useRef(false)

  useEffect(() => {
    isMountingRef.current = true
  }, [])

  useEffect(() => {
    if (isMountingRef.current) {
      isMountingRef.current = false // Set isFirstRender to false after the initial render
      return // Skip debouncing on initial render
    }

    if (isFavorite) {
      debouncedSaveFavorite({
        name: name,
        townImage: townImage,
        temp: main.temp,
        main: weatherData.main,
      })
    } else {
      debounceDeleteFavorite(name)
    }
  }, [isFavorite, debouncedSaveFavorite, debounceDeleteFavorite])

  // Function to check if an object is empty
  function isEmpty(obj: any) {
    return obj && Object.keys(obj).length === 0
  }

  useEffect(() => {
    const fetchColor = async () => {
      if (townImage) {
        const { isLight, isDark } = await getAverageColor(townImage)

        if (isLight) {
          setIsDark(false)
        } else {
          setIsDark(true)
        }
      }
    }

    fetchColor()
  }, [townImage])

  // Render conditionally based on whether data is available
  return (
    <div className="relative bg-slate-50 min-h-[400px] sm:w-[550px] max-w-[600px] max-h-[700px] w-full sm:h-[500px] h-full mx-4 sm:mx-0 rounded-xl shadow-md">
      {isEmpty(data) ? (
        <WeatherCardSkeleton />
      ) : (
        <>
          {townImage ? (
            <Image
              src={townImage}
              alt="sofia"
              quality={100}
              fill
              priority={true}
              className="object-cover rounded-xl shadow-md bg-slate-700"
            />
          ) : (
            <>
              {initialImage ? (
                <Image
                  src={initialImage}
                  alt="sofia"
                  quality={100}
                  fill
                  priority={true}
                  className="object-cover rounded-xl shadow-md bg-slate-700"
                />
              ) : (
                <>
                  <Spinner></Spinner>
                </>
              )}
            </>
          )}
          <div className="flex flex-col">
            <div className="flex flex-row rounded-t-sm w-full  mb-5 pt-4  justify-between border-b-4 border-b-white">
              <div className="flex justify-center  align-middle grow pl-[46px]">
                <h1
                  className={`rotate-[360deg] px-1  rounded-md text-xl capitalize  font-bold text-center ${
                    isDark ? 'text-white  bg-black' : 'text-black  bg-white'
                  }  text-center`}
                >
                  Basic Info
                </h1>
              </div>

              {!isFavorite ? (
                <div
                  className=" flex  justify-end pr-4"
                  onClick={() => {
                    setIsFavorite(!isFavorite)
                  }}
                >
                  <StarIcon
                    width={'30px'}
                    color={`${isDark ? 'white ' : 'black'}`}
                    height={'30px'}
                    className={`${
                      isDark
                        ? 'bg-black rounded-md z-0'
                        : 'bg-white rounded-md z-0'
                    }`}
                  />
                </div>
              ) : (
                <div
                  className=" flex justify-end pr-4"
                  onClick={() => {
                    setIsFavorite(!isFavorite)
                  }}
                >
                  <StarIconSolid
                    width={'30px'}
                    color={`${isDark ? 'white' : 'black'}`}
                    height={'30px'}
                    className={`${
                      isDark
                        ? 'bg-black rounded-md z-0'
                        : 'bg-white rounded-md z-0'
                    }`}
                  />
                </div>
              )}
            </div>
            <div className="flex  rounded-t-sm pt-6 items-center justify-center">
              <h1
                className={`rotate-[360deg] flex font-bold text-5xl p-2   rounded-md ${
                  isDark ? 'text-white  bg-black' : 'text-black  bg-white'
                }  text-center`}
              >
                {name}
              </h1>
            </div>

            <div className="flex flex-row   justify-between pt-28 mx-4">
              <div className="flex items-center justify-center">
                {' '}
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData?.icon}@2x.png`}
                  alt=""
                  className={`rotate-[360deg] w-16 h-16 px-1 flex  rounded-md ${
                    isDark ? 'text-white  bg-black' : 'text-black  bg-white'
                  }  capitalize  font-bold`}
                >
               
                </img>
              </div>

              <div className="flex items-center justify-center">
                
         
                <p
                  className={`rotate-[269deg] px-2 rounded-md ${
                    isDark ? 'text-white bg-black' : 'text-black bg-white'
                  } capitalize font-bold`}
                >
                  {weatherData?.main}
                </p>
              </div>
            </div>

            <div className='flex mt-6 justify-center items-center'>
<h1 className={`rotate-0 px-2 rounded-md ${
                    isDark ? 'text-white bg-black' : 'text-black bg-white'
                  } capitalize text-3xl font-bold`}>    {Math.round(main?.temp /10) + "°C"} </h1>

            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default WeatherCard
function setIsDark(arg0: any) {
  throw new Error('Function not implemented.')
}
