# Greek Learning App

React Router 7 app on Cloudflare Workers with Turso (libsql) database.

## Critical Rules

**Makefile first.** Check the Makefile before running any command.

**Database via Makefile only.** Direct `pnpm` commands skip `.env` and hit local instead of Turso.

```bash
# Local (Docker libsql on port 8080)
make db-push          # Push schema
make db-seed          # Seed data
make db-setup         # Push + seed
make db-studio        # Drizzle Studio

# Production (Turso)
make prod-db-push
make prod-db-seed
make prod-db-setup
make prod-db-studio
```

**Git operations:**

- Use `git mv` to rename/move files (preserves history)
- Use `git rm` to delete (only after task verified complete)
- Never commit without explicit user approval

**Linting after tasks:**

```bash
pnpm lint:fix && pnpm lint:unused && pnpm lint:types && pnpm lint:dupes
```

## Code Style

- Self-documenting code; comments only for non-obvious logic
- Queen's English (colour, favourite)
- No hardcoded names in the codebase
- Derive route types from loader: `Route.ComponentProps["loaderData"]`

## Architecture

```
src/components/*.tsx      # Custom components (tailwind-variants)
src/components/ui/*.tsx   # ShadCN (use CLI: pnpm dlx shadcn@latest add X)
src/routes/               # React Router 7 routes
src/db.server/            # Drizzle schema and queries
```

**Path alias:** `@/` → `./src/`

**Data access:** Import query functions from `@/db.server/queries/*`:

```typescript
import { getVocabBySection } from "@/db.server/queries/vocabulary";
```

**Route types:** If type errors after changing loaders, run `pnpm react-router typegen`.

## Routes

**Default to page routes** (loader + action + component). Use `<Form>` and `useFetcher`.

**Resource routes** (no component) only for: webhooks, polling endpoints, background jobs.

## Deployment

```bash
make deploy       # Build and deploy to Cloudflare Workers
make deploy-dry   # Dry run
make logs         # Tail worker logs
```

## LLM Context Files

`.llm` files are structured documentation for LLM consumption (not rendered).

| File                                         | Purpose                               |
| -------------------------------------------- | ------------------------------------- |
| `docs/user-flows.llm`                        | Route map, user journeys, data tables |
| `src/routes/reference/tabs/*.content.llm`    | Grammar topics                        |
| `src/routes/learn/phrases/content.llm`       | Phrase tabs                           |
| `src/routes/learn/conversations/content.llm` | Conversation tabs                     |
| `src/routes/learn/essentials/content.llm`    | Essentials subtabs                    |

Read `docs/user-flows.llm` first when understanding app structure.

## Educational Design Principles

**Greek first.** Present Greek prominently; English is context.

**Show structure.** Paradigm tables reveal patterns:

```
┌─────────┬───────────┬───────────┐
│         │ Singular  │ Plural    │
├─────────┼───────────┼───────────┤
│ 1st     │ με (me)   │ μας (us)  │
│ 2nd     │ σε (you)  │ σας (you) │
│ 3rd m   │ τον (him) │ τους      │
│ 3rd f   │ την (her) │ τις       │
│ 3rd n   │ το (it)   │ τα        │
└─────────┴───────────┴───────────┘
```

Not flat grids that hide relationships.

**Avoid redundancy.** If two columns show the same info, remove one.

**Examples show usage.** Context, not definitions:

```
GOOD: μου = my → το σπίτι μου (my house)
BAD:  μου = my → Example: my
```

## Design Context

### Users

**Primary (now):** Mike Murray — an intermediate Greek learner using the app between weekly Preply tutoring sessions. He knows the grammar rules declaratively but needs to build procedural fluency: applying them at speed without conscious effort.

**Future:** Public learners at the same stage — 1+ year in, conversational aspiration, stuck in the knowing-but-not-producing gap. Used during daytime study sessions; reading density is high, cognitive load management matters.

**Job to be done:** Drill Greek grammar and vocabulary until responses become automatic. The interface should feel like practice, not like an app.

### Brand Personality

**Three words:** Scholarly · warm · honest

Like a well-worn study guide — serious about what it teaches, never intimidating, completely free of gamification theatre. The λ (lambda) mark anchors the identity: spare, precise, unmistakably Greek.

### Aesthetic Direction

**Primary theme:** Light — cream backgrounds for extended reading sessions. Mediterranean palette (terracotta, olive, ocean, honey) is intentional; lean into it.

**Visual tone:** Editorial reference materials — the kind of printed study guide typeset at a university press. Not a digital product trying to look premium.

**Anti-references:** Duolingo (gamified, cartoon), generic SaaS dashboards (cards everywhere, hero metrics, gradients), "learning app" defaults (emoji as UX, streaks as manipulation).

**What makes it memorable:** The colour system encodes grammar. Nominative = ocean. Accusative = terracotta. Genitive = olive. Users feel the cases before they read the labels.

### Design Principles

1. **Greek is the hero.** Greek characters should be prominent and beautifully rendered. English is gloss — smaller, quieter, subordinate.
2. **Structure is pedagogy.** Paradigm tables are the primary teaching surface. Lay them out with typographic precision; the table _is_ the lesson.
3. **Warmth without whimsy.** Scholarly rigour doesn't mean clinical. Colour and voice should feel like a trusted teacher, never a children's app.
4. **Honest feedback.** Correct is correct. Incorrect is incorrect. No artificial euphoria, no punishing reds. Just honest, immediate signal.
5. **Light earns its space.** Whitespace separates concepts. Every element on screen should justify its presence by helping the learner focus.

