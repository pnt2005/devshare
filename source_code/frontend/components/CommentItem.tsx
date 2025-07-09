'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import TimeDisplay from '@/components/TimeDisplay'
import ReactMarkdown from 'react-markdown'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

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
      <p className="text-sm text-gray-600">{comment.user.name} – <TimeDisplay isoTime={comment.created_at}/></p>
      <ReactMarkdown>{comment.content}</ReactMarkdown>
      <button
        onClick={() => setShowReplyBox(!showReplyBox)}
        className="text-blue-500 text-sm mt-1"
      >
        Trả lời
      </button>

      {showReplyBox && (
        <div className="mt-2">
          <div data-color-mode="light" className="w-full">
            <MDEditor
              value={replyContent}
              onChange={(value) => setReplyContent(value || '')}
              height={100}
              preview="edit"
            />
          </div>
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
