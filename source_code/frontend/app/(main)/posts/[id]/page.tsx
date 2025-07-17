import PostClientPage from '@/components/post/PostClientPage'
import { api } from '@/utils/api'
import { notFound } from 'next/navigation'

interface Params {
  params: { id: string }
}

export default async function PostPage({ params }: Params) {
  try {
    const res = await api.get(`/posts/${params.id}`)
    const post = res.data
    return <PostClientPage post={post} />
  }
  catch (error: any) {
    if (error.response?.status === 404) {
      notFound()
    }
    throw error
  }
}
