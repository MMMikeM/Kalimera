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

9. **Update the index** at: `src/scripts/seed-data/vocabulary/lessons/index.ts`
   - Add import
   - Add to export block
   - Add to LESSONS object

10. **Type-check** with `pnpm tsc --noEmit`

## Reference format

Use @src/scripts/seed-data/vocabulary/lessons/2024-12-09-countries-languages.ts as the template for structure and formatting.

## Output

After creating the files, summarize what was added:

- Number of verbs, nouns, adjectives, adverbs, phrases
- Key grammar points captured
- Any vocabulary that was ambiguous (ask for clarification if needed)
