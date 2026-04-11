# Kalimera

A Greek learning app for intermediate learners building procedural fluency — drilling grammar and vocabulary until responses become automatic.

**Stack:** React Router 7 · Cloudflare Workers · Turso (libsql) · Drizzle ORM · Tailwind CSS v4

---

## What it does

- **Timed production drills** — type Greek under time pressure to build retrieval speed
- **Spaced repetition** — SRS-based vocabulary review with SM-2 scheduling
- **Grammar reference** — paradigm tables for cases, pronouns, articles, verbs, nouns, adjectives, prepositions, and patterns
- **Memory drills** — timed paradigm recall for forms that need to be automatic
- **Vocabulary browser** — nouns by gender/category, verbs by conjugation family with full paradigm tables
- **Progress tracking** — streak calendar, accuracy trends, mastered vocabulary count

## Getting started

### Prerequisites

- Node.js 22+
- pnpm
- Docker (for local database)
- Wrangler CLI (`pnpm exec wrangler`)

### Local development

```bash
pnpm install

# Start local libsql database (Docker)
docker run -p 8080:8080 ghcr.io/tursodatabase/libsql-server

# Set up schema and seed data
make db-setup

# Start dev server
make dev
```

Copy `.env.example` to `.env` and fill in Turso credentials for production database access.

## Commands

All commands go through the Makefile — direct `pnpm` database commands skip `.env` and hit local instead of Turso.

### Development

| Command        | Description                   |
| -------------- | ----------------------------- |
| `make dev`     | Start development server      |
| `make build`   | Build for production          |
| `make preview` | Preview with Wrangler locally |

### Local database (Docker libsql on port 8080)

| Command          | Description         |
| ---------------- | ------------------- |
| `make db-push`   | Push schema         |
| `make db-seed`   | Seed data           |
| `make db-setup`  | Push + seed         |
| `make db-studio` | Open Drizzle Studio |

### Production database (Turso)

| Command               | Description         |
| --------------------- | ------------------- |
| `make prod-db-push`   | Push schema         |
| `make prod-db-seed`   | Seed data           |
| `make prod-db-setup`  | Push + seed         |
| `make prod-db-studio` | Open Drizzle Studio |

### Deployment

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `make deploy`     | Build and deploy to Cloudflare Workers |
| `make deploy-dry` | Dry run                                |
| `make logs`       | Tail worker logs                       |

### Linting

```bash
pnpm lint:fix && pnpm lint:unused && pnpm lint:types && pnpm lint:dupes
```

## Architecture

```
src/
  components/        # Custom components (tailwind-variants)
  components/ui/     # ShadCN components
  routes/            # React Router 7 routes
  db.server/         # Drizzle schema and queries
  scripts/           # Seed scripts
docs/
  user-flows.llm     # Route map, user journeys, data tables
```

**Path alias:** `@/` → `./src/`

**Route types:** Run `pnpm react-router typegen` after changing loaders.

## Routes

```
/                    Dashboard
/practice/speed      Timed mixed production drills
/practice/memory     Memory drill hub
/practice/review     SRS review queue
/practice/vocabulary New vocabulary learning
/learn               Content browser hub
/learn/conversations Themed dialogues
/learn/phrases       Common expressions
/learn/nouns         Noun browser
/learn/verbs         Verb browser with paradigm tables
/reference           Grammar reference hub
/reference/:tab      Grammar reference (cases, pronouns, articles, nouns, adjectives, prepositions, verbs, patterns)
/search              Fuzzy vocabulary search
/progress            Analytics
/try                 Anonymous drill (conversion)
```

## Environment variables

| Variable             | Description        |
| -------------------- | ------------------ |
| `TURSO_DATABASE_URL` | Turso database URL |
| `TURSO_AUTH_TOKEN`   | Turso auth token   |

Set as Cloudflare Worker secrets: `make secrets-set-turso`
