'use client'

import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import PostDetail from './PostDetail'
import CommentSection from '../comment/CommentSection'
import { api } from '@/utils/api'
import toast from 'react-hot-toast'


export default function PostClientPage({ post }: { post: any }) {
  const { user } = useUser()
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Do you really want to delete this post?')) return
    try {
      await api.delete(`/posts/${post.id}`)
      toast.success('Delete successful')
      router.push('/posts')
    } catch (err) {
      toast.error('Delete failed')
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
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            ❌ Delete 
          </button>
        </div>
      )}

      <CommentSection postId={post.id} />
    </main>
  )
}
