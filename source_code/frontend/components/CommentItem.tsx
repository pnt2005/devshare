'use client'

import { useState } from 'react'

export default function CommentItem({
  comment,
  onReply,
  depth = 0,
}: {
  comment: any
  onReply: (parentId: string, replyContent: string) => void
  depth?: number
}) {
  const [showReplyBox, setShowReplyBox] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const handleReply = async () => {
    if (!replyContent.trim()) return
    await onReply(comment.id, replyContent)
    setReplyContent('')
    setShowReplyBox(false)
  }

  return (
    <div className={`ml-${Math.min(depth * 4, 12)} mt-2 border-l pl-4`}>
      <p className="text-sm text-gray-600">{comment.user.name} – {new Date(comment.created_at).toLocaleString()}</p>
      <p>{comment.content}</p>
      <button
        onClick={() => setShowReplyBox(!showReplyBox)}
        className="text-blue-500 text-sm mt-1"
      >
        Trả lời
      </button>

      {showReplyBox && (
        <div className="mt-2">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full border rounded p-1"
            rows={2}
            placeholder="Nhập phản hồi..."
          />
          <button
            onClick={handleReply}
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded mt-1"
          >
            Gửi phản hồi
          </button>
        </div>
      )}

      {comment.replies?.map((reply: any) => (
        <CommentItem key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} />
      ))}
    </div>
  )
}
