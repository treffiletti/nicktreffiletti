import { getBlogPosts } from 'app/blog/utils'
import { SITE_URL } from '../lib/site'

export const baseUrl = SITE_URL

export default async function sitemap() {
  let blogs = getBlogPosts()
    .filter((post) => post.metadata.draft !== true)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }))

  let routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
