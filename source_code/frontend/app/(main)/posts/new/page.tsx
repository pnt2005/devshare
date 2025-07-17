'use client'

import PostEditor from '@/components/post/PostEditor'
import { useUser } from '@/contexts/UserContext'

export default function NewPostPage() {
    const { user, setUser } = useUser()

    return (
      <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">✍️ Create new post</h1>
        {user && <PostEditor />}
      </main>
    )
}
