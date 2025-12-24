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
        Engineering leader and API platform architect with 18+ years building large-scale software,
        data platforms, and financial systems for enterprises.
      </p>

      <div className="mt-16 space-y-16">
        <PageSection title={<h2>Current Role</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            API Platform Architect & Kong Transformation Lead at Prudential Financial
          </p>
          <div className="mt-8 max-w-2xl">
            <p className="text-sm/7 text-gray-600 dark:text-gray-400">
              Currently leading the migration of 2,700+ APIs from Apigee to Kong, establishing enterprise
              standards for RESTful API design, security (OAuth2/OIDC, JWT), and versioning. Building
              governance and observability tooling with Splunk and Dynatrace while integrating Microsoft
              Entra and Ping Identity for unified authentication across the enterprise.
            </p>
          </div>
        </PageSection>

        <PageSection title={<h2>Expertise</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Core technical competencies and specializations.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl">
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                API Platform & Governance
              </h3>
              <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                Enterprise API strategy, OpenAPI specs, OAuth2/OIDC, developer experience, and SDK generation
                across Java, Python, Node.js, Go, .NET, Ruby, and PHP.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                Data Engineering
              </h3>
              <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                Event-driven architecture with Kafka, data pipelines with Snowflake and Databricks,
                real-time analytics, and lakehouse architecture patterns.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                Cloud & Infrastructure
              </h3>
              <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                AWS, Azure, GCP, Kubernetes, Docker, Terraform, microservices architecture,
                and cloud-native application development.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                Financial Systems
              </h3>
              <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                Open banking, fintech platforms, regulatory compliance, secure transaction systems,
                and enterprise integration patterns.
              </p>
            </div>
          </div>
        </PageSection>

        <PageSection title={<h2>Career Highlights</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Key accomplishments across major organizations.
          </p>
          <div className="mt-8 max-w-2xl space-y-6">
            <div>
              <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                J.P. Morgan Chase – Vice President, Open Banking API Design & Strategy
              </h3>
              <p className="mt-2 text-sm/7 text-gray-600 dark:text-gray-400">
                Led enterprise API strategy for Chase's Open Banking platform, enabling billions in annual
                payments. Authored firm-wide OpenAPI specifications and reduced client onboarding time by
                150% while cutting product time to market by 50%.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                DTCC – Director of Software Engineering
              </h3>
              <p className="mt-2 text-sm/7 text-gray-600 dark:text-gray-400">
                Designed resilient architectures for global financial transaction systems, introducing
                Kafka-based event-streaming and leading cloud migration initiatives to AWS and GCP.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                NYS of Health – Engineering Manager (UI/UX)
              </h3>
              <p className="mt-2 text-sm/7 text-gray-600 dark:text-gray-400">
                Designed UX and led front-end engineering for New York's Obamacare platform. Scaled to 2M
                users in 6 months and has served over 5 million New Yorkers with essential healthcare.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                ReachSocial.io – Co-Founder & CTO
              </h3>
              <p className="mt-2 text-sm/7 text-gray-600 dark:text-gray-400">
                Co-founded and built a full-stack social engagement platform using MERN stack, Docker,
                and Azure. Integrated OpenAI, Google, and Instagram APIs to drive user growth.
              </p>
            </div>
          </div>
        </PageSection>

        <PageSection title={<h2>Background</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            The journey from public policy to engineering leadership.
          </p>
          <div className="mt-8 max-w-2xl">
            <p className="text-sm/7 text-gray-600 dark:text-gray-400">
              My career has been defined by building platforms that serve millions while maintaining the
              highest standards of security and reliability. From leading the Open Banking initiative at
              JP Morgan Chase to architecting global financial transaction systems at DTCC, I've focused
              on creating developer-first experiences that scale.
            </p>
            <p className="mt-4 text-sm/7 text-gray-600 dark:text-gray-400">
              What drives me is the intersection of technical excellence and business impact—whether that's
              enabling billions in payments, serving millions of healthcare users, or building the next
              generation of AI-powered platforms. I've led teams at Marsh McLennan, ByTandym, Disney/ABC News,
              and Williams Sonoma, always with a focus on empowering developers and delivering measurable results.
            </p>
            <p className="mt-4 text-sm/7 text-gray-600 dark:text-gray-400">
              I hold a degree in Public Affairs & Policy from Syracuse University's Maxwell School, which
              continues to inform how I think about technology's role in society and the importance of
              building systems that serve the public good.
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
                  Leading enterprise API platform transformation at Prudential Financial
                </span>
              </li>
              <li className="flex gap-x-3">
                <span className="flex-none text-gray-950 dark:text-white">•</span>
                <span>
                  Building comprehensive educational content on MCP server development and AI agent architecture
                </span>
              </li>
              <li className="flex gap-x-3">
                <span className="flex-none text-gray-950 dark:text-white">•</span>
                <span>
                  Exploring how Model Context Protocol will reshape enterprise integration and developer platforms
                </span>
              </li>
              <li className="flex gap-x-3">
                <span className="flex-none text-gray-950 dark:text-white">•</span>
                <span>
                  Advising startups on API strategy, cloud architecture, and platform engineering best practices
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
              href="https://x.com/iamnewyorknick"
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
