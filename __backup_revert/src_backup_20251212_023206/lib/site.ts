// lib/site.ts
export const SITE_URL = process.env.SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const SITE_NAME = "Nick Treffiletti — Platform Architecture & Engineering";
export const SITE_DESCRIPTION = "Opinionated essays on platform architecture, developer platforms, and cloud-native ops.";
export const SITE_TWITTER = "@nicktreffiletti"; // optional
