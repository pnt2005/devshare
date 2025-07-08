import PostClientPage from '@/components/PostClientPage'
import { api } from '@/lib/api'

interface Params {
  params: { id: string }
}

export default async function PostPage({ params }: Params) {
  const res = await api.get(`/posts/${params.id}`)
  const post = res.data

  return <PostClientPage post={post} />
}
