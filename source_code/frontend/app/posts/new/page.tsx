'use client'

import PostEditor from '@/components/PostEditor'

export default function NewPostPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">✍️ Tạo bài viết mới</h1>
      <PostEditor />
    </main>
  )
}
