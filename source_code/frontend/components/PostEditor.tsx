'use client'

import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useState } from 'react'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type FormData = {
  title: string
  tags: string
}

export default function PostEditor() {
  const router = useRouter()
  const [content, setContent] = useState<string | undefined>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData, publish: boolean) => {
    if (!content || content.trim() === '') {
      alert('Nội dung không được để trống')
      return
    }

    try {
      const res = await api.post('/posts', {
        title: data.title,
        content,
        tag: data.tags.split(',').map((t) => t.trim()),
        status: publish ? 'published' : 'draft',
      })

      router.push(`/posts/${res.data.id}`)
    } catch (err: any) {
      console.error('Lỗi tạo bài viết:', err.response?.data || err.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, true))}
      className="space-y-4"
      data-color-mode="light"
    >
      {/* Tiêu đề */}
      <input
        type="text"
        placeholder="Tiêu đề bài viết"
        className="w-full p-3 border rounded-md text-lg"
        {...register('title', { required: 'Tiêu đề là bắt buộc' })}
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      {/* Tags */}
      <input
        type="text"
        placeholder="Tags (phân tách bằng dấu phẩy)"
        className="w-full p-2 border rounded-md"
        {...register('tags')}
      />

      {/* Nội dung Markdown */}
      <MDEditor value={content} onChange={setContent} height={400} preview="edit" />

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Đăng bài
        </button>
        <button
          type="button"
          onClick={handleSubmit((data) => onSubmit(data, false))}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Lưu nháp
        </button>
      </div>
    </form>
  )
}
