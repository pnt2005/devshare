'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import PostCard from '@/components/PostCard'
import AuthError from '@/components/AuthError'


export default function DraftPostsPage() {
  const router = useRouter()
  const [drafts, setDrafts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await api.get('/posts/drafts') // lấy draft của user
        setDrafts(res.data.posts)
      } catch (err) {
        setError('Bạn cần đăng nhập để xem bài nháp.')
      } finally {
        setLoading(false)
      }
    }

    fetchDrafts()
  }, [router])

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold">📝 Bài viết Nháp của bạn</h1>

      {error && <AuthError message={error} />}

      {!error && loading ? (
        <p>Đang tải...</p>
      ) : !error && drafts.length === 0 ? (
        <p>Không có bài nháp nào.</p>
      ) : (
        drafts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </main>
  )
}
