'use client'

import { useRouter } from 'next/navigation'

export default function AuthError({ message }: { message: string }) {
  const router = useRouter()

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
      <p>{message}</p>
      <button
        onClick={() => router.push('/login')}
        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  )
}
