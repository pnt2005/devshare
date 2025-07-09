'use client'

import { useRouter } from 'next/navigation'
import TimeDisplay from '@/components/TimeDisplay'

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
      <p className="text-gray-600 text-sm">
        {post.user.name} – <TimeDisplay isoTime={post.created_at} />
      </p>
      <p className="mt-1 text-gray-800 line-clamp-3">{post.excerpt}...</p>
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
