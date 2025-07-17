'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import PostCard from '@/components/post/PostCard'
import { useUser } from '@/contexts/UserContext'

export default function DraftPostsPage() {
    const [drafts, setDrafts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const { user, setUser } = useUser()

    useEffect(() => {
      if (!user) return
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
    }, [user])

    return (
      <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
        <h1 className="text-2xl font-bold">📝 Drafts</h1>

        {user && loading ? (
          <p>Loading...</p>
        ) : drafts.length === 0 ? (
          <p>No drafts yet.</p>
        ) : (
          drafts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </main>
    )
}
