'use client'

import _ from 'lodash'
import Dropdown from './Dropdown'
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { items } from '../../lib/towns'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../store'
import { Skeleton } from '@/components/ui/skeleton'
import { Weather } from '../home2/interfaces/WeatherCardInterfaces'

interface OptionType {
  label: string
  value: string
}
type SearchProps = {
  user: KindeUser
  initialWeather: boolean | Weather
}

const Search = ({ initialWeather, user }: SearchProps) => {
  const weatherData = useSelector(
    (state: IRootStore) => state.weather.weatherData
  )

  const [options, setOptions] = useState<OptionType[]>(items)

  const [text, setText] = useState<string>(weatherData.name)

  const onTextChange = (text: string) => {
    const newOptions = _.filter(items, (item) => item.label.includes(text))
    setOptions(newOptions)
  }

  useEffect(() => {
    setText(weatherData.name)
  }, [weatherData])

  const onChange = (value: string) => {
    setText(value)
  }

  return (
    <div className="flex justify-center bg-slate-100 rounded-md">
      {weatherData ? (
        <Dropdown
          user={user}
          name={'search'}
          options={options}
          value={text}
          onChange={onChange}
          onTextChange={onTextChange}
        />
      ) : (
        <Dropdown
          user={user}
          name={'search'}
          options={options}
          value={typeof initialWeather !== 'boolean' ? initialWeather.name : ''}
          onChange={onChange}
          onTextChange={onTextChange}
        />
      )}
    </div>
  )
}

export default Search

// const [formData, setFormData] = useState<FormData>({
//   searchInput: '',
// })

// const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
//   const { name, value } = event.target
//   setFormData((prevData) => ({
//     ...prevData,
//     [name]: value,
//   }))
// }

// const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {

//   event.preventDefault()
//   // Handle form submission logic here
// }
