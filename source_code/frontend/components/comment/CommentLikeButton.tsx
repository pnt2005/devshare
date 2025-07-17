'use client'

import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { likeComment, unlikeComment, getCommentLikeStatus, getCommentLikeCount } from '@/utils/api/commentLike'
import { useUser } from '@/contexts/UserContext'
import toast from 'react-hot-toast'

export default function CommentLikeButton({ commentId }: { commentId: number }) {
  const { user } = useUser()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await getCommentLikeCount(commentId)
        setLikeCount(count)
      } catch {}

      if (user) {
        try {
          const status = await getCommentLikeStatus(commentId)
          setLiked(status)
        } catch {}
      }
    }

    fetchData()
  }, [commentId, user])

  const handleLike = async () => {
    if (!user) {
      toast.error('You need to login to like.')
      return
    }

    try {
      if (liked) {
        await unlikeComment(commentId)
        setLiked(false)
        setLikeCount((prev) => prev - 1)
      } else {
        await likeComment(commentId)
        setLiked(true)
        setLikeCount((prev) => prev + 1)
      }
    } catch (err) {
      toast.error('Error')
    }
  }

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500"
    >
      <Heart className={`w-4 h-4 ${liked ? 'fill-red-500' : 'fill-white'}`} />
      <span>{likeCount}</span>
    </button>
  )
}
