# Kalimera

A Greek learning app for intermediate learners building procedural fluency — drilling grammar and vocabulary until responses become automatic.

**Stack:** TanStack Start (TanStack Router + Nitro) · Turso (libsql) · Drizzle ORM · Tailwind CSS v4

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

- Node.js 26+ (see `engines` in package.json)
- pnpm

### Local development

```bash
pnpm install
cp .env.example .env     # fill in Turso credentials
pnpm dev
```

There is no local database. `.env` holds **production** Turso credentials and
both the app and drizzle-kit load it directly, so `make db-push` and
`make db-seed` act on production. Use `make db-push-local` if you only need to
try a schema change against a throwaway file DB.

Seeding is an idempotent additive upsert — it adds and updates rows and never
deletes — so re-running it against production is safe.

## Commands

`.env` holds **production** Turso credentials, and drizzle-kit auto-loads it. Every
database command below therefore hits production unless its name says `local`.
There is no local Docker database.

### Development

| Command        | Description                                              |
| -------------- | -------------------------------------------------------- |
| `make dev`     | Start the Vite dev server                                |
| `make build`   | Build for production                                     |
| `make preview` | Serve the built output (`node .output/server/index.mjs`) |

### Database (Turso — production)

| Command              | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| `make db-push`       | Push schema **to production**                                   |
| `make db-seed`       | Seed **production** — idempotent additive upsert, never deletes |
| `make db-setup`      | `db-push` then `db-seed`                                        |
| `make db-studio`     | Open Drizzle Studio against **production**                      |
| `make db-push-local` | Push schema to a local file DB (`local.db`), no Docker, no prod |

`pnpm db:seed` alone does **not** load `.env`; `make db-seed` passes it explicitly.

### Code quality

```bash
pnpm typecheck && pnpm lint && pnpm lint:ls && pnpm lint:greek && pnpm test --run
pnpm lint:unused        # knip
pnpm duplicates:llm     # jscpd, LLM-readable output
```

## Architecture

```
src/
  components/        # Custom components (tailwind-variants)
  components/ui/     # ShadCN components
  routes/            # TanStack Router file-based routes
  server/db/         # Drizzle schema and queries
  scripts/           # Seed scripts
docs/
  user-flows.llm     # Route map, user journeys, data tables
```

**Path alias:** `@/` → `./src/`

**Route types:** generated into `src/routeTree.gen.ts` by the Vite plugin; `Route.useLoaderData()` is typed from the loader with no separate codegen step.

## Routes

```
/                                 Dashboard
/login  /register  /try           Auth, and the anonymous try-before-signup drill

/practice                         Drill browser — four group cards
/practice/cases                   Doer · Target · Owner · Review
/practice/pronouns                Object forms, placement, possessives
/practice/verbs                   Present · Past · Future & Modal · Mixed tenses
/practice/blocks                  Survival phrases, numbers, days, opposites
/practice/blocks/question-words   ποιος / πόσος agreement
/practice/review                  Drills gone rusty

/learn                            Content browser hub
/learn/conversations/:tab         Themed dialogues
/learn/phrases/:tab               Common expressions
/learn/nouns  /:subject           Noun browser
/learn/verbs  /:verbId            Verb browser and conjugation detail
/learn/essentials/:subtab         Numbers, colours, time, position, frequency

/reference                        Grammar reference hub
/reference/:tab                   cases · pronouns · articles · nouns · adjectives · prepositions · patterns
/reference/verbs  /:band          Verbs, by frequency band

/search  /progress  /support      Search · analytics · about
```

The individual drills are not listed here. They are owned by the per-group
catalogues under `src/routes/practice/*/drills.data.ts`, and a list kept in this
file would drift from them.

## Environment variables

| Variable             | Description        |
| -------------------- | ------------------ |
| `TURSO_DATABASE_URL` | Turso database URL |
| `TURSO_AUTH_TOKEN`   | Turso auth token   |

Both live in `.env`, which drizzle-kit and the app load directly.
