import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { formatDate, getBlogPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Image from "next/image";
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

      <div className="mt-16 pb-32">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {allBlogs.map((post) => (
            <Link
              key={post.slug}
              className="group block"
              href={`/blog/${post.slug}`}
            >
              {post.metadata.image && (
                <div className="relative">
                  <Image
                    src={post.metadata.image}
                    width={400}
                    height={225}
                    alt=""
                    className="aspect-video w-full rounded-lg bg-gray-950 object-cover dark:bg-gray-900"
                  />
                  <div className="absolute inset-0 rounded-lg outline-1 -outline-offset-1 outline-gray-950/10 dark:outline-white/10" />
                </div>
              )}
              <div className="mt-4 flex items-start justify-between gap-3">
                <h2 className="text-sm/6 font-semibold text-gray-950 group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-300">
                  {post.metadata.title}
                </h2>
                <time className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(post.metadata.publishedAt, false)}
                </time>
              </div>
              {post.metadata.summary && (
                <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                  {post.metadata.summary}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </CenteredPageLayout>
  );
}
