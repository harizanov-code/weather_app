import { forwardRef, useState, useRef, useEffect, KeyboardEvent } from 'react'
import _ from 'lodash'
import {
  Input,
  Box,
  Popover, 
  PopoverTrigger,
  PopoverContent,
  Text,
  useColorMode,
  useOutsideClick,
} from '@chakra-ui/react'
import customFetch, { fetchImagesFromUnsplash } from '../../utils'
import axiosInstance from '../../axios/axios'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { useDispatch } from 'react-redux'
import { setData } from '../../store/reducers/WeatherSlice'
import { setImage } from '../../store/reducers/PreferencesSlice'
import { DropdownProps, weatherData } from '../home2/interfaces/WeatherCardInterfaces'


const Dropdown = forwardRef<HTMLInputElement, DropdownProps>(
  ({ name, options, user, value, onChange, onTextChange, ...props }, ref) => {
    const isSearchActive = useRef(false)
    const [active, setActive] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const { colorMode } = useColorMode()
    const dispatch = useDispatch()

    const popoverRef = useRef<HTMLDivElement>(null)

    const handleChosenOption = async (townName: string) => {
      


      try {
        const { data }: weatherData = await customFetch.get(
          `?q=${townName}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        )

        const { results } = await fetchImagesFromUnsplash(townName)
        let townImage = results[0].urls.regular

        await axiosInstance.post('/api/preferences', {
          townName: data.name,
          email: user.email,
          townImage: townImage,
        })

        dispatch(setData(data))
        dispatch(setImage(townImage))
      } catch (error) {}

      onChange(townName)
    }

    useEffect(() => {
      if (value) {
        const foundOption = _.find(options, { value })
        if (foundOption) {
          onChange(foundOption.label)
        }
      }
    }, [value, options, onChange])

    const handleTextChange = (text: string) => {
      onChange(text)
      setActive(0)
      onTextChange(text)
      isSearchActive.current = true
      setIsOpen(options.length > 0 && isSearchActive.current)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const isUpKeyCode = event.key === 'ArrowUp'
      const isDownKeyCode = event.key === 'ArrowDown'
      const isEnterKeyCode = event.key === 'Enter'
      const isExitKeyCode = event.key === 'Escape'

      if (isUpKeyCode && active > 0) {
        setActive(active - 1)
      }
      if (isDownKeyCode && active < options.length - 1) {
        setActive(active + 1)
      }
      if (isEnterKeyCode) {
        handleChosenOption(options[active].label)
        setIsOpen(false)
      }
      if (isExitKeyCode) {
        setIsOpen(false)
      }
    }

    // Use the useOutsideClick hook
    useOutsideClick({
      ref: popoverRef,
      handler: () => setIsOpen(false),
    })

    const Option = ({
      label,
      i,
      onChange,
    }: {
      label: string
      i: number
      onChange: (value: string) => void
    }) => {
      const updateText = () => {
        handleChosenOption(label)
        setIsOpen(false)
      }

      const getBgColor = (active: number, i: number) => {
        if (active === i) {
          return colorMode === 'light' ? 'gray.50' : 'gray.500'
        }
      }

      return (
        <Box
          onClick={updateText}
          p={1}
          bgColor={getBgColor(active, i)}
          _hover={{ bgColor: 'gray.50' }}
        >
          <Text cursor="pointer">{label}</Text>
        </Box>
      )
    }

    return (
      <Popover {...props} isOpen={isOpen} autoFocus={false} matchWidth>
        <PopoverTrigger>
          <Input
            ref={ref}
            name={name}
            placeholder="Search"
            type="text"
            value={value}
            autoComplete="off"
            onChange={(e) => handleTextChange(e.target.value)}
            onKeyDown={handleKeyDown}
            isRequired
            id="dropdownId"
          />
        </PopoverTrigger>

        {isOpen && (
          <PopoverContent w="217px" ref={popoverRef}>
            {options.slice(0, 5).map((option, i) => (
              <Option
                key={option.value}
                i={i}
                label={option.label}
                onChange={handleChosenOption}
              />
            ))}
          </PopoverContent>
        )}
      </Popover>
    )
  }
)

Dropdown.displayName = 'Dropdown'

export default Dropdown
