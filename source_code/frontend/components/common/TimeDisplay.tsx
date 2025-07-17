'use client'

import { formatDistanceToNow, format } from 'date-fns'
import { vi } from 'date-fns/locale/vi'

type Props = {
  isoTime: string
  fallbackToFullDate?: boolean // nếu quá xa thì hiện ngày giờ đầy đủ
  className?: string
}

export default function TimeDisplay({ isoTime, fallbackToFullDate = true, className = '' }: Props) {
  if (!isoTime) return null

  const date = new Date(isoTime)
  const now = new Date()

  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  let display = ''

  if (fallbackToFullDate && diffMinutes > 1440) {
    // nếu hơn 1 ngày thì hiện ngày giờ cụ thể
    display = format(date, 'dd/MM/yyyy HH:mm', { locale: vi })
  } else {
    // hiện "x phút trước"
    display = formatDistanceToNow(date, { addSuffix: true, locale: vi }) // → "5 phút trước"
  }

  return <span className={`text-gray-500 text-sm ${className}`}>{display}</span>
}
