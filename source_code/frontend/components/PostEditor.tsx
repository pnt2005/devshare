'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function PostEditor() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState<string | undefined>('')
  const router = useRouter()

  const handleSubmit = async (publish = false) => {
    try {
      const res = await api.post('/posts', {
        title,
        content,
        tag: tags.split(',').map((t) => t.trim()),
        status: publish ? 'published' : 'draft',
      })

      router.push(`/posts/${res.data.id}`)
    } catch (err: any) {
      console.error('❌ Lỗi tạo bài viết:', err.response?.data || err.message)
    }
  }

  return (
    <div className="space-y-4" data-color-mode="light">
      <input
        type="text"
        placeholder="Tiêu đề bài viết"
        className="w-full p-3 border rounded-md text-lg"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Tags (phân tách bằng dấu phẩy)"
        className="w-full p-2 border rounded-md"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <MDEditor
        value={content}
        onChange={setContent}
        height={400}
        preview="edit"
      />

      <div className="flex gap-4">
        <button
          onClick={() => handleSubmit(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Đăng bài
        </button>
        <button
          onClick={() => handleSubmit(false)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Lưu nháp
        </button>
      </div>
    </div>
  )
}
