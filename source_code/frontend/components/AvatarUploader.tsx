'use client'

import { useState } from 'react'
import { api } from '@/utils/api'
import { useUser } from '@/contexts/UserContext'

export default function AvatarUploader() {
  const { user, setUser } = useUser()
  const [file, setFile] = useState<File | null>(null)
  console.log(user)
  const handleUpload = async () => {
    if (!file) return alert("Chọn file trước đã!")

    const formData = new FormData()
    formData.append("avatar", file)

    const res = await api.post('/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    setUser({ ...user, avatar_url: res.data.avatar_url })
  }

  return (
    <div className="space-y-2">
      {user?.avatar_url && (
        <img src={user.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
      )}
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="btn btn-primary">Cập nhật avatar</button>
    </div>
  )
}
