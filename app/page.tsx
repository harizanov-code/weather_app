import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Hero from '../components/Hero'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Home() {
  const { isAuthenticated } = await getKindeServerSession()
  const isAuth = await isAuthenticated()

  if (!isAuth) {
    redirect('/api/auth/login')
  }

  return <main className="overflow-hidden"></main>
}
