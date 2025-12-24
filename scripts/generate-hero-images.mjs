#!/usr/bin/env node
import OpenAI from 'openai';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Load environment variables
dotenv.config({ path: path.join(rootDir, '.env.local') });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const posts = [
  {
    slug: 'ai-agent-architecture',
    prompt: 'A futuristic systems architecture diagram showing an AI agent at the center, surrounded by tool interfaces, memory layers, planning modules, and human feedback loops. Clean dark background, neon accent lines, minimal text, modern SaaS design style, abstract but technical, high contrast, cinematic lighting.',
  },
  {
    slug: 'internal-developer-platforms',
    prompt: 'An internal developer platform visualized as a clean highway above a complex city of infrastructure. Developers moving quickly on the top layer, abstracted complexity below. Minimalist, modern enterprise SaaS style, dark mode, subtle grid, professional and calm.',
  },
  {
    slug: 'mcp-server-patterns',
    prompt: 'A protocol hub connecting AI models to multiple external tools and services. Central MCP server with clean connection lines branching outward. Technical, precise, minimalist diagram aesthetic, dark background, glowing connection points.',
  },
  {
    slug: 'platform-engineering-ai-age',
    prompt: 'A conceptual evolution diagram showing traditional platform engineering transforming into AI-driven systems. Infrastructure blocks morphing into adaptive intelligent components. Modern enterprise illustration, dark theme, subtle gradients, forward-looking.',
  },
  {
    slug: 'why-mcp-matters',
    prompt: 'A clean technical illustration showing MCP as a standard protocol layer enabling scalable AI systems. Stacked layers with models above, tools below, MCP in the middle. Professional, minimal, dark SaaS aesthetic.',
  },
];

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function generateHeroImage(slug, prompt) {
  console.log(`\nGenerating hero image for: ${slug}`);
  console.log(`Prompt: ${prompt.substring(0, 80)}...`);

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1792x1024', // 16:9 ratio, DALL-E 3's closest to hero size
      quality: 'standard',
    });

    const imageUrl = response.data[0].url;
    const outputPath = path.join(rootDir, 'public', 'generated', 'hero', `${slug}.png`);

    console.log(`Downloading image...`);
    await downloadImage(imageUrl, outputPath);
    console.log(`✓ Saved to: ${outputPath}`);

    return `/generated/hero/${slug}.png`;
  } catch (error) {
    console.error(`✗ Failed to generate ${slug}:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('Starting hero image generation...\n');
  console.log(`Generating ${posts.length} images with DALL-E 3`);
  console.log(`Cost: ~$${(posts.length * 0.04).toFixed(2)} USD\n`);

  const results = [];

  for (const post of posts) {
    const imagePath = await generateHeroImage(post.slug, post.prompt);
    results.push({ slug: post.slug, path: imagePath });

    // Rate limiting: DALL-E 3 has limits, add small delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n✓ All images generated successfully!\n');
  console.log('Results:');
  results.forEach(r => console.log(`  ${r.slug}: ${r.path}`));
}

main().catch(console.error);
