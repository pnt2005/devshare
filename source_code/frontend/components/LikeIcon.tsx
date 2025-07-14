'use client'

import { useEffect, useState } from 'react'
import { getLikeStatus, getLikeCount } from '@/utils/api/like'
import { Heart } from 'lucide-react'

export default function LikeButton({ postId }: { postId: number }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [status, count] = await Promise.all([
          getLikeStatus(postId),
          getLikeCount(postId),
        ])
        setLiked(status)
        setLikeCount(count)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [postId])


  return (
    <div className="flex items-center gap-1 text-sm text-gray-700 transition">
      {liked ? <Heart className="w-5 h-5 fill-red-500" /> : <Heart className="w-5 h-5 fill-white-500" />}
      <span>{likeCount}</span>
    </div>
  )
}
