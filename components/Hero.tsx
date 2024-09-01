//displaying random town weather data
'use client'

import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const Hero = () => {
  const session = getSession()
  const [credentials, setCredentials] = useState<string | null | undefined>('')

  session.then((data) => {})

  useEffect(() => {
    // Retrieve credentials from session storage
    const storedCredentials = sessionStorage.getItem('user')
    setCredentials(storedCredentials)
    if (storedCredentials) {
      const parsedCredentials = JSON.parse(storedCredentials)
    }
  }, [credentials])

  return <div className="hero">This is the Hero component</div>
}
export default Hero
