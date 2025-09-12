import { getPosts } from '@/data/posts'
import { SITE_URL } from '@/lib/site'

export const baseUrl = SITE_URL

export default async function sitemap() {
  let posts = getPosts()
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt,
    }))

  let routes = ['', '/blog', '/about', '/now'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...posts]
}
