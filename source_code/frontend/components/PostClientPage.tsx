'use client'

import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import PostDetail from './PostDetail'
import CommentSection from './CommentSection'
import { api } from '@/utils/api'
import { useState, useEffect } from 'react'

function useHasMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}

export default function PostClientPage({ post }: { post: any }) {
  const { user } = useUser()
  const router = useRouter()
  const hasMounted = useHasMounted()
  if (!hasMounted) return null

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc muốn xoá bài viết này?')) return
    try {
      await api.delete(`/posts/${post.id}`)
      alert('Đã xoá bài viết!')
      router.push('/posts')
    } catch (err) {
      alert('Không thể xoá bài viết!')
      console.error(err)
    }
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <PostDetail post={post} />

      {user?.id === post.user.id && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => router.push(`/posts/${post.id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            ✏️ Sửa bài
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            ❌ Xoá bài
          </button>
        </div>
      )}

      <CommentSection postId={post.id} />
    </main>
  )
}
