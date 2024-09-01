import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'

export type FavouriteRequestProps = {
    name: string
    townImage: string
    temp: string
    main: MainProp
  }

  export type MainProp = {
    temp: number
    grnd_level: string
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  export type WeatherCardProps = {
    initialImage?: string | undefined 
    initialWeather: boolean | Weather
    email: string | null
    userWeatherCards: UserWeatherCard[]
  }
  

  export interface Weather {
    base: string
    clouds: {
      all: number
    }
    cod: number
    coord: {
      lon: number
      lat: number
    }
    dt: number
    id: number
    main: {
      temp: number
      grnd_level: string
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
    }
    name: string
    sys: {
      type: number
      id: number
      country: string
      sunrise: number
      sunset: number
    }
    timezone: number
    visibility: number
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
    wind: {
      speed: number
      deg: number
    }
  }
  
  export type OptionType = {
    label: string
    value: string
  }
  
  export type weatherData = {
    data: Weather
  }
  
  export type DropdownProps = {
    user: KindeUser
    name: string
    options: OptionType[]
    value: string
    onChange: (value: string) => void
    onTextChange: (text: string) => void
  }
  

  export interface UserWeatherCard {
    id: number
    cardName: string
    image: string
    name: string
    temp: string
    main: string
    userId: number
  }
  