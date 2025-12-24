import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { formatDate, getBlogPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Nick Treffiletti",
  description:
    "Articles on MCP server development, AI agent architecture, and platform engineering best practices.",
};

export default function BlogPage() {
  const allBlogs = getBlogPosts().sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Blog</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <div className="mt-10 sm:mt-14">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl/10 font-normal tracking-tight text-gray-950 dark:text-white">
              Blog
            </h1>
            <p className="mt-6 max-w-xl text-base/7 text-gray-600 dark:text-gray-400">
              In-depth articles on building production MCP servers, AI agent architectures,
              and platform engineering practices.
            </p>
          </div>
          <a
            href="/rss"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-x-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-gray-950 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-white"
            title="Subscribe to RSS feed"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
            </svg>
            RSS
          </a>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex flex-col gap-6 max-w-3xl">
          {allBlogs.map((post) => (
            <Link
              key={post.slug}
              className="group block rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
              href={`/blog/${post.slug}`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-950 group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-300">
                    {post.metadata.title}
                  </h2>
                  <time className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(post.metadata.publishedAt, false)}
                  </time>
                </div>
                {post.metadata.summary && (
                  <p className="text-sm/6 text-gray-600 dark:text-gray-400">
                    {post.metadata.summary}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </CenteredPageLayout>
  );
}
