import {
  Breadcrumb,
  BreadcrumbHome,
  Breadcrumbs,
  BreadcrumbSeparator,
} from '@/components/breadcrumbs';
import { SidebarLayoutContent } from '@/components/sidebar-layout';
import { getPosts } from '@/data/posts';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Nick Treffiletti',
  description: 'Thoughts on software engineering, platform architecture, and building scalable systems.',
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <SidebarLayoutContent
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Blog</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Blog
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-700 dark:text-gray-400">
        Thoughts on software engineering, platform architecture, and building scalable systems.
      </p>
      <div className="mt-16 space-y-12 pb-32">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-950 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
                  {post.summary}
                </p>
              </div>
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SidebarLayoutContent>
  );
}
