---
description: Create lesson data from raw lesson notes
allowed-tools: Read, Write, Edit, Bash(pnpm typecheck), Bash(pnpm test src/routes/guides)
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

7. **Add grammar notes** for the lesson objective pattern, and give each one a `section` saying where it is taught:
   - A guide section as `"<guide>/<section>"`, e.g. `"past/past-shapes"`. The guides and their section ids live in `src/routes/guides/*.data.ts`
   - `"word"` when the note is about one word rather than a pattern (its meanings, a fixed chunk, a look-alike spelling)
   - `"essentials"` for telling the time, dates and large numbers
   - Usually a new note belongs to a section that already exists: say which, and whether the guide should gain an example from it. If it fits nowhere, say so and propose a new section rather than forcing it
   - `pnpm test src/routes/guides` fails on a `section` that names no real section

8. **Mark the forms in a note's examples** when the note teaches the form of a noun, article, adjective or pronoun (a Target after a preposition, an Owner, agreement, a gender pair). Write the example as `{ greek, english, marks }` with `mark()` from `@/lib/guide-marks`, as guide examples do:
   ```typescript
   { greek: "ο γιος της κόρης μου", english: "my daughter's son", marks: [mark("ο γιος", "nominative", "masculine"), mark("της κόρης", "genitive", "feminine"), mark("μου", "genitive")] }
   ```
   - Mark the phrases the note is about, article included, not every noun in the sentence. Give the gender on nouns, articles and adjectives; short pronouns (μου, μας) take none
   - A contraction is marked whole: `mark("στην Κύπρο", "accusative", "feminine")`
   - The Greek goes in `greek` alone; the translation and any teaching note go in `english`: `"I have a lot of work. (feminine)"`
   - Leave an example a plain string when there is no form to show: verbs, adverbs, a "not:" counter-example, a list of words
   - Each mark's text must appear in the Greek, in order; `pnpm test src/routes/guides` fails otherwise. A wrong mark teaches the wrong form, so check the case against the sentence, not the ending alone

9. **Set `cefrLevel`** (`A1`–`C2`) on every verb, noun, adverb and adjective; the types require it. Phrases may omit it

10. **Create the file** at: `src/scripts/seed-data/vocabulary/lessons/YYYY-MM-DD-topic-slug.ts`
   - Import `createLesson` from `@/types/lesson-builder`, and `mark` from `@/lib/guide-marks` when an example is marked
   - Export as `LESSON_YYYY_MM_DD = createLesson({ ... })`

11. **Don't edit the index.** `src/scripts/seed-data/vocabulary/lessons/index.ts` discovers lessons itself:
    - It reads its own directory for files matching `^\d{4}-\d{2}-\d{2}.*\.ts$`, sorted by name
    - It takes the date from the first 10 characters of the filename and loads the export named `LESSON_` + that date with `-` replaced by `_`
    - So the filename date and the export name must agree (keep `meta.date` the same too). A mismatched export name loads as `undefined` and `pnpm db:seed` throws; `pnpm typecheck` does not catch it
    - `LESSONS` is keyed by date, so a second file with the same date replaces the first; one lesson file per date

12. **Type-check** with `pnpm typecheck`, and run `pnpm test src/routes/guides`

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
    { lemma: "λέμμα", english: "english", conjugationFamily: "-ω", cefrLevel: "A1" },
  ],
  nouns: [
    { lemma: "λέμμα", gender: "masculine", english: "english", cefrLevel: "A1" },
  ],
  adverbs: [
    { lemma: "λέμμα", english: "english", cefrLevel: "A1" },
  ],
  adjectives: [
    { lemma: "λέμμα", english: "english", cefrLevel: "A1" },
  ],
  phrases: [
    { text: "multi-word phrase", english: "english", metadata: { ... } },
  ],
  grammarNotes: [
    { pattern: "Pattern name", examples: [...], explanation: "...", section: "past/past-shapes" },
  ],
});
```

See @src/scripts/seed-data/vocabulary/lessons/2024-12-16-comparatives-housing.ts for a complete example.

## Output

After creating the files, summarize what was added:

- Number of verbs, nouns, adjectives, adverbs, phrases
- Key grammar points captured, and the guide section each was sent to
- Any vocabulary that was ambiguous (ask for clarification if needed)
