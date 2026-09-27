# Adding Lesson Vocabulary

Create a new file following this naming convention:

```text
YYYY-MM-DD-topic.ts
```

## Template

```typescript
import { createLesson } from "@/types/lesson-builder";

export const LESSON_YYYY_MM_DD = createLesson({
	meta: {
		date: "YYYY-MM-DD",
		topic: "Description of lesson topic",
		source: "Weekly lesson / Self-study / etc.",
	},

	nouns: [{ lemma: "σπίτι", gender: "neuter", english: "house", cefrLevel: "A1" }],

	verbs: [
		{ lemma: "τρώω", english: "I eat", conjugationFamily: "irregular", cefrLevel: "A1" },
	],

	phrases: [{ text: "Καλημέρα", english: "Good morning" }],
});
```

`createLesson` checks the object against `Lesson` in `src/types/lesson-seed.ts`, which also allows `adverbs`, `adjectives` and `grammarNotes`. Verbs, nouns, adverbs and adjectives require `cefrLevel`; phrases (`Phrase`, from `src/types/phrase.ts`) may omit it.

## After creating the file

1. Nothing to register. `lessons/index.ts` reads this directory, loads every file whose name starts with a `YYYY-MM-DD` date, and takes the export named `LESSON_YYYY_MM_DD` from the filename's date. The filename date and the export name must match, or seeding fails; one lesson file per date.

2. Run `pnpm typecheck`.

3. Run seed: `pnpm db:seed`. This writes to the production Turso database in `.env`. The seed is an additive upsert, so re-running it only adds and updates rows.
