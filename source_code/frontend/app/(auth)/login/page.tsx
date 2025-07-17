'use client'

import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <div className="mb-6 text-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            DevShare Lite
          </Link>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
