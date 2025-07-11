'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<{ [key: string]: string[] }>({})
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await api.post('/register', { email, password, name })
      router.push('/login')
    } catch (err: any) {
        const data = err.response?.data;
        if (typeof data === 'object') {
          setError(data);
        }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error.error && <p className="text-red-500">{error.error}</p>}

      <div>
        <label className="block text-sm font-medium">Họ tên</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {error.name && <p className="text-red-500">{error.name[0]}</p>}
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
        {error.email && <p className="text-red-500">{error.email[0]}</p>}
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
        {error.password && <p className="text-red-500">{error.password[0]}</p>}
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
