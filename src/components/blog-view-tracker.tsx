'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export function BlogViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent.blogView(slug)
  }, [slug])

  return null
}
