'use client'

import PostEditor from '@/components/PostEditor'
import { useUser } from '@/contexts/UserContext'
import AuthError from '@/components/AuthError'

export default function NewPostPage() {
    const { user, setUser } = useUser()

    return (
      <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">✍️ Create new post</h1>
        {!user && <AuthError message={'You need to login.'} />}
        {user && <PostEditor />}
      </main>
    )
}
