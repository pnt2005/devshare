'use client'

import RegisterForm from '@/components/auth/RegisterForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <div className="mb-6 text-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            DevShare Lite
          </Link>
        </div>
        <RegisterForm />
      </div>
    </main>
  )
}
