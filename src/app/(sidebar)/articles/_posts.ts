import fs from "node:fs";
import path from "node:path";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

interface ArticleMetadata {
  title: string;
  publishedAt: string;
  description?: string;
  image?: string;
  draft?: boolean;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs.readdirSync(ARTICLES_DIR);
  return files.filter(f => f.endsWith(".mdx")).map(f => f.replace(/\.mdx$/, ""));
}

export function getPostSource(slug: string): string {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  return fs.readFileSync(filePath, "utf8");
}

export function getAllPostsWithMetadata() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => {
    const source = getPostSource(slug);
    const metadata = parseMetadata(source);
    return { slug, metadata, source };
  }).filter(post => !post.metadata.draft);
}

export function getPostBySlug(slug: string) {
  const source = getPostSource(slug);
  const metadata = parseMetadata(source);
  return { slug, metadata, source };
}

function parseMetadata(source: string): ArticleMetadata {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = source.match(frontmatterRegex);
  
  if (!match) {
    return {
      title: "Untitled",
      publishedAt: new Date().toISOString(),
    };
  }

  const frontmatter = match[1];
  const metadata: Partial<ArticleMetadata> = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      metadata[key.trim() as keyof ArticleMetadata] = value as any;
    }
  });

  return {
    title: metadata.title || "Untitled",
    publishedAt: metadata.publishedAt || new Date().toISOString(),
    description: metadata.description,
    draft: metadata.draft,
  };
}
