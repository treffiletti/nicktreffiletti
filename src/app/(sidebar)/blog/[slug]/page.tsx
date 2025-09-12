import {
  Breadcrumb,
  BreadcrumbHome,
  Breadcrumbs,
  BreadcrumbSeparator,
} from '@/components/breadcrumbs';
import { SidebarLayoutContent } from '@/components/sidebar-layout';
import { CustomMDX } from '@/app/components/mdx';
import { getPosts, getPost } from '@/data/posts';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';


export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {};
  }

  return {
    title: `${post.title} - Nick Treffiletti`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Nick Treffiletti'],
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const posts = await getPosts();
  
  if (!post) {
    notFound();
  }

  // Find next post
  const currentIndex = posts.findIndex(p => p.slug === post.slug);
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  return (
    <SidebarLayoutContent
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb href="/blog">Blog</Breadcrumb>
          <BreadcrumbSeparator />
          <Breadcrumb>{post.title}</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <article>
        <header className="mt-10 sm:mt-14">
          <h1 className="text-3xl/10 font-normal tracking-tight text-gray-950 dark:text-white">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </header>
        
        <div className="mt-12 prose prose-gray max-w-none dark:prose-invert">
          <CustomMDX source={post.content} />
        </div>
      </article>

      {nextPost && (
        <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-950 dark:text-white">
            Next Post
          </h3>
          <div className="mt-4">
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group block rounded-lg border border-gray-200 p-4 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
            >
              <h4 className="font-medium text-gray-950 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {nextPost.title}
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {nextPost.summary}
              </p>
            </Link>
          </div>
        </div>
      )}

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.summary,
            author: {
              '@type': 'Person',
              name: 'Nick Treffiletti',
            },
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
          }),
        }}
      />
    </SidebarLayoutContent>
  );
}
