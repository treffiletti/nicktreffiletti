import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Post = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  content: string;
  draft?: boolean;
};

export function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'src/data/posts');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => {
      const filePath = path.join(postsDirectory, name);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: name.replace(/\.mdx$/, ''),
        title: data.title || 'Untitled',
        publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString() : new Date().toISOString(),
        summary: data.summary || data.description || '',
        content,
        draft: data.draft || false,
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = getPosts();
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return null;
  }

  return post;
}

export function getPostSlugs(): string[] {
  return getPosts().map((post) => post.slug);
}
