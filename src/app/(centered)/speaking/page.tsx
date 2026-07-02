import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { PageSection } from "@/components/page-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaking - Nick Treffiletti",
  description:
    "Available for conference talks, workshops, and podcast conversations on MCP, AI agent architecture, API governance, and platform engineering.",
};

const topics = [
  {
    title: "MCP in Production",
    description:
      "The patterns that work, the failure modes nobody talks about, and what the 2026 roadmap actually fixes. Built from running MCP servers at enterprise scale.",
  },
  {
    title: "AI Agent Architecture for Platform Teams",
    description:
      "How platform engineering responsibilities shift when AI agents become primary consumers of your IDP. Covers agent-first golden paths, MCP integration, and governance.",
  },
  {
    title: "API Governance at Scale",
    description:
      "Migrating thousands of APIs without production incidents. Unified auth, observability, and policy-as-code enforcement drawn from large-scale Apigee-to-Kong migrations.",
  },
  {
    title: "The Enterprise AI Integration Stack",
    description:
      "Making sense of MCP, A2A, API gateways, and agent frameworks together — a practical architecture overview for teams moving past demos into production.",
  },
];

export default function Page() {
  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Speaking</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Speaking
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-600 dark:text-gray-400">
        I&apos;m building my speaking track. If you run a conference, podcast, or internal engineering event
        and want a practitioner perspective on AI infrastructure, MCP, or API governance — reach out.
        Below are the topics I&apos;m best positioned to cover.
      </p>

      <div className="mt-16 space-y-16">
        <PageSection title={<h2>Topics</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Technical talks grounded in production experience, not demos.
          </p>
          <div className="mt-8 max-w-2xl space-y-8">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="border-b border-gray-200 pb-8 last:border-0 dark:border-gray-800"
              >
                <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                  {topic.title}
                </h3>
                <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title={<h2>Formats</h2>}>
          <div className="mt-8 max-w-2xl">
            <p className="text-sm/7 text-gray-600 dark:text-gray-400">
              Available for keynotes, technical deep dives, workshops, panel discussions,
              and podcast conversations. I prefer formats where the audience is practitioners —
              engineers and architects who want to go beyond the surface level.
            </p>
          </div>
        </PageSection>

        <PageSection title={<h2>Get in Touch</h2>}>
          <div className="mt-8 max-w-2xl">
            <p className="text-sm/7 text-gray-600 dark:text-gray-400">
              Reach out on LinkedIn or X with a brief description of your event, audience size,
              and topic you have in mind.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-6">
              <a
                href="https://linkedin.com/in/nicktreffiletti"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Contact on LinkedIn
              </a>
              <a
                href="https://x.com/iamnewyorknick"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Message on X
              </a>
            </div>
          </div>
        </PageSection>
      </div>
    </CenteredPageLayout>
  );
}
