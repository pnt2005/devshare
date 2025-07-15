'use client'

import { useEffect, useState } from 'react'
import { getLikeStatus, getLikeCount } from '@/utils/api/like'
import { Heart } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'

export default function LikeButton({ postId }: { postId: number }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const { user } = useUser() 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await getLikeCount(postId)
        setLikeCount(count)
      } catch (err) {
        console.error('Lỗi khi lấy like count:', err)
      }

      if (user) {
        try {
          const status = await getLikeStatus(postId)
          setLiked(status)
        } catch (err) {
          console.error('Lỗi khi lấy like status:', err)
        }
      }
    }
    fetchData()
  }, [postId, user])


  return (
    <div className="flex items-center gap-1 text-sm text-gray-700 transition">
      {liked ? <Heart className="w-5 h-5 fill-red-500" /> : <Heart className="w-5 h-5 fill-white-500" />}
      <span>{likeCount}</span>
    </div>
  )
}
