# Adding Lesson Vocabulary

Create a new file following this naming convention:

```text
YYYY-MM-DD-topic.ts
```

## Template

```typescript
import type { NounSeed, VerbSeed, Phrase } from "../../../../types/seed";

export const LESSON_YYYY_MM_DD = {
  meta: {
    date: "YYYY-MM-DD",
    topic: "Description of lesson topic",
    source: "Weekly lesson / Self-study / etc.",
  },

  nouns: [
    { lemma: "σπίτι", gender: "neuter", english: "house" },
  ] satisfies NounSeed[],

  verbs: [
    { lemma: "τρώω", english: "I eat", conjugationFamily: "irregular" },
  ] satisfies VerbSeed[],

  phrases: [
    { text: "Καλημέρα", english: "Good morning" },
  ] satisfies Phrase[],
};
```

## After creating the file

1. Import and export in `lessons/index.ts`:

```typescript
import { LESSON_2024_12_15 } from "./2024-12-15-family-visit";
export { LESSON_2024_12_15 };
```

2. Add seeding logic in `src/scripts/seed.ts` if needed for custom tagging.

3. Run seed: `npm run db:seed`
