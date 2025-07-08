import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const isAuthPage = req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register'

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/posts/new', '/posts/:path*/edit'],
}
