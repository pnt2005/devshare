'use client'

import { useState, useEffect } from 'react'
import { api } from '@/utils/api'
import CommentItem from '@/components/CommentItem'
import { useUser } from '@/contexts/UserContext'
import dynamic from 'next/dynamic'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<any[]>([])
  const [content, setContent] = useState('')

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

  const handleReply = async (parentId: string, replyContent: string) => {
    try {
      await api.post(`/posts/${postId}/comments`, {
        content: replyContent,
        parent_id: parentId,
      })
      fetchComments()
    } catch (err) {
      alert('Bạn cần đăng nhập để phản hồi.')
    }
  }


  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Bình luận</h2>

      <div data-color-mode="light" className="w-full">
        <MDEditor
          value={content}
          onChange={(value) => setContent(value || '')}
          height={150}
          preview="edit"
        />
      </div>
      <button onClick={handleComment} className="px-4 py-2 bg-blue-600 text-white rounded">
        Gửi bình luận
      </button>

      <div className="space-y-4 mt-4">
        {comments.length === 0 && <p>Chưa có bình luận nào.</p>}
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} onReply={handleReply} />
        ))}
      </div>
    </div>
  )
}
