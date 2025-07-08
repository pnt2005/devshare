'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<any[]>([])
  const [content, setContent] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchComments()
    // nếu dùng token để lấy user từ backend, bạn có thể gọi API /me
  }, [])

  const fetchComments = async () => {
    const res = await api.get(`/posts/${postId}/comments`)
    setComments(res.data)
  }

  const handleComment = async () => {
    if (!content.trim()) return
    try {
      await api.post(`/posts/${postId}/comments`, { content })
      setContent('')
      fetchComments()
    } catch (err) {
      alert('Bạn cần đăng nhập để bình luận.')
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Bình luận</h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Viết bình luận..."
        className="w-full border rounded p-2"
        rows={3}
      />
      <button onClick={handleComment} className="px-4 py-2 bg-blue-600 text-white rounded">
        Gửi bình luận
      </button>

      <div className="space-y-4 mt-4">
        {comments.length === 0 && <p>Chưa có bình luận nào.</p>}
        {comments.map((c) => (
          <div key={c.id} className="border p-3 rounded bg-gray-50">
            <p className="text-sm text-gray-600">{c.user.name} – {new Date(c.created_at).toLocaleString()}</p>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
