'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import PostCard from '@/components/PostCard'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get('query') || ''
  const page = parseInt(searchParams.get('page') || '1')

  const [posts, setPosts] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!query) return

    setLoading(true)
    api
      .get(`/posts/search?query=${encodeURIComponent(query)}&page=${page}&limit=5`)
      .then((res) => {
        setPosts(res.data.posts)
        setTotalPages(res.data.total_pages)
      })
      .catch((err) => console.error('Search error:', err))
      .finally(() => setLoading(false))
  }, [query, page])

  const goToPage = (newPage: number) => {
    router.push(`/search?query=${encodeURIComponent(query)}&page=${newPage}`)
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold">🔍 Results for: "{query}"</h1>

      {loading ? (
        <p>Result loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts.</p>
      ) : (
        <>
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              disabled={page <= 1}
              onClick={() => goToPage(page - 1)}
              className={`px-4 py-2 rounded ${
                page > 1 ? 'bg-gray-200 hover:bg-gray-300' : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              ← Previous
            </button>

            <span className="text-gray-600">Page {page} / {totalPages}</span>

            <button
              disabled={page >= totalPages}
              onClick={() => goToPage(page + 1)}
              className={`px-4 py-2 rounded ${
                page < totalPages ? 'bg-gray-200 hover:bg-gray-300' : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </main>
  )
}
