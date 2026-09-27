# Database Layer

Drizzle ORM + Turso (distributed SQLite) over the HTTP serverless driver. Every query pays 100-400ms network latency.

## Key Files

```
index.ts        # server-only: shared `db`, `inTransaction`, `DbTransaction`
retry.ts        # withReadRetry: one retry for reads that hit a transport failure
schema.ts       # Re-exports schema-{auth,language,practice}.ts
relations.ts    # Drizzle relations for Query API
queries/        # Query functions (import from here)
types.ts        # Derived types from schema
```

`db` may only be imported inside `queries/` and scripts (lint rule in `vite.config.ts`). Routes and server functions call a query helper.

## Connections

- `db` is one shared connection wrapped in `withReadRetry`. Reads retry once on a transport failure (a dead socket, or a Turso session that expired while Fly had the machine suspended). Writes never retry: one that failed in transit may still have landed.
- Queries time out after 30 s.
- A missing `TURSO_DATABASE_URL` fails at startup with "TURSO_DATABASE_URL is not set". `TURSO_AUTH_TOKEN` is sent only when set.

## Critical Rules

1. **Never query in loops** - Batch fetch, then Map.groupBy
2. **Use relations** - One query with `with:` beats multiple queries
3. **Guard empty arrays** - `if (ids.length === 0) return []`
4. **Transactions go through `inTransaction`**, never `db.transaction`. It gives the transaction its own connection, so concurrent requests on the shared `db` can't interleave with it, and closes it afterwards. Call it once in the orchestrating query; helpers take `tx: DbTransaction`.

## Quick Patterns

```typescript
// Fetch with relations
const vocab = await db.query.vocabulary.findFirst({
	where: { id },
	with: { verbDetails: true, vocabularyTags: { with: { tag: true } } },
});

// A multi-step write
export const recordAttempt = async (input: RecordAttemptInput) =>
	await inTransaction(async (tx) => {
		const [attempt] = await tx.insert(practiceAttempts).values(input).returning();
		await applyReviewStateAfterAttempt(tx, { ... });
		return attempt;
	});

// Import queries in routes
import { getVocabBySlug } from "@/server/db/queries/vocabulary";
```

## When to Defer

Read the `drizzle` skill before writing any Drizzle code — this project is on
v1, whose API differs from v0.

- Streaming / loader performance patterns
