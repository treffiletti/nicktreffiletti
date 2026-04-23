import {
  Breadcrumb,
  BreadcrumbHome,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interviews - Nick Treffiletti",
  description: "Conversations with practitioners building AI systems in production.",
  robots: { index: false, follow: false },
};

export default function InterviewsPage() {
  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Interviews</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Interviews
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-700 dark:text-gray-400">
        Conversations with engineers and architects building AI systems, MCP infrastructure, and developer platforms in production.
      </p>
      <div className="mt-16 pb-32">
        <p className="text-sm/7 text-gray-500 dark:text-gray-400">
          Conversations with engineers building production MCP integrations, API governance leaders, and platform architects shipping AI-native systems. Real practitioners, real infrastructure decisions — no fluff.
        </p>
        <p className="mt-4 text-sm/7 font-medium text-gray-400 dark:text-gray-500">
          Coming soon.
        </p>
      </div>
    </CenteredPageLayout>
  );
}
