---
name: drizzle
description: Drizzle v1 ORM for this project — schema, migrations, queries. Read BEFORE writing any Drizzle code; v1 API differs from v0.
---

# Drizzle ORM Skill

This project uses **Drizzle ORM v1.0.0-rc.4** with **Turso** over its HTTP serverless driver. All Drizzle code MUST follow the v1 API, not the legacy v0 API.

Your task: $ARGUMENTS

Before starting, read the reference docs in this skill directory:

- `${CLAUDE_SKILL_DIR}/v1-reference.md` — v1 API, schema, relations, queries, transactions, config

## Project context

- **Driver**: `@tursodatabase/serverless` (`connect()`, HTTP), not `@libsql/client`
- **ORM import**: `drizzle-orm/tursodatabase-serverless`
- **Schema column imports**: `drizzle-orm/sqlite-core`
- **Config dialect**: `turso`
- **Env vars**: `TURSO_DATABASE_URL` is required, and a missing one fails with "TURSO_DATABASE_URL is not set". `TURSO_AUTH_TOKEN` is sent only when set. The app always talks to Turso over HTTP, and the driver rejects `file:` URLs; only drizzle-kit accepts `file:./local.db` (see `drizzle.config.ts`).

## File conventions for this project

```
src/server/db/
  index.ts             ← server-only: shared `db`, `inTransaction`, `DbTransaction`
  retry.ts             ← `withReadRetry`: retries a read once after a transport failure
  schema.ts            ← Re-exports schema-auth.ts, schema-language.ts, schema-practice.ts
  columns.ts, enums.ts ← Shared column helpers and enums
  relations.ts         ← defineRelations
  types.ts             ← Shared `typeof table.$inferSelect` / `$inferInsert` aliases (prefer reusing these)
  queries/*.ts         ← All reads/writes; thin DAL, query only, infer types
drizzle.config.ts
drizzle/               ← Generated migrations (drizzle-kit output)
```

A lint rule in `vite.config.ts` allows importing `@/server/db` only from `src/server/db/queries/` and scripts. Application code calls a query helper.

## Connections

- `db` is one shared connection for the whole process, wrapped in `withReadRetry`. Reads (`all`, `get`, `values`, `prepare`) are retried once when the failure is a transport one: a dead keep-alive socket, or a Turso session that expired while Fly had the machine suspended. Writes are never retried, because a write that failed in transit may still have landed.
- Every query has a 30 s default timeout (`defaultQueryTimeout`).
- Transactions run through `inTransaction` on a connection of their own. See Transactions below.

## Performance rules (Turso = remote DB, 100-400ms per round-trip)

### NEVER query inside loops

```typescript
// WRONG — N+1 queries, each paying network latency
for (const task of tasks) {
	const column = await db.query.columns.findFirst({
		where: { id: task.columnId },
	});
}

// CORRECT — batch fetch + Map lookup
const columnIds = tasks.map((t) => t.columnId);
const columns = await db.query.columns.findMany({
	where: { id: { in: columnIds } },
});
const columnMap = new Map(columns.map((c) => [c.id, c]));
for (const task of tasks) {
	const column = columnMap.get(task.columnId);
}
```

Same for writes — batch them:

```typescript
// WRONG: N inserts
for (const task of tasks) await db.insert(tasksTable).values(task);

// CORRECT: 1 insert
await db.insert(tasksTable).values(tasks);
```

### Prefer relations over multiple queries

One query with `with:` = one HTTP request. Multiple queries = multiple round-trips.

```typescript
// CORRECT — single query (~150ms)
const task = await db.query.tasks.findFirst({
	where: { id },
	with: { column: true },
});

// WRONG — 2 queries = 2x latency
const task = await db.query.tasks.findFirst({ where: { id } });
const column = await db.query.columns.findFirst({
	where: { id: task.columnId },
});
```

### Guard empty arrays before `in` queries

```typescript
const findByIds = async (ids: string[]) => {
	if (ids.length === 0) return [];
	return db.query.tasks.findMany({ where: { id: { in: ids } } });
};
```

### Choose the right API

**Default to the Query API (`db.query`) for all reads.**

