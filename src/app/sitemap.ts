import { getBlogPosts } from '@/lib/blog'

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export default async function sitemap() {
  const currentDate = new Date().toISOString().split('T')[0]

  // Blog posts with their actual publish dates
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Main pages with priorities
  const routes = [
    { route: '', priority: 1.0 },           // Homepage
    { route: '/about', priority: 0.9 },     // About page
    { route: '/blog', priority: 0.8 },      // Blog listing
    { route: '/projects', priority: 0.8 },  // Projects
    { route: '/speaking', priority: 0.7 },  // Speaking
    { route: '/services', priority: 0.8 },  // Services
    { route: '/interviews', priority: 0.6 },
    { route: '/resources', priority: 0.6 },
  ].map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority,
  }))

  return [...routes, ...blogs]
}
