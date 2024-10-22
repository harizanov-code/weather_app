import { useState } from 'react'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { FavouriteRequestProps } from '../home2/interfaces/WeatherCardInterfaces'
type UnfavoriteProps = {
  name: string
  email: string | null
}

interface FavoriteProps extends FavouriteRequestProps {
  email: string | null
  weatherData: any
}

export function useFavorites() {
  const { toast } = useToast()
  const router = useRouter()

  const unfavorite = async ({ name, email }: UnfavoriteProps) => {
    try {
      const response = await axios.delete('/api/favorites', {
        params: { name, email },
      })

      toast({
        variant: 'destructive',
        title: 'You have removed a card from your favorites',
      })

      // Revalidate the '/favorite' route
      router.refresh()
      return response
    } catch (error) {
      console.error('Error removing favorite:', error)
      toast({
        variant: 'destructive',
        title: 'Failed to remove favorite',
        description: 'Please try again later.',
      })
    }
  }
  const favorite = async ({
    name,
    townImage,
    temp,
    main,
    email,
    weatherData,
  }: FavoriteProps) => {
    try {
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

      toast({
        title: 'You have favorited a card',
        description: 'Navigate the favorite page to see it in details',
      })

      // Revalidate the '/favorite' route
      router.refresh()
      return response
    } catch (error) {
      console.error('Error removing favorite:', error)
      toast({
        variant: 'destructive',
        title: 'Failed to remove favorite',
        description: 'Please try again later.',
      })
    }
  }

  return { unfavorite , favorite}
}
