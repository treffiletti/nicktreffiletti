import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '@/components/breadcrumbs';
import { CenteredPageLayout } from '@/components/centered-layout';
import { SubscribeForm } from '@/app/components/subscribe-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscribe',
  description: 'Subscribe to Platform Architecture Weekly',
};

export default function Page() {
  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Subscribe</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Subscribe
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-600 dark:text-gray-400">
        Get the Platform Architecture Scorecard and weekly insights.
      </p>
      <SubscribeForm className="mt-8" />
    </CenteredPageLayout>
  );
}
