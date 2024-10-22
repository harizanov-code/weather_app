import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { request } from 'http'
import { UserWeatherCard } from '../../home2/interfaces/WeatherCardInterfaces'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(req: Request) {
  const { isAuthenticated } = getKindeServerSession()
  const isAuth = await isAuthenticated()
  if (!isAuth) {
    return new Response('Unauthorized', { status: 401 })
  }
  const {
    email,
    cardName,
    image,
    name,
    temp,
    main,
  }: {
    email: string
    cardName: string
    image: string
    name: string
    temp: string
    main: string
  } = await req.json()

  const user = await prisma.user.findUnique({
    where: {
      email: email ? email : 'nothing',
    },
  })

  if (user?.id) {
    const weatherCard = await prisma.weatherCard.create({
      data: {
        userId: user.id,
        cardName: cardName,
        image: image,
        name: name,
        temp: temp,
        main: main,
      },
    })

    const cards: UserWeatherCard[] = await prisma.weatherCard.findMany({
      where: {
        userId: user.id,
      },
    })
    revalidatePath('/favorite')
    return Response.json({ res: { cards } })
  } else {
    return Response.json({ res: { redirectLogin: true } })
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const email = searchParams.get('id')

  if (email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email ? email : 'nothing',
      },
    })

    if (user) {
      const cards: any = await prisma.weatherCard.findMany({
        where: {
          userId: user.id,
        },
      })

      return Response.json({ req: { cards: cards } })
    }
  }
}
export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const name = searchParams.get('name')
  const email = searchParams.get('email')

  const user = await prisma.user.findUnique({
    where: {
      email: email ? email : 'nothing',
    },
  })

  if (name) {
    const card = await prisma.weatherCard.deleteMany({
      where: {
        cardName: name,
      },
    })

    if (user?.id) {
      const cards: UserWeatherCard[] = await prisma.weatherCard.findMany({
        where: {
          userId: user.id,
        },
      })
      revalidatePath('/favorite')
      return NextResponse.json({ res: { cards } })
    }
    revalidatePath('/favorite')
    return NextResponse.json({ req: { card: card } })
  }
}
