import axios from 'axios'
import axiosInstance from '../../axios/axios'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

export default async function CheckUser() {
  const { isAuthenticated, getUser } = await getKindeServerSession()
  const user = await getUser()

  try {
    const response = await axiosInstance.post('/api/user', {
      name: user?.given_name,
      email: user?.email,
    })
  } catch (error) {}

  return redirect('/home2')
}
