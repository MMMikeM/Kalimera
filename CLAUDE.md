# Greek Learning App

React Router 7 app deployed to Cloudflare Workers with Turso (libsql) database.

## Educational Design Principles

### Greek First, English as Context

This is a Greek learning app. Always present Greek prominently, with English as supporting context.

```
GOOD: με = me           (Greek first, English explains)
BAD:  me | με | me      (Redundant, English-centric)
```

### Show Structure, Not Flat Lists

Language has patterns. Present data in ways that reveal the underlying structure:

```
GOOD - Paradigm table showing relationships:
┌─────────┬───────────┬───────────┐
│         │ Singular  │ Plural    │
├─────────┼───────────┼───────────┤
│ 1st     │ με (me)   │ μας (us)  │
│ 2nd     │ σε (you)  │ σας (you) │
│ 3rd m   │ τον (him) │ τους      │
│ 3rd f   │ την (her) │ τις       │
│ 3rd n   │ το (it)   │ τα        │
└─────────┴───────────┴───────────┘

BAD - Flat grid hiding the pattern:
┌────────┐ ┌────────┐ ┌────────┐
│ με=me  │ │ σε=you │ │ τον=him│
└────────┘ └────────┘ └────────┘
```

The paradigm table shows:
- 1st/2nd/3rd person progression (vertical)
- Singular/plural relationship (horizontal)
- Gender variations in 3rd person
- Pattern similarities (με/μας, σε/σας)

### Avoid Redundancy

If two columns contain the same information, remove one:

```
BAD:  | Person | Greek | English |
      | my     | μου   | my      |  ← "Person" and "English" are identical

GOOD: | Greek | English | Example |
      | μου   | my      | το σπίτι μου |
```

### Examples Show Usage, Not Definitions

Examples should demonstrate the word in context, not repeat the definition:

```
GOOD: μου = my
      το σπίτι μου (my house)

BAD:  μου = my
      Example: my
```

### Concept Progression (Quick Reference Page)

Order content by conceptual dependency, not alphabetically:

1. **Cases** - The framework (WHO/WHAT/WHOSE)
2. **Pronouns** - Most frequent words, demonstrate cases
3. **Articles** - Same job as pronouns, but for nouns
4. **Nouns** - How endings change by case
5. **Prepositions** - Combine with articles/pronouns
6. **Common Mistakes** - Reinforce with error pairs
7. **Verbs** - Separate system (conjugation)
8. **Fine-tuning** - The -ν rule, etc.

## Database Commands

**CRITICAL:** Always use the Makefile for database operations. Direct `pnpm` commands do NOT load `.env` variables.

### Local Development (Docker libsql-server on port 8080)

```bash
make db-push      # Push schema to local database
make db-seed      # Seed local database
make db-setup     # Push schema and seed locally
make db-studio    # Open Drizzle Studio (local)
```

### Production (Turso Cloud)

```bash
make prod-db-push     # Push schema to production
make prod-db-seed     # Seed production database
make prod-db-setup    # Push schema and seed production
make prod-db-studio   # Open Drizzle Studio (production)
```

### Why This Matters

The `src/db/index.ts` falls back to `http://127.0.0.1:8080` when `TURSO_DATABASE_URL` is not set:

```typescript
const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "http://127.0.0.1:8080",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
```

Running `pnpm db:seed` directly will seed a local database, not Turso. The Makefile's `prod-*` targets source `.env` first:

```makefile
prod-db-seed:
  set -a && . ./.env && set +a && pnpm db:seed
```

## Deployment

```bash
make deploy       # Build and deploy to Cloudflare Workers
make deploy-dry   # Dry run deployment
make logs         # Tail Cloudflare Worker logs
```

## Architecture

- **Cloudflare Workers:** Uses `context.db` from `entry.worker.ts` for database access
- **Local Dev:** Falls back to direct import when `context.db` is unavailable
- **Loaders pattern:** `const db = context?.db ?? (await import("../db")).db;`

## UI Components

### Directory Structure

- **`src/components/*.tsx`** - Custom components (tailwind-variants)
- **`src/components/ui/*.tsx`** - ShadCN components (class-variance-authority)

### Custom Components

Import from `@/components`:

```typescript
import { Card, Badge, MonoText, SearchInput, Table } from "@/components";
```

### ShadCN Components

Add via `pnpm dlx shadcn@latest add <component>`. Import from `@/components/ui/<component>`:

```typescript
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
```

### Path Alias

The `@/` alias maps to `./src/`. Configured in `tsconfig.json` and `vite.config.ts`.
