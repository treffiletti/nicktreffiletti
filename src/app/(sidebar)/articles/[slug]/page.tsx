import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '../_posts';
import { CustomMDX } from '@/app/components/mdx';
import { baseUrl } from '@/app/sitemap';

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, description, image } = post.metadata;
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/articles/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.description,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/articles/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Nick Treffiletti',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">{post.metadata.title}</h1>
      <div className="mt-2 mb-8 flex flex-col gap-2 text-sm text-neutral-600 dark:text-neutral-400">
        <p>
          {formatDate(post.metadata.publishedAt)} · {post.readingTime} min read
        </p>
        {post.metadata.tags?.length ? (
          <p className="text-xs">
            {post.metadata.tags.map((t) => (
              <a
                key={t}
                href={`/articles?tag=${encodeURIComponent(t)}`}
                className="mr-2 hover:underline"
              >
                #{t}
              </a>
            ))}
          </p>
        ) : null}
      </div>
      <article className="prose prose-slate dark:prose-invert max-w-prose">
        <CustomMDX source={post.source} />
      </article>
    </section>
  );
}
