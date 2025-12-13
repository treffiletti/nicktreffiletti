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
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Library',
  description: 'Curated references for platform architecture and engineering leadership.',
};

export default function Page() {
  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Library</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Library
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-600 dark:text-gray-400">
        Books and tools that shape effective platform teams.
      </p>

      <div className="mt-16 space-y-16">
        <PageSection title={<h2>Books</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Core texts on building and scaling internal platforms.
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
              title="Platform Engineering on Kubernetes"
              author="Michael Levan"
              imageUrl="https://assets.tailwindcss.com/templates/compass/platform-engineering.png"
              imageWidth={1024}
              imageHeight={1280}
              href="#"
            />
          </Bookshelf>
        </PageSection>

        <PageSection title={<h2>Tools</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Open-source projects for developer experience.
          </p>
          <div className="@container">
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 @2xl:grid-cols-2">
              <ContentLink
                type="tool"
                title="Backstage"
                description="Service catalog and developer portal by Spotify."
                href="https://backstage.io"
              />
              <ContentLink
                type="tool"
                title="Roadie"
                description="Managed Backstage platform."
                href="https://roadie.io"
              />
            </div>
          </div>
        </PageSection>
      </div>
    </CenteredPageLayout>
  );
}
