'use client'

import { useState, useEffect } from 'react'
import { api } from '@/utils/api'
import CommentItem from '@/components/CommentItem'
import { useUser } from '@/contexts/UserContext'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<any[]>([])
  const [content, setContent] = useState('')
  const { user } = useUser()

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    const res = await api.get(`/posts/${postId}/comments`)
    setComments(res.data)
  }

  const handleComment = async () => {
    if (user) {
      if (!content.trim()) return
      try {
        await api.post(`/posts/${postId}/comments`, { content })
        setContent('')
        fetchComments()
      } catch (err) {
        toast.error('Error')
      }
    }
    else toast.error('You need to login to comment')
  }

  const handleReply = async (parentId: string, replyContent: string) => {
    if (user) {
      try {
        await api.post(`/posts/${postId}/comments`, {
          content: replyContent,
          parent_id: parentId,
        })
        fetchComments()
      } catch (err) {
        toast.error('Error')
      }
    }
    else toast.error('You need to login to reply')
  }


  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Comments</h2>

      <div data-color-mode="light" className="w-full">
        <MDEditor
          value={content}
          onChange={(value) => setContent(value || '')}
          height={150}
          preview="edit"
        />
      </div>
      <button onClick={handleComment} className="px-4 py-2 bg-blue-600 text-white rounded">
        Comment
      </button>

      <div className="space-y-4 mt-4">
        {comments.length === 0 && <p>No comments.</p>}
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} onReply={handleReply} />
        ))}
      </div>
    </div>
  )
}
