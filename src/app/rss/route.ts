import { baseUrl } from '@/app/sitemap';
import { getPosts } from '@/data/articles';

export const revalidate = 300; // cache RSS for 5 minutes (adjust as you like)

export async function GET() {
  // Load posts
  const allPosts = getPosts();

  // Format posts for RSS
  const combinedPosts = allPosts.map((post) => ({
    title: post.title,
    publishedAt: post.publishedAt,
    summary: post.summary,
    slug: post.slug,
    type: 'post' as const,
  }));

  const itemsXml = combinedPosts
    .filter((p) => p?.publishedAt !== null) // skip drafts; includes posts with draft: false
    .sort((a, b) => {
      const aDate = a?.publishedAt ? new Date(a.publishedAt) : null;
      const bDate = b?.publishedAt ? new Date(b.publishedAt) : null;
      if (aDate && bDate) return bDate.getTime() - aDate.getTime();
      if (aDate && !bDate) return -1;
      if (!aDate && bDate) return 1;
      // fallback: sort by slug
      return String(a?.slug ?? '').localeCompare(String(b?.slug ?? ''));
    })
    .map((post) => {
      const slug = String(post?.slug ?? '');
      const title = String(post?.title ?? (slug || 'Untitled'));
      const description = String(post?.summary ?? '');
      const pubDate = post?.publishedAt ? new Date(post.publishedAt) : null;
      const link = `${baseUrl}/articles/${post.slug}`;

      return `<item>
  <title><![CDATA[${title}]]></title>
  <link>${link}</link>
  <guid>${link}</guid>
  ${pubDate ? `<pubDate>${pubDate.toUTCString()}</pubDate>` : ''}
  ${description ? `<description><![CDATA[${description}]]></description>` : ''}
</item>`;
    })
    .join('\n');

  const now = new Date();

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Nick Treffiletti — Platform Architecture &amp; Engineering</title>
  <link>${baseUrl}</link>
  <description>Essays on platform architecture, developer platforms, and cloud-native ops.</description>
  <language>en-us</language>
  <lastBuildDate>${now.toUTCString()}</lastBuildDate>
  ${itemsXml}
</channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=300, stale-while-revalidate=86400',
    },
  });
}
