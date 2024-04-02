import db from '@/lib/supabase/db'
import { NextResponse } from 'next/server'
import { users } from '../../../../../migrations/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id } = body?.data

    if (id) {
      await db.delete(users).where(eq(users.id, id))
    }

    return new NextResponse('User updated in database successfully', {
      status: 200,
    })
  } catch (error) {
    console.error('Error updating database:', error)
    return new NextResponse('Error updating user in database', { status: 500 })
  }
}