'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { useUser } from '@/contexts/UserContext'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { user, setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await api.post('/login', { email, password })
      Cookies.set('access_token', res.data.access_token, { expires: 7 })
      api.get("/me").then((res) => setUser(res.data));
      router.push('/') // chuyển hướng sau khi login thành công
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Đăng nhập thất bại')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded-md mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Mật khẩu</label>
        <input
          type="password"
          className="w-full border p-2 rounded-md mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Đăng nhập
      </button>

      <p className="text-sm text-center mt-4">
        Chưa có tài khoản?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Đăng ký
        </a>
      </p>
    </form>
  )
}
