'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Pagination from '@/components/common/Pagination'
import { api } from '@/utils/api'
import PostCard from '@/components/post/PostCard'
import { useUser } from '@/contexts/UserContext'

export default function DraftPostsPage() {
  const [drafts, setDrafts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const { user } = useUser()

  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')

  useEffect(() => {
    if (!user) return
    const fetchDrafts = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/posts/drafts?page=${page}&limit=2`)
        setDrafts(res.data.posts)
        setTotalPages(res.data.total_pages)
      } catch (err) {
        console.log('get api error')
      } finally {
        setLoading(false)
      }
    }
    fetchDrafts()
  }, [user, page])

  return (
    <div className="max-w-4xl mx-auto p-4">
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

      <Pagination
        page={page}
        totalPages={totalPages}
        basePath="/drafts"
      />
    </div>
  )
}
