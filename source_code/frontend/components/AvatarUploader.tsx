'use client'

import { useRef, useState } from 'react'
import { api } from '@/utils/api'
import { useUser } from '@/contexts/UserContext'
import toast from 'react-hot-toast'

export default function AvatarUploader() {
  const { user, setUser } = useUser()
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      if (previewUrl) URL.revokeObjectURL(previewUrl) //clear ảnh cũ nếu có
      setFile(selected)
      setPreviewUrl(URL.createObjectURL(selected))
    }
  }

  const handleUpload = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append("avatar", file)

    try {
      setLoading(true)
      const res = await api.post('/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setUser({ ...user, avatar_url: res.data.avatar_url })

      //Dọn dẹp
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setFile(null)
      setPreviewUrl(null)
      toast.success("Update avatar success 🎉")
      if (fileInputRef.current) fileInputRef.current.value = '' //reset input file
    } catch (err) {
      toast.error("Update avatar failed 😢")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-3 w-full">
      <img
        src={previewUrl || user?.avatar_url || '/static/default-avatar.jpg'}
        alt="Avatar"
        className="w-full max-w-[300px] aspect-square rounded-full object-cover border shadow"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full max-w-xs"
      />

      <button
        onClick={handleUpload}
        className="btn btn-primary w-full max-w-xs"
        disabled={!file || loading}
      >
        {loading ? 'Updating...' : 'Update avatar'}
      </button>
    </div>
  )
}
