'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PostCard from '@/components/post/PostCard'
import Pagination from '@/components/common/Pagination'
import { useSearchParams } from 'next/navigation'
import { api } from '@/utils/api'

type Post = {
  id: number
  title: string
  author: { username: string }
  created_at: string
}

export default function TagDetailPage() {
    const { name } = useParams()
    const [posts, setPosts] = useState<Post[]>([])
    const searchParams = useSearchParams()
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 10
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        if (!name) return
        api.get(`/tags/${name}?page=${page}&limit=${limit}`)
            .then(res => {
                setPosts(res.data.posts)
                setTotalPages(res.data.total_pages)
            })
            .catch(err => console.error('Lỗi khi load bài viết theo tag:', err))
        }, [name, page])

    return (
        <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">📌 Tag: #{name}</h1>

        {posts.length === 0 ? (
            <p>Không có bài viết nào.</p>
        ) : (
            posts.map(post => (
                <PostCard key={post.id} post={post}/>
            ))
        )}

        <Pagination
            page={page}
            totalPages={totalPages}
            basePath={`/tags/${name}`}
        />
        </div>
    )
}
