import { api } from '@/utils/api'

export const likeComment = async (commentId: number) => {
  const res = await api.post(`/comment-likes/${commentId}`)
  return res.data
}

export const unlikeComment = async (commentId: number) => {
  const res = await api.delete(`/comment-likes/${commentId}`)
  return res.data
}

export const getCommentLikeStatus = async (commentId: number): Promise<boolean> => {
  const res = await api.get(`/comment-likes/${commentId}/status`)
  return res.data.liked
}

export const getCommentLikeCount = async (commentId: number): Promise<number> => {
  const res = await api.get(`/comment-likes/${commentId}/count`)
  return res.data.like_count
}
