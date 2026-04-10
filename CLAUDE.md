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
|----------------------------------------------|---------------------------------------|
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
2. **Structure is pedagogy.** Paradigm tables are the primary teaching surface. Lay them out with typographic precision; the table *is* the lesson.
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
