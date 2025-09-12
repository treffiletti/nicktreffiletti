# Agents Instructions

## Scope of Work
- All active application code lives under:
  - `/src` (preferred; or `/app`, `/components`, `/content`, `/lib` if still pre-refactor)
  - `/public`
  - Config files at repo root (`tsconfig.json`, `package.json`, `postcss.config.js`, `next.config.mjs`, ESLint/Prettier configs, etc.)

- The directory `_templates/` is **reference only**.  
  - DO NOT copy files directly from `_templates/` into the live project without explicit instruction.  
  - Use `_templates/` for design/layout/code reference and inspiration.  
  - Never import from `_templates/` in runtime code.  

## Tailwind / Build Constraints
- Tailwind v4 with **config-in-CSS** only.
- DO NOT generate or modify `tailwind.config.*`.
- DO NOT add `autoprefixer` to `postcss.config.js`.  
- `postcss.config.js` must only include:
  ```js
  module.exports = { plugins: { "@tailwindcss/postcss": {} } };
  ```

## Career Alignment
- Site is positioned as **Nick Treffiletti — Platform Architecture & Engineering Leadership**.
- Content pillars:
  1. Platform architecture & engineering  
  2. Developer experience & productivity  
  3. Engineering leadership  
  4. Career/“Now” (optional, bounded)  
- Exclude irrelevant content (random tutorials, hobbies, off-topic news).

## Do Not Overwrite
Keep the following directories and files intact unless explicitly instructed:
- `app/api/**`
- `app/rss/**`
- `app/og/**`
- `app/sitemap.ts` (or equivalent sitemap route)
- `lib/**`
- `content/**`
- `components/footer.tsx`
- Any analytics or SEO metadata already configured in `app/layout.tsx`

## Primary Goals
- Use Compass template patterns as inspiration but ensure all active code resides in `/src` (or top-level app dirs before the refactor).  
- Maintain a clean, professional structure optimized for career positioning (platform architecture thought leadership).  
- Ensure Next.js 15 + React 19 compatibility.  
- Preserve strict TypeScript settings and clean imports (`@/*` → `./src/*`).  
