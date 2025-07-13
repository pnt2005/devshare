'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { api } from '@/utils/api'
import toast from 'react-hot-toast'

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
      .catch(() => alert('Post not found!'))
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
    } catch (err: any) {
        if (err.response?.data?.error) {
          toast.error(err.response.data.error)
        } else {
          toast.error("error")
        }
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure to delete this post?')) return
    try {
      await api.delete(`/posts/${id}`)
      router.push(status === 'published' ? '/posts' : '/drafts')
    } catch (err) {
      alert('Delete failed!')
    }
  }

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-4">
      <h1 className="text-2xl font-bold">✏️ Edit</h1>

      <input
        type="text"
        placeholder="Title"
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
              💾 Save as draft
            </button>
            <button
              onClick={() => handleUpdate(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              🚀 Post
            </button>
          </>
        ) : (
          <button
            onClick={() => handleUpdate(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            🔄 Update
          </button>
        )}

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          🗑️ Delete
        </button>
      </div>
    </main>
  )
}
