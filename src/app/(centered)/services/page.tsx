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
  title: "Services - Nick Treffiletti",
  description:
    "Consulting services for MCP server development, platform engineering, and AI architecture.",
};

type Service = {
  title: string;
  description: string;
  whatsIncluded: string[];
};

const services: Service[] = [
  {
    title: "MCP Server Development",
    description:
      "Custom Model Context Protocol server implementation tailored to your specific use case. From initial architecture design to production deployment, I'll help you build reliable, maintainable MCP servers that integrate seamlessly with AI agents.",
    whatsIncluded: [
      "MCP server architecture design and planning",
      "Tool, resource, and prompt implementation",
      "Error handling and retry logic patterns",
      "Testing strategy and test suite development",
      "Production deployment configuration",
      "Documentation and handoff to your team",
    ],
  },
  {
    title: "Platform Engineering Consulting",
    description:
      "Strategic guidance on building internal developer platforms that developers actually want to use. Drawing from experience transforming API platforms at Fortune 500 companies, I help design self-service infrastructure, golden paths, and developer portals.",
    whatsIncluded: [
      "Platform strategy and roadmap development",
      "Developer experience assessment and recommendations",
      "Platform capabilities design (service catalogs, templates, provisioning)",
      "Backstage or custom IDP implementation guidance",
      "Platform metrics and KPI definition",
      "Team structure and operating model recommendations",
    ],
  },
  {
    title: "AI Architecture Advisory",
    description:
      "Expert guidance on AI agent system design, from single-agent tool integration to complex multi-agent orchestration. I help teams navigate the MCP ecosystem, choose the right patterns, and build systems that scale.",
    whatsIncluded: [
      "AI agent architecture review and recommendations",
      "MCP integration strategy and implementation planning",
      "Multi-agent orchestration pattern selection",
      "Tool calling optimization and best practices",
      "Observability and monitoring strategy for AI systems",
      "Security and compliance considerations for AI workflows",
    ],
  },
  {
    title: "Training & Workshops",
    description:
      "Hands-on training sessions for your engineering teams on MCP development, platform engineering practices, and AI agent architecture. Customized to your team's experience level and specific needs.",
    whatsIncluded: [
      "Customized curriculum based on your team's needs",
      "Interactive workshops with real-world exercises",
      "Code-along sessions building actual MCP servers",
      "Architecture decision workshop for your use cases",
      "Best practices from production implementations",
      "Post-workshop support and Q&A sessions",
    ],
  },
];

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h3 className="text-xl font-semibold text-gray-950 dark:text-white">
        {service.title}
      </h3>
      <p className="mt-3 text-sm/6 text-gray-600 dark:text-gray-400">
        {service.description}
      </p>
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-950 dark:text-white">
          What's included:
        </h4>
        <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {service.whatsIncluded.map((item, index) => (
            <li key={index} className="flex gap-x-3">
              <span className="flex-none text-gray-950 dark:text-white">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
          <Breadcrumb>Services</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Services
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-600 dark:text-gray-400">
        Consulting and advisory services for teams building AI-powered systems, developer platforms,
        and MCP-based integrations.
      </p>

      <div className="mt-16 space-y-16">
        <PageSection title={<h2>Offerings</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Specialized consulting services tailored to your needs.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 max-w-3xl lg:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </PageSection>

        <PageSection title={<h2>Who I Work With</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Organizations and teams I typically engage with.
          </p>
          <div className="mt-8 max-w-2xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                  Engineering Teams Adopting MCP
                </h3>
                <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                  Teams building AI-powered products who want to integrate MCP servers but need
                  guidance on architecture, patterns, and production readiness. I help you avoid
                  common pitfalls and accelerate time to production.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                  Platform Engineering Organizations
                </h3>
                <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                  Companies building or transforming internal developer platforms. Whether you're
                  migrating from legacy systems, adopting Backstage, or designing greenfield
                  platforms, I bring experience from enterprise-scale transformations.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                  Startups Building AI Infrastructure
                </h3>
                <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                  Startups creating AI agent platforms, developer tools, or infrastructure products.
                  I help with architectural decisions, MCP integration strategy, and go-to-market
                  positioning.
                </p>
              </div>
            </div>
          </div>
        </PageSection>

        <PageSection title={<h2>Let's Talk</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Ready to discuss your project?
          </p>
          <div className="mt-8 max-w-2xl">
            <p className="text-sm/7 text-gray-600 dark:text-gray-400">
              Whether you're just starting to explore MCP, planning a platform engineering
              initiative, or need architecture guidance for your AI systems, I'd love to discuss
              how I can help. Reach out via LinkedIn or X to start the conversation.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-6">
              <a
                href="https://linkedin.com/in/nicktreffiletti"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Connect on LinkedIn
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
