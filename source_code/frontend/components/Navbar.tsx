'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import SearchBar from './SearchBar'
import { useUser } from '@/contexts/UserContext'

export default function Navbar() {
  const router = useRouter()
  const { user, setUser } = useUser()

  const handleLogout = () => {
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    setUser(null)
    router.push('/login')
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          DevShare Lite
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/posts" className="text-gray-700 hover:text-blue-600">
            Bài viết
          </Link>
          <Link href="/drafts" className="text-gray-700 hover:text-blue-600">
            Bài nháp
          </Link>
          <Link href="/posts/new" className="text-gray-700 hover:text-blue-600">
            Viết bài
          </Link>
          <SearchBar/>
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="text-gray-700 hover:text-blue-600">
                👤 {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-blue-600 font-medium">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
