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
  title: "About - Nick Treffiletti",
  description:
    "Platform engineer and AI architect specializing in MCP servers, AI agent systems, and developer platforms.",
};

export default function Page() {
  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>About</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        About
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-600 dark:text-gray-400">
        Platform engineer and AI architect specializing in building production-ready
        infrastructure for intelligent systems.
      </p>

      <div className="mt-16 space-y-16">
        <PageSection title={<h2>Expertise</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Core areas of focus and technical specialization.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl">
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                MCP / Model Context Protocol
              </h3>
              <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                Building production MCP servers and integrating AI tool ecosystems at scale.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                AI Agent Architecture
              </h3>
              <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                Designing reliable, observable agent systems with proper error handling and retry logic.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                Platform Engineering
              </h3>
              <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                Building internal developer platforms that enable teams to ship faster with confidence.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                Cloud-Native Infrastructure
              </h3>
              <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                Kubernetes, service mesh, observability, and everything needed to run AI workloads in production.
              </p>
            </div>
          </div>
        </PageSection>

        <PageSection title={<h2>Background</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Professional journey and experience.
          </p>
          <div className="mt-8 max-w-2xl prose prose-gray dark:prose-invert">
            <p className="text-sm/7 text-gray-600 dark:text-gray-400">
              I've spent my career at the intersection of infrastructure and developer experience,
              building platforms that make engineering teams more productive. My work has ranged
              from designing Kubernetes-based developer platforms to architecting AI agent systems
              that integrate with enterprise tooling.
            </p>
            <p className="mt-4 text-sm/7 text-gray-600 dark:text-gray-400">
              When Anthropic released the Model Context Protocol specification, I recognized it
              as a foundational piece for how AI agents will integrate with existing systems. Since
              then, I've focused on building production-ready MCP servers and helping teams adopt
              the protocol in their infrastructure.
            </p>
          </div>
        </PageSection>

        <PageSection title={<h2>Current Focus</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            What I'm working on now.
          </p>
          <div className="mt-8 max-w-2xl">
            <ul className="space-y-4 text-sm/7 text-gray-600 dark:text-gray-400">
              <li className="flex gap-x-3">
                <span className="flex-none text-gray-950 dark:text-white">•</span>
                <span>
                  Building a comprehensive course on MCP server development and production deployment patterns
                </span>
              </li>
              <li className="flex gap-x-3">
                <span className="flex-none text-gray-950 dark:text-white">•</span>
                <span>
                  Consulting with teams on AI infrastructure and platform engineering strategies
                </span>
              </li>
              <li className="flex gap-x-3">
                <span className="flex-none text-gray-950 dark:text-white">•</span>
                <span>
                  Contributing to the MCP ecosystem through open source tools and educational content
                </span>
              </li>
              <li className="flex gap-x-3">
                <span className="flex-none text-gray-950 dark:text-white">•</span>
                <span>
                  Exploring the convergence of platform engineering and AI-first development workflows
                </span>
              </li>
            </ul>
          </div>
        </PageSection>

        <PageSection title={<h2>Let's Connect</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Interested in working together or just want to chat about MCP and platform engineering?
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <a
              href="https://github.com/treffiletti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/nicktreffiletti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/nicktreffiletti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Twitter/X
            </a>
          </div>
        </PageSection>
      </div>
    </CenteredPageLayout>
  );
}
