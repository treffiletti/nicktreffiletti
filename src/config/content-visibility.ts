/**
 * Central content visibility configuration for nicktreffiletti.com
 * Controls which routes are public, gated, or stub-only.
 * Used by: navbar, footer, middleware, sitemap, robots
 */

export type RouteStatus = 'public' | 'gated' | 'stub';

export const ROUTE_CONFIG: Record<string, { status: RouteStatus; label: string; navGroup?: 'primary' | 'secondary' | 'hidden' }> = {
  '/':             { status: 'public',  label: 'Course',    navGroup: 'primary'   },
  '/about':        { status: 'public',  label: 'About',     navGroup: 'primary'   },
  '/blog':         { status: 'public',  label: 'Blog',      navGroup: 'primary'   },
  '/services':     { status: 'public',  label: 'Services',  navGroup: 'secondary' },
  '/projects':     { status: 'public',  label: 'Projects',  navGroup: 'secondary' },
  '/speaking':     { status: 'public',  label: 'Speaking',  navGroup: 'secondary' },
  '/interviews':   { status: 'stub',    label: 'Interviews',navGroup: 'hidden'    },
  '/resources':    { status: 'stub',    label: 'Resources', navGroup: 'hidden'    },
};

/** Lesson slugs that are gated behind WIP password */
export const GATED_LESSON_SLUGS = [
  'what-is-mcp', 'mcp-architecture', 'transport-layers', 'tools-resources-prompts',
  'server-setup-typescript', 'server-setup-python', 'implementing-tools', 'resource-providers',
  'security-basics', 'error-handling', 'observability-tracing', 'testing-strategies',
  'deployment-options', 'multi-server-orchestration', 'custom-transports',
  'enterprise-integration', 'future-of-mcp',
] as const;

/** Routes excluded from sitemap and search indexing */
export const NOINDEX_ROUTES = ['/login', '/otp', '/wip-access'];

export const PUBLIC_ROUTES = Object.entries(ROUTE_CONFIG)
  .filter(([, v]) => v.status === 'public')
  .map(([k]) => k);
