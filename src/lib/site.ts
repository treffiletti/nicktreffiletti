// lib/site.ts
export const SITE_URL = process.env.SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const SITE_NAME = "Nick Treffiletti — Platform Architecture & Engineering";
export const SITE_DESCRIPTION = "Deep dives into MCP servers, AI agent architecture, and platform engineering. Building the infrastructure for intelligent systems.";
export const SITE_TWITTER = "@iAmNewYorkNick"; // optional
