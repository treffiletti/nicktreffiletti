import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

interface ArticleMetadata {
  title: string;
  publishedAt: string;
  description?: string;
  image?: string;
  tags?: string[];
  draft?: boolean;
}

interface Article {
  slug: string;
  metadata: ArticleMetadata;
  source: string;
  readingTime: number;
}

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
  return slugs.map((slug) => parseFile(slug)).filter((post) => !post.metadata.draft);
}

export function getPostBySlug(slug: string): Article | null {
  try {
    return parseFile(slug);
  } catch {
    return null;
  }
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
