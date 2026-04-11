---
description: Create lesson data from raw lesson notes
allowed-tools: Read, Write, Edit, Bash(pnpm tsc:*)
---

Create a Greek lesson data file from these raw lesson notes:

```
$ARGUMENTS
```

## Instructions

1. **Parse the date** from the notes (e.g., "Tuesday, 16 December" → 2024-12-16)

2. **Identify the topic** from "Lesson objective" or infer from vocabulary

3. **Categorize vocabulary** by analyzing each entry:
   - **Nouns**: Have articles (ο/η/το) or are clearly nouns. Extract gender from article.
   - **Verbs**: End in -ω, -άω, -ώ, -ομαι, etc. or are clearly actions
   - **Adjectives**: Show -ος/-η/-ο pattern or describe qualities
   - **Adverbs**: Modify verbs, often end in -α or -ως
   - **Phrases**: Multi-word expressions or example sentences

4. **For adjectives with -ος/-η/-ο pattern**: Only use the masculine form as the lemma

5. **For nouns**:
   - Determine gender from article (ο=masculine, η=feminine, το=neuter)
   - Use the noun without article as lemma
   - Add metadata for notes like "(μοσχαρίσιο κρέας)"

6. **Create phrases** for:
   - Full example sentences
   - Useful expressions
   - Pattern demonstrations (e.g., "πιο + adjective")

7. **Add grammar notes** for the lesson objective pattern

8. **Create the file** at: `src/scripts/seed-data/vocabulary/lessons/YYYY-MM-DD-topic-slug.ts`
   - Import `createLesson` from `@/types/lesson-builder`
   - Export as `LESSON_YYYY_MM_DD = createLesson({ ... })`

9. **Update the index** at: `src/scripts/seed-data/vocabulary/lessons/index.ts`
   - Add import: `import { LESSON_YYYY_MM_DD } from "./YYYY-MM-DD-topic-slug"`
   - Add to export block
   - Add to LESSONS object with date key: `"YYYY-MM-DD": LESSON_YYYY_MM_DD`

10. **Type-check** with `pnpm typecheck`

## Reference format

Use `createLesson()` helper for type-safe lesson objects. Example:

```typescript
import { createLesson } from "@/types/lesson-builder";

export const LESSON_YYYY_MM_DD = createLesson({
  meta: {
    date: "YYYY-MM-DD",
    topic: "Topic description",
    source: "Source reference",
  },
  verbs: [
    { lemma: "λέμμα", english: "english", conjugationFamily: "-ω" },
  ],
  nouns: [
    { lemma: "λέμμα", gender: "masculine", english: "english" },
  ],
  adverbs: [
    { lemma: "λέμμα", english: "english" },
  ],
  adjectives: [
    { lemma: "λέμμα", english: "english" },
  ],
  phrases: [
    { text: "multi-word phrase", english: "english", metadata: { ... } },
  ],
  grammarNotes: [
    { pattern: "Pattern name", examples: [...], explanation: "..." },
  ],
});
```

See @src/scripts/seed-data/vocabulary/lessons/2024-12-16-comparatives-housing.ts for a complete example.

## Output

After creating the files, summarize what was added:

- Number of verbs, nouns, adjectives, adverbs, phrases
- Key grammar points captured
- Any vocabulary that was ambiguous (ask for clarification if needed)
