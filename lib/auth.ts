import { NextAuthOptions, User } from 'next-auth'
import { useRouter } from 'next/navigation'
import { authenticateUser } from './test'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'

export const authConfig: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID1 as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET1 as string,
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials) {
          // const user = await authenticateUser(credentials)
          //
          sessionStorage.setItem(
            'user',
            JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            })
          )
          return {
            id: '2',
            email: credentials.email,
            password: credentials.password,
          } as User
        }
        return null
      },
    }),
  ],
}

export function loginIsRequiredClient() {
  if (typeof window !== 'undefined') {
    const router = useRouter()
    const session = sessionStorage.getItem('user') // Retrieve session from sessionStorage
    if (!session) router.push('/')
  }
}
