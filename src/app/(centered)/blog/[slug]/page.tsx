import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { CustomMDX } from "@/components/mdx";
import { formatDate, getBlogPosts } from "@/lib/blog";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogViewTracker } from "@/components/blog-view-tracker";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = `${baseUrl}/api/og/blog/${slug}`;

  return {
    title: `${title} - Nick Treffiletti`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Link href="/blog">
            <Breadcrumb>Blog</Breadcrumb>
          </Link>
          <BreadcrumbSeparator />
          <Breadcrumb>{post.metadata.title}</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <BlogViewTracker slug={slug} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Nick Treffiletti",
            },
          }),
        }}
      />

      {post.metadata.image && (
        <div className="relative -mx-4 mt-10 sm:-mx-6 sm:mt-14">
          <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80 md:h-96">
            <Image
              src={post.metadata.image}
              alt=""
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 rounded-2xl outline-1 -outline-offset-1 outline-gray-950/10 dark:outline-white/10" />
          </div>
        </div>
      )}

      <div className="mt-10 sm:mt-14">
        <h1 className="text-3xl/10 font-normal tracking-tight text-gray-950 dark:text-white">
          {post.metadata.title}
        </h1>
        <div className="mt-4 flex items-center gap-x-4 text-sm text-gray-600 dark:text-gray-400">
          <time dateTime={post.metadata.publishedAt}>
            {formatDate(post.metadata.publishedAt)}
          </time>
        </div>
      </div>

      <article className="prose prose-gray dark:prose-invert mt-10 max-w-3xl">
        <CustomMDX source={post.content} />
      </article>

      <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-x-2 text-sm font-semibold text-gray-950 hover:text-gray-600 dark:text-white dark:hover:text-gray-400"
          >
            ← Back to Blog
          </Link>
          <a
            href="/rss"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
            </svg>
            Subscribe via RSS
          </a>
        </div>
      </div>
    </CenteredPageLayout>
  );
}
