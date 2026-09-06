# Database Layer

Drizzle ORM + Turso (distributed SQLite). Every query pay 100-400ms network latency.

## Key Files

```
schema.ts       # Re-exports schema-{auth,language,practice}.ts
relations.ts    # Drizzle relations for Query API
queries/        # Query functions (import from here)
types.ts        # Derived types from schema
```

## Critical Rules

1. **Never query in loops** - Batch fetch, then Map.groupBy
2. **Use relations** - One query with `with:` beat multiple queries
3. **Guard empty arrays** - `if (ids.length === 0) return []`

## Quick Patterns

```typescript
// Fetch with relations
const vocab = await db.query.vocabulary.findFirst({
	where: { id },
	with: { verbDetails: true, vocabularyTags: { with: { tag: true } } },
});

// Import queries in routes
import { getVocabBySection } from "@/server/db/queries/vocabulary";
```

## When to Defer

Read the `drizzle` skill before writing any Drizzle code — this project is on
v1, whose API differs from v0.

- Streaming / loader performance patterns
