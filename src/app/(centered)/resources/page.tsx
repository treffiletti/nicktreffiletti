import { Book, Bookshelf } from "@/components/bookshelf";
import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { ContentLink } from "@/components/content-link";
import { PageSection } from "@/components/page-section";
import { VideoCard } from "@/components/video-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - Nick Treffiletti",
  description:
    "A curated collection of resources for building production MCP servers and AI tool integrations.",
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
        A curated collection of resources for building production MCP servers and AI tool integrations.
      </p>

      <div className="mt-16 space-y-16">
        <PageSection title={<h2>Writing</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Technical articles on MCP architecture, platform engineering, and AI infrastructure.
          </p>
          <div className="mt-8 max-w-2xl space-y-6">
            <ContentLink
              type="article"
              title="Building Production-Ready MCP Servers"
              description="Best practices for deploying MCP servers at scale."
              href="#"
            />
            <ContentLink
              type="article"
              title="MCP vs REST: Choosing the Right Protocol"
              description="When to use Model Context Protocol for AI tool integration."
              href="#"
            />
            <ContentLink
              type="article"
              title="Multi-Agent Orchestration Patterns"
              description="Coordinating multiple AI agents with MCP servers."
              href="#"
            />
            <ContentLink
              type="article"
              title="Security Patterns for AI Tool Servers"
              description="Authentication, authorization, and input validation for MCP."
              href="#"
            />
            <ContentLink
              type="article"
              title="Platform Engineering in the AI Age"
              description="How AI agents are reshaping internal developer platforms."
              href="#"
            />
          </div>
        </PageSection>

        <PageSection title={<h2>Podcasts</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Technical discussions on AI infrastructure, platform engineering, and developer tools.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            <VideoCard
              title="Platform Engineering Podcast"
              subtitle="Building Developer Platforms"
              url="#"
              target="_blank"
              thumbnailUrl="https://assets.tailwindcss.com/templates/compass/nietzsche-thumbnail.png"
              duration={3720}
            />
            <VideoCard
              title="AI Infrastructure Show"
              subtitle="Scaling AI Systems"
              url="#"
              target="_blank"
              thumbnailUrl="https://assets.tailwindcss.com/templates/compass/liebniz-thumbnail.png"
              duration={4454}
            />
            <VideoCard
              title="The DevTools Podcast"
              subtitle="Developer Experience"
              url="#"
              target="_blank"
              thumbnailUrl="https://assets.tailwindcss.com/templates/compass/locke-thumbnail.png"
              duration={5040}
            />
          </div>
        </PageSection>

        <PageSection title={<h2>Books</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Essential reading for platform engineers and AI infrastructure builders.
          </p>
          <Bookshelf className="mt-8">
            <Book
              title="Building Microservices"
              author="Sam Newman"
              imageUrl="https://assets.tailwindcss.com/templates/compass/i-was-always-going-to-write-this-book.png"
              imageWidth={1024}
              imageHeight={1280}
              href="#"
            />
            <Book
              title="Designing Data-Intensive Applications"
              author="Martin Kleppmann"
              imageUrl="https://assets.tailwindcss.com/templates/compass/preordained-and-prosperous.png"
              imageWidth={1024}
              imageHeight={1536}
              href="#"
            />
            <Book
              title="The DevOps Handbook"
              author="Gene Kim et al."
              imageUrl="https://assets.tailwindcss.com/templates/compass/yes-but-why-did-i-think-that.png"
              imageWidth={1024}
              imageHeight={1425}
              href="#"
            />
            <Book
              title="Team Topologies"
              author="Matthew Skelton"
              imageUrl="https://assets.tailwindcss.com/templates/compass/the-responsiblity-loophole.png"
              imageWidth={1024}
              imageHeight={1356}
              href="#"
            />
            <Book
              title="Platform Engineering on Kubernetes"
              author="Mauricio Salatino"
              imageUrl="https://assets.tailwindcss.com/templates/compass/the-path-and-the-passenger.png"
              imageWidth={1024}
              imageHeight={1536}
              href="#"
            />
          </Bookshelf>
        </PageSection>

        <PageSection title={<h2>Tools</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Development tools and frameworks for building MCP servers and AI integrations.
          </p>
          <div className="@container">
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 @2xl:grid-cols-2">
              <ContentLink
                type="tool"
                title="MCP TypeScript SDK"
                description="Official TypeScript SDK for building MCP servers."
                href="https://github.com/anthropics/anthropic-sdk-typescript"
              />
              <ContentLink
                type="tool"
                title="MCP Python SDK"
                description="Official Python SDK for MCP server development."
                href="https://github.com/anthropics/anthropic-sdk-python"
              />
              <ContentLink
                type="tool"
                title="Claude Desktop"
                description="Test your MCP servers with Claude's desktop application."
                href="https://claude.ai/download"
              />
              <ContentLink
                type="tool"
                title="MCP Inspector"
                description="Debug and test MCP servers locally."
                href="#"
              />
              <ContentLink
                type="tool"
                title="OpenTelemetry"
                description="Observability and distributed tracing for MCP servers."
                href="https://opentelemetry.io"
              />
            </div>
          </div>
        </PageSection>
      </div>
    </CenteredPageLayout>
  );
}
