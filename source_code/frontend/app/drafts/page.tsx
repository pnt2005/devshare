'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import PostCard from '@/components/PostCard'

export default function DraftPostsPage() {
  const router = useRouter()
  const [drafts, setDrafts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await api.get('/posts/drafts') // lấy draft của user
        setDrafts(res.data.posts)
      } catch (err) {
        console.error('Lỗi tải bài nháp:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDrafts()
  }, [])

  
  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold">📝 Bài viết Nháp của bạn</h1>

      {loading ? (
        <p>Đang tải...</p>
      ) : drafts.length === 0 ? (
        <p>Không có bài nháp nào.</p>
      ) : (
        drafts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </main>
  )
}
