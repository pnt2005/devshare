'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import PostCard from '@/components/PostCard'
import AuthError from '@/components/AuthError'
import { useUser } from '@/contexts/UserContext'

export default function DraftPostsPage() {
    const router = useRouter()
    const [drafts, setDrafts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const { user, setUser } = useUser()

    useEffect(() => {
      const fetchDrafts = async () => {
        try {
          const res = await api.get('/posts/drafts') // lấy draft của user
          setDrafts(res.data.posts)
        } catch (err) {
          console.log('get api error')
        } finally {
          setLoading(false)
        }
      }

      fetchDrafts()
    }, [router])

    return (
      <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
        <h1 className="text-2xl font-bold">📝 Bài viết Nháp của bạn</h1>
  
        {!user && <AuthError message={'Bạn cần đăng nhập để xem bài nháp.'} />}

        {user && loading ? (
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
