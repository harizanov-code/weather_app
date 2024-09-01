import axios, { AxiosInstance } from 'axios'

// Create a custom Axios instance with a base URL
const customFetch: AxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
})

type fetchImagesFromUnsplash = {
  townName: string
}

export const fetchImagesFromUnsplash = async (townName: string) => {
  const url = `https://api.unsplash.com/search/photos?query=${townName}&per_page=1&client_id=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error)
    return null
  }
}

export default customFetch
