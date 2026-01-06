Code should be self-documenting as _MUCH_ as possible. Comments should _only_ be used to explain complex or non-obvious logic. Comments narrating code are punished harshly.

NO BARREL FILES, THEY'RE A POOR, OUTDATED PRACTICE. ONLY USE index.ts EXPORTS CLEANLY EXPORTING MODULES.

In route files, derive types from loader data via `Route.ComponentProps["loaderData"]` rather than manually defining them. This keeps types in sync with what the loader actually returns.

ALWAYS check the makefile before running ANY command.

Prefer git mv over recreating files

ONLY attempt to run rm or git rm once all other tasks have been completed and verified

Once you've completed a task, ask if you can lint with

pnpm lint:fix
pnpm lint:unused
pnpm lint:types
pnpm lint:dupes

NEVER commit without explicit user approval. Always ask first and wait for confirmation before running any git commit commands.

ALWAYS ALWAYS ALWAYS DO MIGRATIONS VIA DRIZZLE USING THE MAKEFILE COMMANDS!!!

We should NOT be hardcoding names like Mike or Chrys anywhere in the codebase.


# Alcove

Couples intimacy exploration app with single-blind kink matching.

## Quick Reference

| Need               | Location                                                          |
| ------------------ | ----------------------------------------------------------------- |
| Routes             | `app/routes/` + `app/routes.ts`                                   |
| DB Schema          | `app/lib/db.server/schema.ts`                                     |
| Repos              | `app/lib/repos.server/`                                           |
| Components         | `app/common/components/` (custom), `app/common/ui/` (ShadCN)      |
| AI Logic           | `app/lib/ai.server/`                                              |
| Push Notifications | `packages/web-push/` (library), `app/lib/push/` (app integration) |
| Micro Fuzz         | `packages/fuzzy/` (library)                                       |
| Auth               | `app/lib/auth.server/`                                            |

## Stack

- **Runtime**: Fly.io (Node.js 24+)
- **Framework**: React Router 7 (framework mode)
- **Database**: Turso (SQLite + vectors) via Drizzle
- **Styling**: TailwindCSS 4 + ShadCN
- **Linting**: Biome
- **Testing**: Vitest (unit), Playwright (e2e)
- **AI**: Gemini (embeddings), Claude (creative)

## Repository Pattern

All DB access goes through repos. Import the singleton:

```typescript
import { repos } from "~/lib/repos.server";
// repos.kinks.findById(id), repos.matches.create({...}), etc.
```

For direct database access (raw queries), also import `db`:

```typescript
import { db, repos } from "~/lib/repos.server";
```

### Available Repos

| Repo                  | Key Methods                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------- |
| `repos.kinks`         | `findById`, `findByIds`, `findAll`, `search`, `findDistinctTags`, `create`, `update`      |
| `repos.matches`       | `findById`, `findAll`, `findByKinkId`, `findBoundariesForMatch`, `create`, `updateStatus` |
| `repos.matchUsers`    | `findByMatch`, `findByMatchAndUser`, `setQuestions`, `createAnswer`, `markAsRead`         |
| `repos.matchAiData`   | `findByMatch`, `setQuestionsPrompts`, `setSummary`, `clearSummary`                        |
| `repos.ratings`       | `findActiveSet`, `findByUser`, `createSet`, `submitRating`, `findDiscoveries`             |
| `repos.submissions`   | `findByUser`, `findPending`, `create`, `approve`, `reject`                                |
| `repos.notifications` | `findSubscriptionsByUser`, `create`, `delete`, `deleteSubscription`                       |
| `repos.users`         | `findById`, `findByUsername`, `updatePassword`                                            |
| `repos.preferences`   | `getEffective`, `upsert`                                                                  |
| `repos.jobs`          | `create`, `findPending`, `markComplete`, `markFailed`                                     |

## Delegation Pattern

When delegating to subagents, **do research first** then provide specific context:

**Good delegation:**

```
Implement the matches admin page.

FILES: Create app/routes/admin.matches.tsx, modify app/routes.ts
PATTERN: Follow app/routes/admin.kinks.tsx (two-panel layout)
DATA: repos.matches.findAll(), repos.matches.findBoundariesForMatch(id)
TYPES: Match, MatchStatus from ~/lib/db/repos/matches
```

**Bad:** "Create an admin page for matches. Look at existing code."

The bad version wastes tokens having agents explore what you already know.

## ShadCN Components

**Always use the CLI** - never hand-write ShadCN components:

```bash
npx shadcn@latest add button card dialog
```

Components land in `app/common/ui/`. Custom components that compose ShadCN go in `app/common/components/`.

## Route Types

**Default to page routes** (loader + action + component). Use `<Form>` and `useFetcher`.

**Resource routes** (no component) only for:

- Dynamic client fetches (polling, infinite scroll)
- Webhooks, health checks
- Background job triggers

## Patterns to Follow

### Admin Pages (Two-Panel Layout)

Reference: `app/routes/admin.kinks.tsx`

