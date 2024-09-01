import { PrismaClient } from '@prisma/client/extension'
const prisma = new PrismaClient()
type User = {
  name: string
  id: number
}

export async function postUser(user: User) {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        id: user.id,
      },
    })

    return newUser // You can return the created user if needed
  } catch (error) {
    console.error('Error creating user:', error)
    throw error // You might want to rethrow the error for the caller to handle
  }
}
