import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '@/components/breadcrumbs';
import { CenteredPageLayout } from '@/components/centered-layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Nick Treffiletti is working on right now.',
};

export default function NowPage() {
  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Now</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <div className="prose prose-slate max-w-none dark:prose-invert">
        <h1>What I&apos;m doing now</h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <h2>Current Focus</h2>

        <p>
          I&apos;m currently focused on platform architecture and engineering leadership, with
          particular emphasis on:
        </p>

        <ul>
          <li>Building developer platforms that scale</li>
          <li>Cloud-native infrastructure patterns</li>
          <li>Developer experience optimization</li>
          <li>Platform engineering best practices</li>
        </ul>

        <h2>Writing</h2>

        <p>
          I&apos;m actively writing about platform architecture, sharing insights and lessons
          learned from building and scaling developer platforms.
        </p>

        <h2>Learning</h2>

        <p>
          Currently exploring emerging patterns in platform engineering, infrastructure as code, and
          developer productivity tools.
        </p>

        <hr />

        <p className="text-sm text-slate-500 dark:text-slate-400">
          This is a{' '}
          <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">
            now page
          </a>
          , inspired by Derek Sivers.
        </p>
      </div>
    </CenteredPageLayout>
  );
}
