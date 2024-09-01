import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextApiRequest } from 'next'

export async function POST(req: Request) {
  const { email, name }: { email: string; name: string } = await req.json()

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  let newUser
  if (!existingUser) {
    newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    })
  }

  return Response.json({ req: newUser })
}
