import Link from 'next/link';
import { getAllPostsWithMetadata } from './_posts';

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ArticlesIndex({
  searchParams,
}: {
  searchParams?: { q?: string; tag?: string; page?: string };
}) {
  const allPosts = getAllPostsWithMetadata();
  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.metadata.tags || []))).sort();

  const q = searchParams?.q?.toString() || '';
  const tag = searchParams?.tag?.toString() || '';
  const page = parseInt(searchParams?.page?.toString() || '1', 10);

  let posts = allPosts;
  if (q) {
    const qLower = q.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.metadata.title.toLowerCase().includes(qLower) ||
        p.metadata.description?.toLowerCase().includes(qLower) ||
        (p.metadata.tags || []).some((t) => t.toLowerCase().includes(qLower)),
    );
  }

  if (tag) {
    posts = posts.filter((p) => p.metadata.tags?.includes(tag));
  }

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const paginated = posts.slice(start, start + pageSize);

  const queryString = (pageNum: number) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (tag) params.set('tag', tag);
    if (pageNum > 1) params.set('page', String(pageNum));
    const qs = params.toString();
    return qs ? `?${qs}` : '';
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Articles</h1>
      <form className="mt-6 flex flex-col gap-4 max-w-md">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search articles"
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
        />
        <select
          name="tag"
          defaultValue={tag}
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
        >
          <option value="">All tags</option>
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Apply
        </button>
      </form>
      <div className="mt-6 space-y-4">
        {paginated.map((post) => (
          <article
            key={post.slug}
            className="border-b border-slate-200 pb-4 last:border-b-0 dark:border-slate-800"
          >
            <Link href={`/articles/${post.slug}`} className="group block">
              <h2 className="text-lg font-medium text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-400">
                {post.metadata.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {formatDate(post.metadata.publishedAt)} · {post.readingTime} min read
              </p>
              {post.metadata.description && (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {post.metadata.description}
                </p>
              )}
              {post.metadata.tags?.length ? (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {post.metadata.tags.map((t) => `#${t}`).join(' ')}
                </p>
              ) : null}
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
        {currentPage > 1 ? (
          <Link href={`/articles${queryString(currentPage - 1)}`}>Previous</Link>
        ) : (
          <span />
        )}
        <span>
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages ? (
          <Link href={`/articles${queryString(currentPage + 1)}`}>Next</Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
