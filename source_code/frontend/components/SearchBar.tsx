'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm bài viết..."
        className="border rounded px-3 py-1 text-sm"
      />
      <button
        type="submit"
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
      >
        Tìm
      </button>
    </form>
  )
}
