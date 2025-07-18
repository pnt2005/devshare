'use client'

import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import { useState } from 'react'
import toast from 'react-hot-toast'

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
      toast.error('Content can not be blank')
      return
    }

    try {
      const res = await api.post('/posts', {
        title: data.title,
        content,
        tag: data.tags.split(',').map((t) => t.trim()),
        status: publish ? 'published' : 'draft',
      })
      toast.success("Success")
      if (publish) router.push(`/posts/${res.data.id}`)
      else router.push(`/drafts`)
    } catch (err: any) {
        if (err.response?.data?.error) {
          toast.error(err.response.data.error)
        } else {
          toast.error("Error")
        }
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
        placeholder="Title"
        className="w-full p-3 border rounded-md text-lg"
        {...register('title', { required: 'Title is required' })}
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      {/* Tags */}
      <input
        type="text"
        placeholder="Tags (separate by commas)"
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
          Post
        </button>
        <button
          type="button"
          onClick={handleSubmit((data) => onSubmit(data, false))}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Save as draft
        </button>
      </div>
    </form>
  )
}
