import { api } from '@/utils/api'

//Like bài viết
export const likePost = async (postId: number) => {
  const res = await api.post(`/likes/${postId}`)
  return res.data
}

//Unlike bài viết
export const unlikePost = async (postId: number) => {
  const res = await api.delete(`/likes/${postId}`)
  return res.data
}

//Kiểm tra đã like chưa
export const getLikeStatus = async (postId: number): Promise<boolean> => {
  const res = await api.get(`/likes/${postId}/status`)
  return res.data.liked
}

//Đếm số like
export const getLikeCount = async (postId: number): Promise<number> => {
  const res = await api.get(`/likes/${postId}/count`)
  return res.data.like_count
}
