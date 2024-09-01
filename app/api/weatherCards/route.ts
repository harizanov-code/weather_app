import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const email = searchParams.get('id')
}