## PWA Layout

Fixed shell with scrolling inside `.app-main`:

```tsx
<div className="app-shell">
	<main className="app-main">{/* scrollable */}</main>
	<nav className="fixed bottom-0">{/* mobile nav */}</nav>
</div>
```

CSS classes (in `src/index.css`):

- `.app-shell` - fixed, inset-0, overflow hidden
- `.app-main` - flex-1, overflow-y auto (scroll container)
- `.safe-area-pb` - padding for mobile safe area

<!-- rtk-instructions v2 -->

# RTK (Rust Token Killer) - Token-Optimized Commands

## Golden Rule

**Always prefix commands with `rtk`**. If RTK has a dedicated filter, it uses it. If not, it passes through unchanged. This means RTK is always safe to use.

**Important**: Even in command chains with `&&`, use `rtk`:

```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

## RTK Commands by Workflow

### Build & Compile (80-90% savings)

```bash
rtk cargo build         # Cargo build output
rtk cargo check         # Cargo check output
rtk cargo clippy        # Clippy warnings grouped by file (80%)
rtk tsc                 # TypeScript errors grouped by file/code (83%)
rtk lint                # ESLint/Biome violations grouped (84%)
rtk prettier --check    # Files needing format only (70%)
rtk next build          # Next.js build with route metrics (87%)
```

### Test (90-99% savings)

```bash
rtk cargo test          # Cargo test failures only (90%)
rtk vitest run          # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk test <cmd>          # Generic test wrapper - failures only
```

### Git (59-80% savings)

```bash
rtk git status          # Compact status
rtk git log             # Compact log (works with all git flags)
rtk git diff            # Compact diff (80%)
rtk git show            # Compact show (80%)
rtk git add             # Ultra-compact confirmations (59%)
rtk git commit          # Ultra-compact confirmations (59%)
rtk git push            # Ultra-compact confirmations
rtk git pull            # Ultra-compact confirmations
rtk git branch          # Compact branch list
rtk git fetch           # Compact fetch
rtk git stash           # Compact stash
rtk git worktree        # Compact worktree
```

Note: Git passthrough works for ALL subcommands, even those not explicitly listed.

### GitHub (26-87% savings)

```bash
rtk gh pr view <num>    # Compact PR view (87%)
rtk gh pr checks        # Compact PR checks (79%)
rtk gh run list         # Compact workflow runs (82%)
rtk gh issue list       # Compact issue list (80%)
rtk gh api              # Compact API responses (26%)
```

### JavaScript/TypeScript Tooling (70-90% savings)

```bash
rtk pnpm list           # Compact dependency tree (70%)
rtk pnpm outdated       # Compact outdated packages (80%)
rtk pnpm install        # Compact install output (90%)
rtk npm run <script>    # Compact npm script output
rtk npx <cmd>           # Compact npx command output
rtk prisma              # Prisma without ASCII art (88%)
```

### Files & Search (60-75% savings)

```bash
rtk ls <path>           # Tree format, compact (65%)
rtk read <file>         # Code reading with filtering (60%)
rtk grep <pattern>      # Search grouped by file (75%)
rtk find <pattern>      # Find grouped by directory (70%)
```

### Analysis & Debug (70-90% savings)

```bash
rtk err <cmd>           # Filter errors only from any command
rtk log <file>          # Deduplicated logs with counts
rtk json <file>         # JSON structure without values
rtk deps                # Dependency overview
rtk env                 # Environment variables compact
rtk summary <cmd>       # Smart summary of command output
rtk diff                # Ultra-compact diffs
```

### Infrastructure (85% savings)

```bash
rtk docker ps           # Compact container list
rtk docker images       # Compact image list
rtk docker logs <c>     # Deduplicated logs
rtk kubectl get         # Compact resource list
rtk kubectl logs        # Deduplicated pod logs
```

### Network (65-70% savings)

```bash
rtk curl <url>          # Compact HTTP responses (70%)
rtk wget <url>          # Compact download output (65%)
```

### Meta Commands

```bash
rtk gain                # View token savings statistics
rtk gain --history      # View command history with savings
rtk discover            # Analyze Claude Code sessions for missed RTK usage
rtk proxy <cmd>         # Run command without filtering (for debugging)
rtk init                # Add RTK instructions to CLAUDE.md
rtk init --global       # Add RTK to ~/.claude/CLAUDE.md
```

## Token Savings Overview

| Category         | Commands                       | Typical Savings |
| ---------------- | ------------------------------ | --------------- |
| Tests            | vitest, playwright, cargo test | 90-99%          |
| Build            | next, tsc, lint, prettier      | 70-87%          |
| Git              | status, log, diff, add, commit | 59-80%          |
| GitHub           | gh pr, gh run, gh issue        | 26-87%          |
| Package Managers | pnpm, npm, npx                 | 70-90%          |
| Files            | ls, read, grep, find           | 60-75%          |
| Infrastructure   | docker, kubectl                | 85%             |
| Network          | curl, wget                     | 65-70%          |

Overall average: **60-90% token reduction** on common development operations.

<!-- /rtk-instructions -->
