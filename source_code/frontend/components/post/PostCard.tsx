'use client'

import { useRouter } from 'next/navigation'
import TimeDisplay from '@/components/common/TimeDisplay'
import LikeIcon from '../like/LikeIcon'

export default function PostCard({ post }: { post: any }) {
  const router = useRouter()

  const handleClick = () => {
    const path = post.status === 'draft' ? `/posts/${post.id}/edit` : `/posts/${post.id}`
    router.push(path)
  }

  return (
    <div
      className="border-b py-4 cursor-pointer hover:bg-gray-50 transition"
      onClick={handleClick}
    >
      <h2 className="text-xl font-semibold hover:text-blue-600">{post.title}</h2>

      <div className="flex items-center gap-3 mt-1">
        {/* Avatar ảnh */}
        <img
          src={post.user.avatar_url}
          alt={post.user.name}
          className="w-8 h-8 rounded-full object-cover"
        />

        <p className="text-gray-600 text-sm">
          {post.user.name} – <TimeDisplay isoTime={post.created_at} />
        </p>

        <LikeIcon postId={post.id} />
      </div>

      <p className="mt-2 text-gray-800 line-clamp-3">{post.excerpt}...</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {post.tag.map((tag: string) => (
          <span key={tag} className="text-sm text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}
