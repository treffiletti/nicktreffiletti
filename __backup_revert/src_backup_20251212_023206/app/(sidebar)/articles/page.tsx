import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '@/components/breadcrumbs';
import { ContentLink } from '@/components/content-link';
import { PageSection } from '@/components/page-section';
import { SidebarLayoutContent } from '@/components/sidebar-layout';
import { getAllPostsWithMetadata } from '@/data/articles';

export const metadata = {
  title: 'Articles',
  description: 'Essays on platform architecture, developer experience, and engineering leadership.',
};

export default function ArticlesPage() {
  const posts = getAllPostsWithMetadata();

  return (
    <SidebarLayoutContent
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Articles</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-6xl">
          <div className="px-4 pt-24 pb-12 sm:pt-32">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-white">
              Articles
            </h1>
            <p className="mt-4 max-w-2xl text-base/7 text-gray-600 dark:text-gray-400">
              Insights on platform architecture, developer experience, and engineering leadership.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-y-16 pb-10 sm:px-4">
            <PageSection id="posts" title="Latest">
              <ol className="mt-6 space-y-4">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <ContentLink
                      title={post.metadata.title}
                      description={post.metadata.description || ''}
                      href={`/articles/${post.slug}`}
                    />
                  </li>
                ))}
              </ol>
            </PageSection>
          </div>
        </div>
      </div>
    </SidebarLayoutContent>
  );
}
