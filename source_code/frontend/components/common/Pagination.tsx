'use client'

import { useRouter } from 'next/navigation'

interface PaginationProps {
  page: number
  totalPages: number
  basePath: string
  extraQuery?: Record<string, string>
}

export default function Pagination({ page, totalPages, basePath, extraQuery }: PaginationProps) {
  const router = useRouter()

  const buildUrl = (targetPage: number) => {
    const params = new URLSearchParams({ page: targetPage.toString() })
    if (extraQuery) {
      for (const key in extraQuery) {
        params.set(key, extraQuery[key])
      }
    }
    return `${basePath}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-between items-center mt-6">
      <a
        href={page > 1 ? buildUrl(page - 1) : '#'}
        className={`px-4 py-2 rounded ${page > 1 ? 'bg-gray-200 hover:bg-gray-300' : 'text-gray-400 pointer-events-none'}`}
      >
        ← Previous
      </a>

      <span className="text-gray-600">Page {page} / {totalPages}</span>

      <a
        href={page < totalPages ? buildUrl(page + 1) : '#'}
        className={`px-4 py-2 rounded ${page < totalPages ? 'bg-gray-200 hover:bg-gray-300' : 'text-gray-400 pointer-events-none'}`}
      >
        Next →
      </a>
    </div>
  )
}
