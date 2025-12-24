import { getBlogPosts } from '@/lib/blog'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.SITE_URL || 'https://www.nicktreffiletti.com'

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  let allBlogs = getBlogPosts()

  const itemsXml = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post) =>
        `<item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${escapeXml(post.metadata.summary || '')}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
          <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
          ${post.metadata.image ? `<enclosure url="${escapeXml(post.metadata.image.startsWith('http') ? post.metadata.image : baseUrl + post.metadata.image)}" type="image/png" />` : ''}
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Nick Treffiletti - MCP, AI Agents &amp; Platform Engineering</title>
        <link>${baseUrl}</link>
        <description>Deep dives into MCP servers, AI agent architecture, and platform engineering. Building the infrastructure for intelligent systems.</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
        <image>
          <url>${baseUrl}/og?title=${encodeURIComponent('Nick Treffiletti - MCP, AI Agents & Platform Engineering')}</url>
          <title>Nick Treffiletti</title>
          <link>${baseUrl}</link>
        </image>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
