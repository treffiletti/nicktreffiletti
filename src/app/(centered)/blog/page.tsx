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
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Blog
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-600 dark:text-gray-400">
        In-depth articles on building production MCP servers, AI agent architectures,
        and platform engineering practices.
      </p>

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
