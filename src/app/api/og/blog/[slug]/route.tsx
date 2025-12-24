import { ImageResponse } from 'next/og'
import { getBlogPosts } from '@/lib/blog'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const posts = getBlogPosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return new Response('Post not found', { status: 404 })
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #0B0F17 0%, #1a1f2e 100%)',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Category badge */}
          <div
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              padding: '12px 24px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
              fontSize: '18px',
              color: '#60a5fa',
              fontWeight: '600',
            }}
          >
            BLOG POST
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '64px',
              lineHeight: 1.1,
              fontWeight: '700',
              letterSpacing: '-0.02em',
              maxWidth: '900px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.metadata.title}
          </div>

          {/* Summary */}
          <div
            style={{
              fontSize: '28px',
              lineHeight: 1.4,
              opacity: 0.85,
              maxWidth: '900px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.metadata.summary}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '32px',
          }}
        >
          <div style={{ fontSize: '24px', opacity: 0.7 }}>
            nicktreffiletti.com
          </div>
          <div
            style={{
              fontSize: '20px',
              opacity: 0.6,
              display: 'flex',
              gap: '16px',
            }}
          >
            MCP • AI Agents • Platform Engineering
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