**Any `db.select(` or `tx.select(` is almost always an antipattern** in this project. If you are typing `.select(`, stop: you almost certainly mean `db.query.<table>.findFirst` / `findMany` (and `with:` for relations). The Select Builder exists for the **narrow** exceptions below — not for fetching rows, entities, or “get user by id” style reads.

The Select Builder (`db.select().from()` …) is only appropriate for aggregates, complex `JOIN`s that relations cannot express, or `DISTINCT`. If you reach for `db.select()` for a simple lookup, you are using the wrong API.

| Use Case                         | API                                    |
| -------------------------------- | -------------------------------------- |
| Fetching entities with relations | Query API (`db.query.table.*`)         |
| Simple CRUD reads                | Query API                              |
| Single-row lookup by ID/field    | Query API (`findFirst`)                |
| Simple filtered count            | `db.$count(table, filter)`             |
| Multiple counts in one query     | Raw SQL with scalar subqueries         |
| COUNT, SUM, AVG, GROUP BY        | Select Builder (legitimate `.select(`) |
| Complex JOINs not in relations   | Select Builder (rare)                  |
| DISTINCT with JOINs              | `db.selectDistinct()`                  |

```typescript
// CORRECT — Query API for lookups
const user = await db.query.users.findFirst({ where: { id: userId } });
const tasks = await db.query.tasks.findMany({ where: { userId } });

// WRONG — don't use Select Builder for simple reads
const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
```

## Implementation rules

1. **Always use v1 API** — see the reference doc. Key differences from v0:
   - Relations use `defineRelations()`, not scattered `relations()` calls
   - Relation params: `from`/`to` (not `fields`/`references`), `alias` (not `relationName`)
   - Query `where` uses object syntax `{ id: 1 }`, not function syntax `(t, { eq }) => eq(t.id, 1)`
   - Query `orderBy` uses object syntax `{ id: "asc" }`, not function syntax

2. **Don't open connections in app code.** `src/server/db/index.ts` builds the client with `connect()` from `@tursodatabase/serverless` and passes it to `drizzle()` from `drizzle-orm/tursodatabase-serverless`. Everything else uses `db` or `inTransaction`.

3. **Pass `relations`** to `drizzle()`, not `schema`:

   ```typescript
   const db = drizzle({ client, relations });
   ```

4. **Use `snake_case` casing option** if table columns use snake_case in the database:

   ```typescript
   const db = drizzle({ client, casing: "snake_case" });
   ```

5. **For schema changes**, this repo pushes: `pnpm db:push` (drizzle-kit loads `.env`, which points at production Turso). `pnpm db:generate` and `pnpm db:migrate` exist for migration files. For a local schema only: `TURSO_DATABASE_URL=file:./local.db pnpm exec drizzle-kit push`, or `make db-push-local`.

6. **Schema changes hit production.** After modifying a `schema-*.ts` file, tell the user and let them run `pnpm db:push`; never push unprompted. pnpm only, never `npx`.

7. **Don't import from legacy packages** — validators come from `drizzle-orm/zod`, `drizzle-orm/valibot`, etc. (not `drizzle-zod`, `drizzle-valibot`)

8. **Types: prefer table inference, not guessed package exports** — In v1, use `typeof myTable.$inferSelect` and `typeof myTable.$inferInsert` (or the aliases in `src/server/db/types.ts`). Do **not** assume `InferInsertModel` / `InferUpdateModel` exist on the main `drizzle-orm` entry; for partial update payloads use `Pick<Row, "colA" | "colB">` where `Row` is the table’s `$inferSelect` type (or a small explicit type).

9. **Zod vs DAL** — Use `createInsertSchema` / `createUpdateSchema` where you need **runtime validation** (forms, actions, external input). For internal mutation helpers that only receive already-validated data, `$inferInsert` / shared types are enough; avoid duplicating the same shape in both Zod and manual interfaces.

10. **No casual `.select(`** — treat `db.select(` / `tx.select(` as a red flag unless you are in one of the explicit escape hatches (aggregates, impossible-via-relations joins, `selectDistinct`). Ordinary reads belong on `db.query`.

