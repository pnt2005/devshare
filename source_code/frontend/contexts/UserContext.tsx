'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import { api } from '@/utils/api'

export const UserContext = createContext<any>(null)

const protectedRoutes = [
  '/profile',
  '/drafts',
  '/posts/new',
  '/me',
]

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (!token) {
      setUser(null)
      return
    }

    const needsAuth = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    )

    if (!needsAuth) return

    api
      .get('/me')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
  }, [pathname]) // chạy lại mỗi lần route đổi

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
