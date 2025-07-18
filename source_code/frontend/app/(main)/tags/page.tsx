'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/utils/api'

type Tag = {
  id: number
  name: string
  postCount: number
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    api.get('/tags')
      .then((res) => {
        setTags(res.data)
      })
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📌 Tất cả Tags</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {tags.map(tag => (
          <Link key={tag.id} href={`/tags/${tag.name}`}>
            <div className="border rounded-lg p-4 hover:shadow-md transition bg-white hover:bg-blue-50 cursor-pointer">
              <div className="text-blue-700 font-semibold text-sm mb-1">#{tag.name}</div>
              <div className="text-xs text-gray-500">{tag.postCount} posts</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
