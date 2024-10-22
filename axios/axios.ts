import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.KINDE_SITE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance

export const privateRequest = axios.create({
  baseURL: process.env.KINDE_SITE_URL,
  timeout: 5000,
})

// Add an interceptor to attach the token from the cookie to the headers
privateRequest.interceptors.request.use(
  async (config) => {
    try {
      // Replace '/api/getCookie' with your actual endpoint that returns the JWT
      const response = await axios.get('/api/getCookie')

      // Assuming the token is in the response under response.data.token
      const { token } = response.data

      if (token) {
        // Attach the token to the Authorization header
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    } catch (error) {
      // Optionally handle the error, or pass it along
      return Promise.reject(error)
    }
  },
  (error) => Promise.reject(error)
)