11. **Inserts and composite inputs** — If an object mixes **table columns** with **side-effect fields** (values the function needs that aren't columns on the row), destructure the extras and pass only the insert shape to `.values({ ... })`. Never spread a superset into `insert().values()`.

12. **Return types: infer from the function, do not hand-model rows** — Omit redundant `: Promise<...>` annotations on query helpers when TypeScript can infer them from `await db.query…` / `.returning()`. When a **route, loader, or another module** needs the result type, export an alias derived from the query — not a duplicate interface:
    - Whole value: `export type Thing = Awaited<ReturnType<typeof getThing>>`
    - Array element: `export type ThingRow = Awaited<ReturnType<typeof listThings>>[number]`
    - Nullable `findFirst`: keep `… \| undefined` in the alias, or use `NonNullable<…>` only at the call site that asserts presence
    - Composed stats objects: return a plain object from one function and use `Awaited<ReturnType<typeof getStats>>`; put **derivation** (math, formatting) in `lib/`, not parallel type definitions

## Common patterns

### Upsert

```typescript
await db.insert(tasks).values({ id, title, columnId }).onConflictDoUpdate({
	target: tasks.id,
	set: { title, columnId },
});
```

### Always use `.returning()` on mutations

```typescript
// CORRECT — caller gets generated ID, timestamps, defaults
const [task] = await db.insert(tasks).values(data).returning();

const [updated] = await db.update(tasks).set({ title }).where(eq(tasks.id, id)).returning();
```

Skip `.returning()` only for fire-and-forget operations (batch cleanup, etc.).

### Return types (export from the query, not a second schema)

```typescript
// queries/things.ts — no extra return annotation if inference is clear
export const getThing = async (id: number) => {
	return await db.query.things.findFirst({
		where: { id },
		with: { owner: true },
	});
};

export type ThingWithOwner = NonNullable<Awaited<ReturnType<typeof getThing>>>;

export const listThings = async (userId: number) => {
	return await db.query.things.findMany({ where: { userId } });
};

export type ThingRow = Awaited<ReturnType<typeof listThings>>[number];
```

Routes import `ThingWithOwner` / `ThingRow` from the query module — they do **not** redefine the same shape. For mutations, `Awaited<ReturnType<typeof createThing>>` often resolves to the row type from `.returning()` (or `undefined` if you return optional first element — prefer `return session` / `return attempt` so the alias matches what callers use).

### Transactions

Use **`inTransaction(async (tx) => { ... })`** from `@/server/db` **once** at the **orchestrating** function (e.g. one public mutation that does insert + related updates). Don't call `db.transaction` in this repo.

`inTransaction` opens a connection for that transaction alone and closes it afterwards, so statements from concurrent requests on the shared `db` can't land inside it. It skips the read retry, because a retried read opens a fresh session, which would run outside the transaction. A failure to close is logged, not thrown, because the transaction has already committed or rolled back by then.

```typescript
import { type DbTransaction, inTransaction } from "../index";

export const recordAttempt = async (input: RecordAttemptInput) =>
	await inTransaction(async (tx) => {
		const [attempt] = await tx.insert(practiceAttempts).values(input).returning();
		await applyReviewState(tx, attempt);
		return attempt;
	});

const applyReviewState = async (tx: DbTransaction, attempt: Attempt) => {
	/* tx.query / tx.update, never db */
};
```

Inside the callback, use **`tx`** (not `db`) for every query. **Internal helpers** take `tx: DbTransaction` as the first argument and must **not** start another transaction for the same logical unit; nested `tx.transaction()` is only for intentional savepoints. See `v1-reference.md` § Transactions for `tx.rollback()`, return values and relational `tx.query.*` inside transactions.

### Simple counts with `db.$count()`

```typescript
const taskCount = await db.$count(tasks, eq(tasks.columnId, columnId));
```

For multiple counts in one round-trip, use raw SQL:

```typescript
const [stats] = await db.all<{ total: number; done: number }>(sql`
  SELECT
    (SELECT COUNT(*) FROM tasks) as total,
    (SELECT COUNT(*) FROM tasks WHERE done = 1) as done
`);
```
