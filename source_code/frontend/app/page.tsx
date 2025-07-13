'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import PostCard from '@/components/PostCard'

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts?page=1&limit=5') // chỉ lấy 5 bài mới
        setPosts(res.data.posts)
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <section className="text-center">
        <h1 className="text-3xl font-bold">💬 DevShare Lite</h1>
        <button
          onClick={() => router.push('/posts/new')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ✍️ Create post
        </button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-8 mb-4">🆕</h2>

        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <a
            href="/posts"
            className="text-blue-600 hover:underline font-medium"
          >
            → All posts
          </a>
        </div>
      </section>
    </main>
  )
}
