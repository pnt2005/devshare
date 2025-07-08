'use client'

import RegisterForm from '@/components/RegisterForm'

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký tài khoản</h1>
        <RegisterForm />
      </div>
    </main>
  )
}
