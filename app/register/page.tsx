import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import axios from 'axios'
import { redirect } from 'next/navigation'
export default async function registerUser() {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const user = await getUser()

  try {
    const response = await axios.post(
      '/api/user/create',
      user ? { id: user.id, email: user.email, name: user.given_name } : null,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )

    if (response.status === 200) {
      // Redirect to '/home'
      redirect('/home')
    }
  } catch (error) {
    console.error('Error:', error)
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      HERE WE ARE REGISTERINg
    </div>
  )
}

// export async function getServerSideProps() {
//   const session = await getServerSession(authConfig)
//   return {
//     props: {
//       session,
//     },
//   }
// }
