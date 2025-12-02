# Database Documentation

The project uses **PostgreSQL** with **Kysely** for type-safe interactions.

## Schema Overview

### Core Tables

*   **`vocabulary`**: The central table for all words.
    *   `greek_text`: The display form (includes article for nouns, e.g., "ο σκύλος")
    *   `gender`: Explicit gender for nouns (`masculine` | `feminine` | `neuter`)
    *   `status`: 'unprocessed' (inbox) vs 'processed' (active)
    *   `difficulty_level`: 0 (New), 1 (Learning), 2 (Mastered)
    *   `is_problem_word`: Boolean flag for words requiring focus
*   **`noun_details`**: Extension table for noun-specific grammar (case declensions).
*   **`verb_details`**: Extension table for verb conjugations and families.
*   **`tags`**: System and user-created tags for organizing vocabulary.
*   **`vocabulary_tags`**: Many-to-many join table.
*   **`weak_areas`**: Tracks specific grammatical concepts the user struggles with.

### Practice Tables

*   **`practice_sessions`**: Logs each study session (type, score, duration).
*   **`practice_attempts`**: Logs every individual answer to analyze patterns.

## Migrations

Migrations are managed via Kysely in `src/db/migrations`.

```bash
npm run db:migrate
```

## Seeding

Seed data lives in `src/scripts/seed-data/`:

```
seed-data/
├── index.ts            # Re-exports
├── tags.ts             # Tag definitions
├── vocabulary.ts       # Nouns, verbs, adverbs, phrases
└── grammar-patterns.ts # Case usage examples
```

```bash
npm run db:seed
```

## Data Modeling Decisions

### Lemmas vs Display Text

**Decision**: Store lemmas (base forms) in seed data, generate display text with articles during seeding.

**Why**: Greek nouns have inherent gender. The article (`ο/η/το`) is derived from gender + number + case, not the other way around. Storing gender explicitly enables:
- Accurate article generation for any case
- Gender quizzes
- Declension drilling

**Implementation**:
- Seed data stores: `{ lemma: "σκύλος", gender: "masculine", english: "dog" }`
- Seeding generates: `greek_text = "ο σκύλος"` using `formatNounWithArticle()`
- Database stores the display form for simple queries

### Grammar Types

Defined in `src/lib/greek-grammar.ts`:

```typescript
type Gender = "masculine" | "feminine" | "neuter";
type GrammaticalNumber = "singular" | "plural";
type Case = "nominative" | "genitive" | "accusative" | "vocative";
type ConjugationFamily = "-ω" | "-άω/-ώ" | "-ομαι" | "-άμαι" | "irregular";
```

These are string literal unions (not enums) for simplicity and tree-shaking.

### Vocabulary vs Grammar Patterns

Seed data separates two learning objectives:

1. **Vocabulary** (`vocabulary.ts`): Words and their properties
   - Nouns with gender
   - Verbs with conjugation family
   - Adverbs, adjectives, phrases

2. **Grammar Patterns** (`grammar-patterns.ts`): Case usage in context
   - Full phrases showing accusative, genitive usage
   - Includes `explanation` and `whyThisCase` metadata
   - Organized by grammatical case, then by usage context

### Static Constants vs Seed Data

| Location | Purpose |
|----------|---------|
| `src/constants/` | UI display data (reference tables, examples, tips) |
| `src/scripts/seed-data/` | Database seed data (vocabulary entries) |
| `src/lib/greek-grammar.ts` | Programmatic logic (article lookup, types) |

The `constants/` folder contains static data optimized for rendering reference pages (verb conjugation tables, case recognition tips). This is separate from seed data which populates the database.
