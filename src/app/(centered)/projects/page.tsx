import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { PageSection } from "@/components/page-section";
import { GitHubRepos } from "@/components/github-repos";
import { getGitHubRepos } from "@/lib/github";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Nick Treffiletti",
  description:
    "Open source MCP servers, developer tools, and platform engineering projects.",
};

type Project = {
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
};

const projects: Project[] = [
  {
    name: "mcp-server-template",
    description:
      "A production-ready MCP server boilerplate with TypeScript, comprehensive error handling, observability hooks, and testing infrastructure. Includes examples for tools, resources, and prompts.",
    techStack: ["TypeScript", "MCP SDK", "Zod", "Vitest"],
    githubUrl: "https://github.com/treffiletti/mcp-server-template",
  },
  {
    name: "platform-cli",
    description:
      "CLI tool for developer platform operations including service catalog management, environment provisioning, and golden path scaffolding. Integrates with Backstage and Kubernetes.",
    techStack: ["Go", "Cobra", "Kubernetes", "Backstage"],
    githubUrl: "https://github.com/treffiletti/platform-cli",
  },
  {
    name: "agent-orchestrator",
    description:
      "Multi-agent coordination framework supporting supervisor, peer-to-peer, and hierarchical orchestration patterns. Built for complex AI workflows with MCP tool integration.",
    techStack: ["Python", "LangGraph", "MCP", "FastAPI"],
    githubUrl: "https://github.com/treffiletti/agent-orchestrator",
  },
  {
    name: "api-governance-toolkit",
    description:
      "Automated API governance and compliance checking toolkit. Validates OpenAPI specs against enterprise standards, generates SDK clients, and provides policy-as-code enforcement.",
    techStack: ["TypeScript", "OpenAPI", "OPA", "Node.js"],
    githubUrl: "https://github.com/treffiletti/api-governance-toolkit",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-950 dark:text-white">
          {project.name}
        </h3>
        <div className="flex gap-x-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
            >
              GitHub →
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
            >
              Demo →
            </a>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm/6 text-gray-600 dark:text-gray-400">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function Page() {
  const repos = await getGitHubRepos('treffiletti', { perPage: 6 });

  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Projects</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Projects
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-600 dark:text-gray-400">
        Open source tools, MCP servers, and architecture work focused on platform engineering
        and AI agent infrastructure.
      </p>

      <div className="mt-16">
        <PageSection title={<h2>Featured Projects</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Production-ready tools and frameworks for MCP development and platform engineering.
          </p>
          <div className="mt-8 space-y-6 max-w-3xl">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </PageSection>

        <PageSection title={<h2>Recent Repositories</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Live from GitHub - my latest public repositories and open source work.
          </p>
          <div className="mt-8">
            <GitHubRepos repos={repos} />
          </div>
          <div className="mt-8">
            <a
              href="https://github.com/treffiletti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
            >
              View all on GitHub →
            </a>
          </div>
        </PageSection>
      </div>
    </CenteredPageLayout>
  );
}
