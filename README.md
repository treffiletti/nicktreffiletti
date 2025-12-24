# nicktreffiletti.com

Personal website and blog focused on MCP servers, AI agent architecture, and platform engineering.

## Tech Stack

- **Framework**: [Next.js 15.5.9](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4.x](https://tailwindcss.com/)
- **Content**: MDX for blog posts
- **Deployment**: Vercel
- **Package Manager**: pnpm

## Features

### Blog System
- MDX-based blog with frontmatter metadata
- Custom hero images generated with DALL-E 3
- Mermaid diagrams for technical visualizations
- Dynamic OG images via `next/og` (zero storage cost)
- RSS feed with image enclosures
- Syntax highlighting with Shiki

### Pages
- **Home**: Overview and introduction
- **About**: Professional background and expertise
- **Projects**: Portfolio of open-source work
- **Speaking**: Conference talks and podcast appearances
- **Services**: Consulting offerings
- **Blog**: Technical articles on MCP, AI agents, platform engineering
- **Interviews**: Video content and discussions
- **Resources**: Curated podcasts and learning materials

### Integrations
- **Newsletter**: Beehiiv integration
- **Analytics**: GoatCounter (privacy-focused)
- **Search Console**: Google Search Console integration
- **Performance**: Vercel Analytics & Speed Insights

## Getting Started

### Prerequisites

- Node.js 18+ (recommend using [nvm](https://github.com/nvm-sh/nvm))
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/treffiletti/nicktreffiletti.git
cd nicktreffiletti.com

# Install dependencies
pnpm install

# Copy environment variables
cp .env.local.example .env.local
# Edit .env.local with your keys

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Environment Variables

Create a `.env.local` file with:

```bash
# Newsletter (Beehiiv)
BEEHIIV_PUBLICATION_ID=your_pub_id
BEEHIIV_API_KEY=your_api_key
NEWSLETTER_PLATFORM=beehiiv

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# SITE_URL=https://www.nicktreffiletti.com

# Google Search Console (optional)
GSC_CLIENT_ID=your_client_id
GSC_CLIENT_SECRET=your_client_secret
GSC_REFRESH_TOKEN=your_refresh_token

# Admin access (optional)
ADMIN_TOKEN=your_random_token

# OpenAI (for hero image generation)
OPENAI_API_KEY=your_openai_key
```

## Available Scripts

### Development
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm typecheck    # Run TypeScript compiler check
```

### Content Generation
```bash
node scripts/generate-hero-images.mjs  # Generate hero images with DALL-E 3
```

## Project Structure

```
.
├── __docs/              # Documentation and planning
├── public/
│   ├── generated/       # Generated assets (hero images, etc.)
│   └── images/          # Static images
├── scripts/             # Utility scripts
│   └── generate-hero-images.mjs
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── (centered)/  # Centered layout pages
│   │   ├── (sidebar)/   # Sidebar layout pages (course)
│   │   ├── api/         # API routes
│   │   │   ├── og/      # Open Graph image generation
│   │   │   └── subscribe/
│   │   └── rss/         # RSS feed generation
│   ├── components/      # React components
│   ├── content/         # MDX content
│   │   └── blog/        # Blog posts
│   └── lib/             # Utility functions
├── next.config.mjs      # Next.js configuration
├── tailwind.config.ts   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Blog Post Format

Blog posts are MDX files in `src/content/blog/`:

```mdx
---
title: 'Your Post Title'
publishedAt: '2024-12-24'
summary: 'A brief description of your post'
image: '/generated/hero/your-post-slug.png'
---

Your content here...

### Mermaid Diagrams

\`\`\`mermaid
graph TD
  A --> B
\`\`\`
```

## Image Generation

### Hero Images
Custom hero images are generated using DALL-E 3:

```bash
node scripts/generate-hero-images.mjs
```

Images are saved to `public/generated/hero/` and cost ~$0.04 per image.

### OG Images
Open Graph images are generated dynamically via `/api/og/blog/[slug]` using `next/og`. No storage needed.

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel
Add all `.env.local` variables to your Vercel project settings.

## Contributing

This is a personal website, but issues and suggestions are welcome!

## License

© 2024 Nick Treffiletti. All rights reserved.

---

Built with [Next.js](https://nextjs.org/) • Deployed on [Vercel](https://vercel.com/)
