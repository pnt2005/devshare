import ReactMarkdown from 'react-markdown'
import TimeDisplay from '@/components/TimeDisplay'

export default function PostDetail({ post }: { post: any }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">Tác giả: {post.user.name} – <TimeDisplay isoTime={post.created_at} /></p>
      <div className="flex gap-2 flex-wrap">
        {post.tag.map((tag: string) => (
          <span key={tag} className="bg-blue-100 text-blue-800 text-sm px-2 py-0.5 rounded">
            #{tag}
          </span>
        ))}
      </div>

      <article className="prose prose-neutral">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  )
}
