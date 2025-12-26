export type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  video: {
    thumbnail: string;
    duration: number;
    url: string;
  } | null;
};

export function getModules(): Module[] {
  return lessons;
}

export async function getLesson(
  slug: string,
): Promise<(Lesson & { module: Module; next: Lesson | null }) | null> {
  let module = lessons.find(({ lessons }) =>
    lessons.some(({ id }) => id === slug),
  );

  if (!module) {
    return null;
  }

  let index = module.lessons.findIndex(({ id }) => id === slug);

  return {
    ...module.lessons[index],
    module,
    next: index < module.lessons.length - 1 ? module.lessons[index + 1] : null,
  };
}

export async function getLessonContent(slug: string) {
  return (await import(`@/data/lessons/${slug}.mdx`)).default;
}

const lessons = [
  {
    id: "mcp-fundamentals",
    title: "MCP Fundamentals",
    description:
      "Learn the core concepts of Model Context Protocol and how it enables AI agents to connect with tools and data.",
    lessons: [
      {
        id: "what-is-mcp",
        title: "What is Model Context Protocol?",
        description:
          "Understanding MCP and why it matters for AI development.",
        video: null,
      },
      {
        id: "mcp-architecture",
        title: "MCP Architecture Overview",
        description:
          "The components and communication patterns of MCP systems.",
        video: null,
      },
      {
        id: "transport-layers",
        title: "Transport Layers: stdio, SSE, and HTTP",
        description:
          "Understanding the different ways MCP servers communicate.",
        video: null,
      },
      {
        id: "tools-resources-prompts",
        title: "Tools, Resources, and Prompts",
        description:
          "The three core primitives of MCP servers.",
        video: null,
      },
    ],
  },
  {
    id: "building-mcp-servers",
    title: "Building MCP Servers",
    description:
      "Hands-on tutorials for building production-ready MCP servers in TypeScript and Python.",
    lessons: [
      {
        id: "server-setup-typescript",
        title: "Server Setup with TypeScript",
        description:
          "Building your first MCP server with the TypeScript SDK.",
        video: null,
      },
      {
        id: "server-setup-python",
        title: "Server Setup with Python",
        description:
          "Building MCP servers with the Python SDK.",
        video: null,
      },
      {
        id: "implementing-tools",
        title: "Implementing Tools Deep Dive",
        description:
          "Creating powerful, well-designed MCP tools.",
        video: null,
      },
      {
        id: "resource-providers",
        title: "Building Resource Providers",
        description:
          "Exposing data and content through MCP resources.",
        video: null,
      },
      {
        id: "security-basics",
        title: "Security Considerations",
        description:
          "Securing your MCP servers and protecting sensitive operations.",
        video: null,
      },
    ],
  },
  {
    id: "production-patterns",
    title: "Production Patterns",
    description:
      "Battle-tested patterns for building reliable, observable, and maintainable MCP servers.",
    lessons: [
      {
        id: "error-handling",
        title: "Error Handling and Retry Logic",
        description:
          "Building resilient MCP servers that handle failures gracefully.",
        video: null,
      },
      {
        id: "observability-tracing",
        title: "Observability and Tracing",
        description:
          "Monitoring and debugging MCP servers in production.",
        video: null,
      },
      {
        id: "testing-strategies",
        title: "Testing MCP Servers",
        description:
          "Unit testing, integration testing, and end-to-end testing strategies.",
        video: null,
      },
      {
        id: "deployment-options",
        title: "Deployment Strategies",
        description:
          "Options for deploying MCP servers from local to cloud.",
        video: null,
      },
    ],
  },
  {
    id: "advanced-topics",
    title: "Advanced Topics",
    description:
      "Advanced patterns for multi-server orchestration, custom transports, and enterprise integration.",
    lessons: [
      {
        id: "multi-server-orchestration",
        title: "Multi-Server Orchestration",
        description:
          "Coordinating multiple MCP servers for complex workflows.",
        video: null,
      },
      {
        id: "custom-transports",
        title: "Building Custom Transports",
        description:
          "Extending MCP with custom transport implementations.",
        video: null,
      },
      {
        id: "enterprise-integration",
        title: "Enterprise Integration Patterns",
        description:
          "Integrating MCP servers into enterprise environments.",
        video: null,
      },
      {
        id: "future-of-mcp",
        title: "The Future of MCP",
        description:
          "Where MCP is headed and how to stay ahead.",
        video: null,
      },
    ],
  },
];
