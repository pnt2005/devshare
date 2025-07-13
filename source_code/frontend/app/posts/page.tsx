'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import PostCard from '@/components/PostCard'
import { api } from '@/utils/api'

export default function PostListPage() {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')

  const [posts, setPosts] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/posts?page=${page}`)
        setPosts(res.data.posts)
        setTotalPages(res.data.total_pages)
      } catch (err: any) {
        console.error('Lỗi lấy bài viết:', err.message)
      }
      setLoading(false)
    }

    fetchPosts()
  }, [page])

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">📰 Posts</h1>

      {loading && <p>Loading...</p>}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {!loading && (
        <div className="flex justify-between mt-6">
          <a
            href={`/posts?page=${page - 1}`}
            className={`px-4 py-2 rounded ${page > 1 ? 'bg-gray-200 hover:bg-gray-300' : 'text-gray-400 pointer-events-none'}`}
          >
            ← Previous
          </a>
          <span className="text-gray-600">Page {page} / {totalPages}</span>
          <a
            href={`/posts?page=${page + 1}`}
            className={`px-4 py-2 rounded ${page < totalPages ? 'bg-gray-200 hover:bg-gray-300' : 'text-gray-400 pointer-events-none'}`}
          >
            Next →
          </a>
        </div>
      )}
    </main>
  )
}
