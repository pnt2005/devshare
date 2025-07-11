'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api' 
import { useUser } from '@/contexts/UserContext' 
import PostCard from '@/components/PostCard'

type Post = {
    id: number
    title: string
    created_at: string
    updated_at?: string
    is_published: boolean
}

export default function ProfilePage() {
    const router = useRouter()
    const { user } = useUser()
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<Post[]>([])
    const [drafts, setDrafts] = useState<Post[]>([])

    useEffect(() => {
        if (!user) return

        const fetchData = async () => {
        try {
            const res = await api.get(`/posts/user/${user.id}`)
            const data = res.data
            setPosts(data.published)
            setDrafts(data.drafts)
        } catch (err) {
            console.error('Lỗi khi load bài viết:', err)
        } finally {
            setLoading(false)
        }
        }

        fetchData()
    }, [user])

    if (!user) return <div>Bạn chưa đăng nhập.</div>
    if (loading) return <div>Đang tải dữ liệu...</div>

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Trang cá nhân của {user.name}</h1>

        <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">📝 Bài viết đã đăng</h2>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            ) : (
            <p>Chưa có bài viết nào.</p>
            )}
        </section>

        <section>
            <h2 className="text-xl font-semibold mb-4">📄 Bản nháp</h2>
            {drafts.length > 0 ? (
                drafts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            ) : (
            <p>Chưa có bản nháp nào.</p>
            )}
        </section>
        </div>
    )
}
