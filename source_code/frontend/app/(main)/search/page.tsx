'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import PostCard from '@/components/post/PostCard'
import Pagination from '@/components/common/Pagination'

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
      .get(`/posts/search?query=${encodeURIComponent(query)}&page=${page}&limit=3`)
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
    <main className="max-w-4xl mx-auto p-4">
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

          <Pagination
            page={page}
            totalPages={totalPages}
            basePath="/search"
            extraQuery={{ query }}
          />
        </>
      )}
    </main>
  )
}
