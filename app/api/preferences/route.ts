import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { request } from 'http'
export async function POST(req: Request) {
  const {
    email,
    townImage,
    townName,
  }: { email: string; townName: string; townImage: string } = await req.json()

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (user) {
    // Step 2: Check if a preference exists for the user
    const existingPreference = await prisma.preference.findUnique({
      where: {
        userId: user.id, // Use userId to find the preference
      },
    })

    let preference
    if (existingPreference) {
      // Step 3: If a preference exists, update it
      preference = await prisma.preference.update({
        where: {
          id: existingPreference.id, // Provide the preference's id
        },
        data: {
          searchedTown: townName,
          townImage: townImage,
        },
      })
    } else {
      // Step 4: If no preference exists, create a new one
      preference = await prisma.preference.create({
        data: {
          userId: user.id,
          searchedTown: townName,
          townImage: townImage,
        },
      })

      
    }

    // Step 5: Update the user's preferenceId

    return Response.json({ req: preference })
  } else {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const email = searchParams.get('email')

  const user = await prisma.user.findUnique({
    where: {
      email: email ? email : 'nothing',
    },
  })

  let town
  if (user?.id) {
    try {
      const preference = await prisma.preference.findFirst({
        where: {
          userId: user.id,
        },
      })

      return Response.json({
        townName: preference?.searchedTown,
        townImage: preference?.townImage,
      })
    } catch (error) {}
  } else {
    town = 'New York'
    return Response.json({ townName: town })
  }
}
