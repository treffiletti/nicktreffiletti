import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'

export async function GET() {
  let allBlogs = await getBlogPosts()

  const itemsXml = allBlogs
    .filter((p) => !p?.metadata?.draft) // tolerate missing draft
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map((post) => {
      const slug = String(post?.slug ?? '')
      const title = String(post?.metadata?.title ?? (slug || 'Untitled'))
      const description = typeof post?.metadata?.description === 'string' ? post.metadata.description : ''
      const pub = post?.metadata?.publishedAt ? new Date(post.metadata.publishedAt) : null
      const link = `${baseUrl}/blog/${slug}`

      return `<item>
          <title><![CDATA[${title}]]></title>
          <link>${link}</link>
          <guid>${link}</guid>
          ${pub ? `<pubDate>${pub.toUTCString()}</pubDate>` : ''}
          ${description ? `<description><![CDATA[${description}]]></description>` : ''}
        </item>`
    })
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>My Portfolio</title>
        <link>${baseUrl}</link>
        <description>This is my portfolio RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
