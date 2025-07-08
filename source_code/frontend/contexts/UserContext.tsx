'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'

export const UserContext = createContext<any>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (!token) return
    api.get('/me')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
