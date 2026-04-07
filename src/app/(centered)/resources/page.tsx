import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - Nick Treffiletti",
  description: "Curated resources on MCP, AI agent architecture, and platform engineering.",
  robots: { index: false, follow: false },
};

export default function ResourcesPage() {
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
      <p className="mt-6 max-w-xl text-base/7 text-gray-700 dark:text-gray-400">
        A curated collection of references for building production MCP servers, AI agent systems, and developer platforms. Covering architecture decisions, governance patterns, and hard-won production lessons.
      </p>
      <div className="mt-16 pb-32">
        <p className="text-sm/7 text-gray-500 dark:text-gray-400">
          Curated list in progress — coming soon.
        </p>
      </div>
    </CenteredPageLayout>
  );
}
