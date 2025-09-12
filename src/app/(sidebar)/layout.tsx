import { SidebarLayout } from "@/components/sidebar-layout";
import { getPosts } from '@/data/posts';
import type React from "react";

export default async function BlogSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await getPosts();
  
  // Transform posts into modules format for sidebar
  const modules = [
    {
      id: 'blog',
      title: 'Blog Posts',
      description: 'All blog posts',
      lessons: posts.map((post) => ({
        id: post.slug,
        title: post.title,
        description: post.summary || 'Blog post',
        video: null,
      })),
    },
  ];

  return <SidebarLayout modules={modules}>{children}</SidebarLayout>;
}
