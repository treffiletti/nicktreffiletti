import { Book, Bookshelf } from '@/components/bookshelf';
import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '@/components/breadcrumbs';
import { CenteredPageLayout } from '@/components/centered-layout';
import { ContentLink } from '@/components/content-link';
import { PageSection } from '@/components/page-section';
import { VideoCard } from '@/components/video-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Articles, talks, and tools for platform architects and engineering leaders.',
};

export default function Page() {
  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Resources</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Resources
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-600 dark:text-gray-400">
        Reference material for building internal platforms and leading engineering teams.
      </p>

      <div className="mt-16 space-y-16">
        <PageSection title={<h2>Writing</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Essays and guides on platform engineering.
          </p>
          <div className="mt-8 max-w-2xl space-y-6">
            <ContentLink
              type="article"
              title="The Guide to Platform Engineering"
              description="Thoughtworks' overview of modern platform teams."
              href="https://www.thoughtworks.com/en-us/insights/articles/guide-to-platform-engineering"
            />
            <ContentLink
              type="article"
              title="Golden Paths: How Spotify Simplified Development"
              description="Creating paved roads for common workflows."
              href="https://engineering.atspotify.com/2020/08/golden-paths/"
            />
            <ContentLink
              type="article"
              title="Measuring Developer Experience"
              description="Frameworks for tracking productivity signals."
              href="https://queue.acm.org/detail.cfm?id=3454124"
            />
          </div>
        </PageSection>

        <PageSection title={<h2>Podcasts</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Conversations with platform engineering leaders.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            <VideoCard
              title="Platform Engineering Podcast: Internal Platforms at GitHub"
              subtitle="Bryan Liles"
              url="https://platformengineering.org/podcast"
              target="_blank"
              thumbnailUrl="https://assets.tailwindcss.com/templates/compass/podcast-placeholder.png"
              duration={1800}
            />
            <VideoCard
              title="Software Engineering Daily: Developer Productivity"
              subtitle="Abi Noda"
              url="https://softwareengineeringdaily.com/"
              target="_blank"
              thumbnailUrl="https://assets.tailwindcss.com/templates/compass/podcast-placeholder.png"
              duration={3600}
            />
          </div>
        </PageSection>

        <PageSection title={<h2>Books</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Further reading on platforms and leadership.
          </p>
          <Bookshelf className="mt-8">
            <Book
              title="Team Topologies"
              author="Matthew Skelton & Manuel Pais"
              imageUrl="https://assets.tailwindcss.com/templates/compass/team-topologies.png"
              imageWidth={1024}
              imageHeight={1280}
              href="https://teamtopologies.com/book"
            />
            <Book
              title="Accelerate"
              author="Nicole Forsgren, Jez Humble & Gene Kim"
              imageUrl="https://assets.tailwindcss.com/templates/compass/accelerate.png"
              imageWidth={1024}
              imageHeight={1280}
              href="https://itrevolution.com/accelerate-book/"
            />
          </Bookshelf>
        </PageSection>

        <PageSection title={<h2>Tools</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Utilities that improve developer workflows.
          </p>
          <div className="@container">
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 @2xl:grid-cols-2">
              <ContentLink
                type="tool"
                title="OpenFeature"
                description="Standard for feature flagging clients."
                href="https://openfeature.dev"
              />
              <ContentLink
                type="tool"
                title="Temporal"
                description="Orchestrate reliable workflows at scale."
                href="https://temporal.io"
              />
              <ContentLink
                type="tool"
                title="Crossplane"
                description="Kubernetes control plane for infrastructure APIs."
                href="https://www.crossplane.io"
              />
              <ContentLink
                type="tool"
                title="Backstage"
                description="Open platform for building developer portals."
                href="https://backstage.io"
              />
            </div>
          </div>
        </PageSection>
      </div>
    </CenteredPageLayout>
  );
}
