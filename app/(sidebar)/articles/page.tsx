import Link from "next/link";
import { getAllPostsWithMetadata } from "./_posts";
import { formatDate } from "@/app/blog/utils";

export default function ArticlesIndex() {
  const posts = getAllPostsWithMetadata();
  
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Articles</h1>
      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-slate-200 dark:border-slate-800 pb-4 last:border-b-0">
            <Link 
              href={`/articles/${post.slug}`} 
              className="group block"
            >
              <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {post.metadata.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {formatDate(post.metadata.publishedAt)}
              </p>
              {post.metadata.description && (
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                  {post.metadata.description}
                </p>
              )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
