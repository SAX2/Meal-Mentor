import db from '@/lib/supabase/db'
import { NextResponse } from 'next/server'
import { users } from '../../../../migrations/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, email_addresses, first_name, last_name, image_url } = body?.data
    const email = email_addresses[0]?.email_address

    const userExists = await db.select().from(users).where(eq(users.email, email));

    if (!userExists || userExists.length === 0) {
      await db.insert(users).values({
        id: id,
        avatarUrl: image_url || "",
        email,
        firstName: first_name,
        lastName: last_name,
        updatedAt: new Date().toISOString(),
      })
    } else {
      await db.update(users).set({
        id: id,
        avatarUrl: image_url || "",
        email,
        firstName: first_name,
        lastName: last_name,
        updatedAt: new Date().toISOString(),
      }).where(eq(users.id, id))
    }

    return new NextResponse('User updated in database successfully', {
      status: 200,
    })
  } catch (error) {
    console.error('Error updating database:', error)
    return new NextResponse('Error updating user in database', { status: 500 })
  }
}