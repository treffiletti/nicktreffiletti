import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Nick Treffiletti'
  const subtitle = searchParams.get('subtitle') || 'Platform Architecture & Engineering'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: 80,
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, textAlign: 'center', marginBottom: 24 }}>
          {title}
        </div>
        <div style={{ fontSize: 36, opacity: 0.8, textAlign: 'center' }}>
          {subtitle}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
