'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await api.post('/register', { email, password, name })
      router.push('/login')
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Đăng ký thất bại')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Họ tên</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

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
        Đăng ký
      </button>

      <p className="text-sm text-center mt-4">
        Đã có tài khoản?{' '}
        <a href="/login" className="text-blue-600 hover:underline">
          Đăng nhập
        </a>
      </p>
    </form>
  )
}
