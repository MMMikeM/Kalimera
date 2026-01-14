# Database Layer

Drizzle ORM with Turso (distributed SQLite). Every query pays 100-400ms network latency.

## Key Files

```
schema.ts       # Table definitions
relations.ts    # Drizzle relations for Query API
queries/        # Query functions (import from here)
types.ts        # Derived types from schema
```

## Critical Rules

1. **Never query in loops** - Batch fetch, then Map.groupBy
2. **Use relations** - One query with `with:` beats multiple queries
3. **Guard empty arrays** - `if (ids.length === 0) return []`

## Quick Patterns

```typescript
// Fetch with relations
const vocab = await db.query.vocabulary.findFirst({
  where: { id },
  with: { verbDetails: true, vocabularyTags: { with: { tag: true } } },
});

// Import queries in routes
import { getVocabBySection } from "@/db.server/queries/vocabulary";
```

## When to Defer

**Use `drizzle-db-specialist` agent for:**

- Complex joins or aggregations
- Query optimization / N+1 fixes
- Schema design or migrations
- Composite key relations
- Streaming / loader performance patterns
