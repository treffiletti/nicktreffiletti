# Site Cleanup Changelog — April 23, 2026

## Context

Merged cleanup of nicktreffiletti.com based on two external feedback audits.
The site was built from the Tailwind "Compass" template and still contained
placeholder content from that template — philosophical/self-help lessons and
fictional interview transcripts that have nothing to do with Nick's actual
focus (MCP, platform architecture, API governance, AI systems).

## Files Deleted

### Philosophical/self-help lesson MDX files (20 files)

These were leftover from the Compass template's original course content.
None were referenced in `src/data/lessons.ts` (the active lesson metadata),
so they were not rendered in navigation or course listings. However, they
existed as importable MDX files and could theoretically be hit via the
dynamic `[slug]` route.

Location: `src/data/lessons/`

| File | Original Topic |
|------|---------------|
| `anxiety-messages.mdx` | Philosophical take on anxiety |
| `dealing-with-coincidence.mdx` | Coincidence and meaning |
| `decision-paralysis.mdx` | Decision-making philosophy |
| `forgiving-others.mdx` | Forgiveness |
| `giving-credit.mdx` | Credit and recognition |
| `landscape-of-choice.mdx` | Free will / determinism |
| `liberation-from-regret.mdx` | Regret management |
| `maintaining-self.mdx` | Self-identity |
| `mapping-causal-factors.mdx` | Causality philosophy |
| `paradox-of-agency.mdx` | Agency and determinism |
| `path-of-least-resistance.mdx` | Path metaphors |
| `recognizing-patterns.mdx` | Pattern recognition (philosophical) |
| `reframing-achievement.mdx` | Achievement reframing |
| `reframing-uncertainty.mdx` | Uncertainty philosophy |
| `surrendering-outcome.mdx` | Outcome attachment |
| `surrendering-to-success.mdx` | Deterministic success philosophy |
| `unburden-accountability.mdx` | Accountability philosophy |
| `values-and-goals.mdx` | Values alignment |
| `widening-field-of-view.mdx` | Perspective broadening |
| `writing-autobiography.mdx` | Self-narrative |

### Fictional interview VTT transcript files (6 files)

These were placeholder interview transcripts with fictional personas,
clearly generated as template examples. The interviews data array in
`src/data/interviews.ts` was already emptied (set to `[]`) in a prior
commit, so these files were orphaned — no code referenced them.

Location: `src/data/interviews/`

| File | Fictional Persona | Description |
|------|------------------|-------------|
| `nolan-grayson.vtt` | Dr. Nolan Grayson | Quantum physicist discussing "Quantum Nirvana" book |
| `tom-harris.vtt` | Tom Harris | Podcast host, philosophical conversations |
| `sophia-reid.vtt` | Sophia Reid | "Love Cartographer", "Love Lattice" concept |
| `annie-king.vtt` | Annie King | Organized family upbringing narrative |
| `eleanor-vann.vtt` | Eleanor Vann | Travel writer, "The Path and the Passenger" book |
| `mick-larson.vtt` | Mick Larson | "The Free Will Hacker" |

## Files Modified

### `next.config.mjs`
- Added `remark-frontmatter` import and plugin to strip YAML frontmatter
  from lesson MDX files (fixes bug where `title: '...'` rendered as text)
- Removed `assets.tailwindcss.com/templates/compass/**` from image remote
  patterns (Compass template remnant)

### `package.json`
- Added `remark-frontmatter: ^5.0.0` dependency

### `pnpm-lock.yaml`
- Updated to include `remark-frontmatter` and its dependencies

### `middleware.ts`
- Removed duplicate `GATED_LESSON_SLUGS` Set
- Now imports `GATED_LESSON_SLUGS` from `src/config/content-visibility.ts`

### `src/app/(centered)/interviews/page.tsx`
- Improved stub copy from generic "coming soon" to descriptive paragraph

### `src/app/(centered)/resources/page.tsx`
- Improved stub copy from generic "coming soon" to descriptive paragraph

## Recovery

All deleted files exist in git history. To recover any file:

```bash
git checkout HEAD~1 -- src/data/lessons/<filename>.mdx
git checkout HEAD~1 -- src/data/interviews/<filename>.vtt
```

Or reference commit `cf519ae` (the last commit before this cleanup) on the
`develop` branch.
