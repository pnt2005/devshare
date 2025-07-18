'use client'

import PostEditor from '@/components/post/PostEditor'
import { useUser } from '@/contexts/UserContext'

export default function NewPostPage() {
    const { user, setUser } = useUser()

    return (
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">✍️ Create new post</h1>
        {user && <PostEditor />}
      </main>
    )
}
