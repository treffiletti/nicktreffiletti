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
    "Conference talks, podcasts, and presentations on MCP, AI agents, and platform engineering.",
};

type Talk = {
  title: string;
  event: string;
  date: string;
  videoUrl?: string;
  slidesUrl?: string;
  description: string;
};

type Podcast = {
  title: string;
  show: string;
  date: string;
  url?: string;
  description: string;
};

const pastTalks: Talk[] = [
  {
    title: "Building Production MCP Servers: Lessons from the Field",
    event: "AI Engineering Summit 2024",
    date: "November 2024",
    description:
      "A deep dive into production patterns for MCP server development, covering error handling, observability, testing strategies, and deployment approaches used in enterprise environments.",
  },
  {
    title: "Platform Engineering Meets AI: The New Developer Experience",
    event: "PlatformCon 2024",
    date: "September 2024",
    description:
      "Exploring how AI agents are reshaping internal developer platforms, introducing new integration patterns through MCP, and creating agent-first golden paths.",
  },
  {
    title: "From API Gateway to AI Gateway: Evolution of Integration Patterns",
    event: "API World Conference",
    date: "June 2024",
    description:
      "Tracing the evolution from traditional API gateways to AI-powered integration layers, covering OAuth2, MCP, and the future of intelligent routing and orchestration.",
  },
];

const podcasts: Podcast[] = [
  {
    title: "The MCP Revolution: Standardizing AI Tool Integration",
    show: "The Changelog",
    date: "December 2024",
    description:
      "Discussing the rise of Model Context Protocol, its impact on the AI ecosystem, and why standardization matters for building reliable AI systems.",
  },
  {
    title: "Platform Engineering at Scale: Building for Billions in Transactions",
    show: "Software Engineering Daily",
    date: "October 2024",
    description:
      "Sharing experiences from leading API platform transformations at financial services companies, managing thousands of APIs, and ensuring reliability at scale.",
  },
];

const upcomingEvents: Talk[] = [
  {
    title: "MCP Server Architecture Workshop",
    event: "AI Developer Conference 2025",
    date: "March 2025",
    description:
      "Hands-on workshop covering MCP server implementation from scratch, including tool design, resource providers, and production deployment patterns.",
  },
];

function TalkCard({ talk }: { talk: Talk }) {
  return (
    <div className="border-b border-gray-200 pb-6 last:border-0 dark:border-gray-800">
      <div className="flex flex-col gap-y-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-950 dark:text-white">
            {talk.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {talk.event} • {talk.date}
          </p>
          <p className="mt-3 text-sm/6 text-gray-600 dark:text-gray-400">
            {talk.description}
          </p>
        </div>
        <div className="flex gap-x-3 sm:flex-col sm:items-end sm:gap-y-2">
          {talk.videoUrl && (
            <a
              href={talk.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-950 hover:text-gray-600 dark:text-white dark:hover:text-gray-400"
            >
              Watch →
            </a>
          )}
          {talk.slidesUrl && (
            <a
              href={talk.slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-950 hover:text-gray-600 dark:text-white dark:hover:text-gray-400"
            >
              Slides →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <div className="border-b border-gray-200 pb-6 last:border-0 dark:border-gray-800">
      <div className="flex flex-col gap-y-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-950 dark:text-white">
            {podcast.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {podcast.show} • {podcast.date}
          </p>
          <p className="mt-3 text-sm/6 text-gray-600 dark:text-gray-400">
            {podcast.description}
          </p>
        </div>
        {podcast.url && (
          <a
            href={podcast.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-950 hover:text-gray-600 dark:text-white dark:hover:text-gray-400"
          >
            Listen →
          </a>
        )}
      </div>
    </div>
  );
}

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
        Conference talks, podcasts, and presentations on MCP server development, AI agent
        architecture, and platform engineering best practices.
      </p>

      <div className="mt-16 space-y-16">
        <PageSection title={<h2>Upcoming Events</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Where you can find me speaking next.
          </p>
          <div className="mt-8 max-w-2xl space-y-6">
            {upcomingEvents.map((talk, index) => (
              <TalkCard key={index} talk={talk} />
            ))}
          </div>
        </PageSection>

        <PageSection title={<h2>Past Talks</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Previous conference presentations and technical talks.
          </p>
          <div className="mt-8 max-w-2xl space-y-6">
            {pastTalks.map((talk, index) => (
              <TalkCard key={index} talk={talk} />
            ))}
          </div>
        </PageSection>

        <PageSection title={<h2>Podcasts</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Podcast appearances discussing AI, MCP, and platform engineering.
          </p>
          <div className="mt-8 max-w-2xl space-y-6">
            {podcasts.map((podcast, index) => (
              <PodcastCard key={index} podcast={podcast} />
            ))}
          </div>
        </PageSection>

        <PageSection title={<h2>Speaking Inquiries</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Interested in having me speak at your event?
          </p>
          <div className="mt-8 max-w-2xl">
            <p className="text-sm/7 text-gray-600 dark:text-gray-400">
              I speak on topics including Model Context Protocol (MCP) server development,
              AI agent architecture patterns, platform engineering best practices, API governance,
              and enterprise AI integration. Available for keynotes, technical deep dives,
              workshops, and panel discussions.
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
