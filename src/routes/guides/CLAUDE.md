# Writing guides

Each guide is a data file, `<slug>.data.ts`, typed by `src/types/guide.ts` and rendered by `components/`. `guides.data.ts` only sets the reading order. `guides.test.ts` guards the structure; run it after any change.

Section ids are keys: lesson notes point at `"<guide>/<section>"`, so never rename one. Add a new id instead, and repoint the notes that belong to it.

## A section's shape

- **One idea per section.** The `rule` states it and stands on its own for a reader who lands there. Exceptions and side rules go in `details`, each with its own label, examples and, where it helps, its own table. When a section starts teaching a second idea with its own table, split it into a new section.
- **One fact, one home.** Before stating a fact, check whether another section already teaches it. If one does, point there (a `confuse` link, or "set out in Who does what, under the article") instead of restating it.
- **No overclaims.** Write "most", not "every", when the rule has exceptions, and say where the exceptions are taught.
- **Text is `GuideText`:** a string is a paragraph; in an array, each string is a paragraph and each nested array is a bulleted list. `_word_` is emphasis. No newlines inside strings.

## Tables

- The row-label column comes first (`Form`, `Who`), the gloss column (`Meaning`) last.
- **A noun's form is not its job.** Marks show the form, and the key says "The ends show the form". Label a paradigm column `Form`, with rows Doer, Target and Owner. Use `Job` only where the rows are sentences in which the noun really does that job. A Target form after a preposition, or a Doer form after είμαι, is the form without the job, so say so.
- Mark a form that breaks the table's pattern with a `note`, at most three per table, and give the reason in `notes`. Don't repeat that reason in the prose.

## Examples

- **One set of nouns per section, swapping their jobs:** ο σκύλος βλέπει τη γάτα, then η γάτα βλέπει τον σκύλο. Use the same nouns in the table, the rule and the examples, so the only thing that changes is the point being taught.
- **Choose examples where the point shows.** To show a change, use a masculine noun, since its article and ending both change. To show that nothing changes, use a neuter noun, and say so in the gloss.
- **Don't let grammar fight meaning.** When gender is the point, avoid nouns whose grammatical gender clashes with real-world sex, such as το κορίτσι or το αγόρι. They belong in the gender sections as surprises in their own right.
- Put the gloss's teaching note in brackets after the translation: "(ένας becomes έναν)".
- Mark the whole phrase, article included, and only the axes the section teaches. See "Grammar Marks, Not Grammar Colour" in the root `CLAUDE.md`.

## Drills

A section with no real drill carries a `plannedDrills` stub, with the id the real drill will take. The test fails once a drill with that id exists, so building the drill forces the stub's removal.

Layout and emphasis rules (the three-unit ceiling, one focal point) live in the `visual-memory-design` skill.
