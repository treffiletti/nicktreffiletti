import { getPosts } from '@/data/articles';
import { SITE_URL } from '@/lib/site';

export const baseUrl = SITE_URL;

export default async function sitemap() {
  let posts = getPosts().map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  let routes = [
    '',
    '/articles',
    '/library',
    '/resources',
    '/interviews',
    '/about',
    '/now',
    '/subscribe',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts];
}
