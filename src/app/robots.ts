import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/wip-access",
          "/login",
          "/otp",
          "/interviews",
          "/resources",
          // Lesson pages
          "/what-is-mcp",
          "/mcp-architecture",
          "/transport-layers",
          "/tools-resources-prompts",
          "/server-setup-typescript",
          "/server-setup-python",
          "/implementing-tools",
          "/resource-providers",
          "/security-basics",
          "/error-handling",
          "/observability-tracing",
          "/testing-strategies",
          "/deployment-options",
          "/multi-server-orchestration",
          "/custom-transports",
          "/enterprise-integration",
          "/future-of-mcp",
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.nicktreffiletti.com"}/sitemap.xml`,
  };
}
