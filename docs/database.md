# Database Documentation

The project uses **PostgreSQL** with **Kysely** for type-safe interactions.

## Schema Overview

### Core Tables

*   **`vocabulary`**: The central table for all words.
    *   `status`: 'unprocessed' (inbox) vs 'processed' (active).
    *   `difficulty_level`: 0 (New), 1 (Learning), 2 (Mastered).
    *   `is_problem_word`: Boolean flag for words requiring focus.
*   **`noun_details`**: Extension table for noun-specific grammar (gender, cases).
*   **`verb_details`**: Extension table for verb conjugations and families.
*   **`weak_areas`**: Tracks specific grammatical concepts the user struggles with (e.g., "accusative_singular").

### Practice Tables

*   **`practice_sessions`**: Logs each study session (type, score, duration).
*   **`practice_attempts`**: Logs every individual answer to analyze patterns.

## Migrations

Migrations are managed via Kysely in `src/db/migrations`.

To run migrations:
```bash
npm run db:migrate
```

## Seeding

The seeding strategy (defined in `database-seeding.plan.md`) involves:
1.  Migrating existing static constants (`vocabulary.ts`, `verbs.ts`) into the database.
2.  Parsing markdown notes to extract unstructured vocabulary.
3.  Generating initial quiz questions from the seeded data.

To run seeds:
```bash
npm run db:seed
```
