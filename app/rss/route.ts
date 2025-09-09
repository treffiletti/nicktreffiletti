import { baseUrl } from 'app/sitemap';
import { getBlogPosts } from 'app/blog/utils';
import { getAllPostsWithMetadata } from 'app/(sidebar)/articles/_posts';

export const revalidate = 300; // cache RSS for 5 minutes (adjust as you like)

export async function GET() {
  // Load posts; tolerate missing/partial metadata
  const allBlogs = await getBlogPosts();
  const allArticles = getAllPostsWithMetadata();

  // Combine blogs and articles
  const allPosts = [
    ...allBlogs.map(post => ({ ...post, type: 'blog' })),
    ...allArticles.map(post => ({ ...post, type: 'article' }))
  ];

  const itemsXml = allPosts
    .filter((p) => p?.metadata?.draft !== true) // skip drafts; includes posts with draft: false
    .sort((a, b) => {
      const aDate = a?.metadata?.publishedAt ? new Date(a.metadata.publishedAt) : null;
      const bDate = b?.metadata?.publishedAt ? new Date(b.metadata.publishedAt) : null;
      if (aDate && bDate) return bDate.getTime() - aDate.getTime();
      if (aDate && !bDate) return -1;
      if (!aDate && bDate) return 1;
      // fallback: sort by slug
      return String(a?.slug ?? '').localeCompare(String(b?.slug ?? ''));
    })
    .map((post) => {
      const slug = String(post?.slug ?? '');
      const title = String(post?.metadata?.title ?? (slug || 'Untitled'));
      const description =
        typeof post?.metadata?.description === 'string' ? post.metadata.description : '';
      const pubDate = post?.metadata?.publishedAt ? new Date(post.metadata.publishedAt) : null;
      const link = `${baseUrl}/${post.type === 'blog' ? 'blog' : 'articles'}/${slug}`;

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
