'use client'

import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập DevShare Lite</h1>
        <LoginForm />
      </div>
    </main>
  )
}
