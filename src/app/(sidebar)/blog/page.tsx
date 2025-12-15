import Link from 'next/link'
import { formatDate, getBlogPosts } from '@/lib/blog'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function BlogPage() {
  let allBlogs = getBlogPosts()

  return (
    <div className="max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-950 dark:text-white">
        Blog
      </h1>
      <div className="flex flex-col gap-4">
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ) {
              return -1
            }
            return 1
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="group flex flex-col space-y-1 rounded-lg p-4 transition-colors hover:bg-gray-950/5 dark:hover:bg-white/5"
              href={`/blog/${post.slug}`}
            >
              <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <p className="text-base font-medium tracking-tight text-gray-950 group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-300">
                  {post.metadata.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 md:w-[140px] md:text-right">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>
              {post.metadata.summary && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {post.metadata.summary}
                </p>
              )}
            </Link>
          ))}
      </div>
    </div>
  )
}