- Left panel: filterable list with search/status badges
- Right panel: detail view using Card components
- Use `useFetcher` for mutations, `useState` for selected item

### Route Module Structure

Loaders and actions are extracted to co-located `.server.ts` files:

```
app/routes/example/
├── route.tsx           # Component + re-exports
├── loader.server.ts    # Server loader
└── action.server.ts    # Server action (if needed)
```

**route.tsx:**

```typescript
import type { Route } from "./+types/route";

export { loader } from "./loader.server";
export { action } from "./action.server";

export default function Page({ loaderData }: Route.ComponentProps) {}
```

**loader.server.ts:**

```typescript
import { repos } from "~/lib/repos.server";
import type { Route } from "./+types/route";

export const loader = async ({ context }: Route.LoaderArgs) => {
  const items = await repos.kinks.findAll();
  return { items };
};
```

### Auth-Protected Routes

```typescript
import { authMiddleware, userContext } from "~/lib/auth.server";

export const middleware = [authMiddleware];

export const loader = async ({ context }: Route.LoaderArgs) => {
  const user = context.get(userContext); // "mike" | "chrys"
};
```

## Git Operations

### ⚠️ CRITICAL: NEVER RECREATE FILES - USE GIT MV ⚠️

**DO NOT USE `mv`, `cp`, OR RECREATE FILES. THIS WASTES MASSIVE AMOUNTS OF TOKENS.**

When renaming or moving files/directories, **ALWAYS** use `git mv`. Using regular `mv` or manually recreating files is a **MASSIVE WASTE OF TOKENS** because:

1. **You have to read the entire file to recreate it** (wastes read tokens)
2. **You have to write the entire file again** (wastes write tokens)
3. **Git history is destroyed** (makes debugging impossible)
4. **Future context is lost** (blame/log becomes useless)

**This can waste 10,000+ tokens on a single file move. NEVER DO THIS.**

**WRONG (MASSIVE TOKEN WASTE):**

```bash
mv app/routes/activity app/routes/activity
# OR
cp app/routes/activity/route.tsx /tmp/backup
rm -rf app/routes/activity
mkdir app/routes/activity
cp /tmp/backup app/routes/activity/route.tsx
```

**CORRECT (preserves history, zero token waste):**

```bash
git mv app/routes/activity app/routes/activity
# Then just update import paths in other files that reference the moved files
```

**If you need to rename a file:**

```bash
git mv app/routes/old-name.tsx app/routes/new-name.tsx
```

**The `R` flag in git status means you did it correctly:**

```
R  app/routes/activity/route.tsx -> app/routes/activity/route.tsx  # GOOD
D  app/routes/activity/route.tsx                                    # BAD (file deleted)
?? app/routes/activity/route.tsx                                 # BAD (new file)
```

## Gotchas

1. **Route types are generated** - If you see type errors after changing loaders/actions, regenerate with `pnpm react-router typegen`. Types live in `.react-router/types/`.

## Debug Route

Protected endpoint at `/api/debug` for inspecting jobs and matches in production.

**Auth:** Header `X-Debug-Secret: alcove-debug-2024`

```bash
# List recent jobs
curl -H "X-Debug-Secret: alcove-debug-2024" "https://alcove.fly.dev/api/debug?action=jobs"

# Filter by status: pending, failed, or all
curl -H "X-Debug-Secret: alcove-debug-2024" "https://alcove.fly.dev/api/debug?action=jobs&status=failed"

# Get specific job with events
curl -H "X-Debug-Secret: alcove-debug-2024" "https://alcove.fly.dev/api/debug?action=job&id=<jobId>"

# Get match with boundaries and kink
curl -H "X-Debug-Secret: alcove-debug-2024" "https://alcove.fly.dev/api/debug?action=match&id=<matchId>"
```

## Deployment

**Push to `main` triggers automatic deployment via GitHub Actions.**

Manual deploy if needed: `make deploy`

## Make Commands

```bash
# Development
make dev          # Start dev server
make build        # Build for production
make serve        # Serve production build locally
make typecheck    # TypeScript check

# Testing
pnpm test         # Run unit tests in watch mode
pnpm test:run     # Run unit tests once
pnpm test:e2e     # Run Playwright e2e tests

# Linting
pnpm lint         # Check with Biome
pnpm lint:fix     # Auto-fix with Biome
pnpm lint:types   # TypeScript check (tsgo)
pnpm lint:unused  # Find unused exports (knip)
pnpm lint:dupes   # Find duplicate code (jscpd)

# Deployment
make deploy       # Manual deploy to Fly.io
make logs         # View Fly.io logs
make ssh          # SSH into Fly.io container

# Database
make db-generate              # Generate migration from schema changes
make db-migration NAME=...    # Create custom migration (partial indexes, etc.)
make db-migrate               # Apply pending migrations
make db-pull                  # Pull schema from database
make sql SQL="SELECT ..."     # Run SQL against production database
pnpm db:studio                # Open Drizzle Studio (database viewer)

# Scripts
make tsx scripts/foo.ts       # Run TypeScript scripts with .env loaded
```
