'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import PostCard from '@/components/post/PostCard'
import { api } from '@/utils/api'

export default function PostListPage() {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')
  const [posts, setPosts] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState<'latest' | 'likes'>('latest')

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const endpoint = sort === 'likes' ? `/posts/like?page=${page}` : `/posts?page=${page}`
        const res = await api.get(endpoint)
        setPosts(res.data.posts)
        setTotalPages(res.data.total_pages)
      } catch (err: any) {
        console.error('Lỗi lấy bài viết:', err.message)
      }
      setLoading(false)
    }
    fetchPosts()
  }, [page, sort])


  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">📰 Posts</h1>

      {loading && <p>Loading...</p>}

      {/* UI lọc bài viết */}
      {!loading && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSort('latest')}
            className={`px-4 py-2 rounded border ${
              sort === 'latest' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            🆕 Latest
          </button>
          <button
            onClick={() => setSort('likes')}
            className={`px-4 py-2 rounded border ${
              sort === 'likes' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            ❤️ Most liked
          </button>
        </div>
      )}

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
    </div>
  )
}
