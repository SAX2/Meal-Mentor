import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   if (!session) {
  //     return NextResponse.redirect(new URL('/login', request.url))
  //   }
  // }

  // if (['/login', '/signup'].includes(request.nextUrl.pathname)) {
  //   if (session) {
  //     return NextResponse.redirect(new URL('/dashboard', request.url))
  //   }
  // }

  if (request.nextUrl.pathname == "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return response;
} 