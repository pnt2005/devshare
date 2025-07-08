'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { api } from '@/lib/api'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function EditPostPage() {
  const { id } = useParams()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'draft' | 'published' | ''>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title || '')
        setContent(res.data.content || '')
        setStatus(res.data.status || '')
      })
      .catch(() => alert('Không tìm thấy bài viết!'))
      .finally(() => setLoading(false))
  }, [id])

  const handleUpdate = async (publish = false) => {
    try {
      await api.put(`/posts/${id}`, {
        title,
        content,
        status: publish ? 'published' : 'draft'
      })
      router.push(publish ? '/posts' : '/drafts')
    } catch (err) {
      alert('Cập nhật thất bại!')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xoá bài viết này?')) return
    try {
      await api.delete(`/posts/${id}`)
      router.push(status === 'published' ? '/posts' : '/drafts')
    } catch (err) {
      alert('Xoá thất bại!')
    }
  }

  if (loading) return <p className="p-4">Đang tải bài viết...</p>

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-4">
      <h1 className="text-2xl font-bold">✏️ Chỉnh sửa bài viết</h1>

      <input
        type="text"
        placeholder="Tiêu đề bài viết"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <MDEditor value={content} onChange={(val) => setContent(val || '')} />

      <div className="flex flex-wrap gap-4 mt-4">
        {status === 'draft' ? (
          <>
            <button
              onClick={() => handleUpdate(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              💾 Lưu nháp
            </button>
            <button
              onClick={() => handleUpdate(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              🚀 Đăng bài
            </button>
          </>
        ) : (
          <button
            onClick={() => handleUpdate(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            🔄 Cập nhật
          </button>
        )}

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          🗑️ Xoá bài viết
        </button>
      </div>
    </main>
  )
}
