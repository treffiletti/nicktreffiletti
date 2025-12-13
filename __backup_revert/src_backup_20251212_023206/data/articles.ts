import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface ArticleMetadata {
  title: string;
  publishedAt: string;
  description?: string;
  image?: string;
  tags?: string[];
  draft?: boolean;
}

export interface Article {
  slug: string;
  metadata: ArticleMetadata;
  source: string;
  readingTime: number;
}

export interface Post {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  content: string;
  draft?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs.readdirSync(ARTICLES_DIR);
  return files.filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
}

export function getPostSource(slug: string): string {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  return fs.readFileSync(filePath, 'utf8');
}

export function getAllPostsWithMetadata(): Article[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => parseFile(slug))
    .filter((post) => !post.metadata.draft)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
    );
}

export function getPostBySlug(slug: string): Article | null {
  try {
    return parseFile(slug);
  } catch {
    return null;
  }
}

export function getPosts(): Post[] {
  return getAllPostsWithMetadata().map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    publishedAt: post.metadata.publishedAt,
    summary: post.metadata.description || '',
    content: post.source,
    draft: post.metadata.draft,
  }));
}

export async function getPost(slug: string): Promise<Post | null> {
  const article = getPostBySlug(slug);
  if (!article) return null;
  return {
    slug: article.slug,
    title: article.metadata.title,
    publishedAt: article.metadata.publishedAt,
    summary: article.metadata.description || '',
    content: article.source,
    draft: article.metadata.draft,
  };
}

export function getPostSlugs(): string[] {
  return getAllPostSlugs();
}

export function getModules(): Module[] {
  const posts = getAllPostsWithMetadata();
  return [
    {
      id: 'articles',
      title: 'Blog Posts',
      lessons: posts.map((post) => ({ id: `articles/${post.slug}`, title: post.metadata.title })),
    },
  ];
}

function parseFile(slug: string): Article {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  const file = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(file);
  const metadata: ArticleMetadata = {
    title: data.title || 'Untitled',
    publishedAt: data.publishedAt || new Date().toISOString(),
    description: data.description,
    image: data.image,
    tags: Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === 'string'
        ? data.tags.split(',').map((t) => t.trim())
        : [],
    draft: data.draft,
  };
  const readingTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
  return { slug, metadata, source: file, readingTime };
}
