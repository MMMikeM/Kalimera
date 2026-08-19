# Plan: `src/routes/practice/blocks` Alignment & Polish

Audit feedback and implementation plan for `src/routes/practice/blocks/` (`index.tsx`, `days-of-week.tsx`, `numbers.tsx`, `chunks.tsx`, `opposites.tsx`, `question-words/*`, `*.content.llm`).

---

## 1. LLM Context Files

### Issues
- **Missing `.content.llm` Files:**
  - `opposites.content.llm` and `question-words.content.llm` are missing.
- **Discrepancies in `chunks.content.llm` vs `chunks.tsx`:**
  - `I'm fine | Είμαι καλά` documented in `.llm:24` is missing from `chunks.tsx`.
  - Item count and group descriptions drift.
- **Discrepancies in `days-of-week.content.llm`:**
  - Outdated notes listing time expressions as an unimplemented extension (implemented in `days-of-week.tsx`).
- **Discrepancies in `numbers.content.llm`:**
  - Documents dual forms (e.g. `ένα / μία`), whereas code implements canonical neuter forms.

### Actions
- [x] Add `opposites.content.llm` and `question-words.content.llm`. (Question-words file written as `question-words/content.llm` — repo convention is `content.llm` inside a directory of drills, matching `practice/content.llm` and `learn/phrases/content.llm`; `*.content.llm` is for a single sibling drill file. `opposites.content.llm` documents the DB-driven item source — `OPPOSITE_PAIRS` in `src/scripts/seed-data/vocabulary/opposites.ts` — rather than duplicating the pair list.)
- [x] Synchronise `chunks.content.llm`, `days-of-week.content.llm`, and `numbers.content.llm` with source code. (Code treated as source of truth: `Είμαι καλά` documented as not-implemented rather than added; days-of-week time expressions moved from "optional extension" to implemented; numbers Set A table reduced to the canonical neuter forms with variants moved into a "not seeded" section. Also folded in the two stale "reference only / no drill exists" lines.)

---

## 2. Design Guidelines, Typography & Critical Bug

### Issues
- **Critical Defect: Greek Semicolon Punctuation in `chunks.tsx` (High):**
  - Lines 90, 115, 123, 131, 156, 164, 196 contain Greek question marks (`;`) in their `greek` string (e.g. `Τι κάνεις;`, `Πού είναι;`, `Πόσο κάνει;`).
  - Phonetic conversion does not strip `;`, converting `Τι κάνεις;` to `"ti kanis;"`. In forward typing mode, typing `"ti kanis"` fails validation.
- **Font Stack Violation in `opposites.tsx:65, 68`:**
  - Applies `font-serif` to Greek vocabulary prompts and English glosses. Greek vocab must use `font-sans` with `.greek-text`, and glosses must use standard muted sans.
  - Straight ASCII quotes `"{card.sourceEnglish}"` used on glosses.
- **Missing `backTo` Props:**
  - `days-of-week.tsx`, `numbers.tsx`, and `chunks.tsx` omit `backTo="/practice/blocks"`.
- **Delimiter Inconsistency:**
  - `index.tsx:19`: `numbers` preview uses commas and ellipsis (`ένα, δύο…`), whereas all other drills use middle dots (`·`).

### Actions
- [x] Strip `;` from `greek` match targets in `chunks.tsx` (keep `;` only in display labels). (Bug confirmed: `drill.tsx:174` calls `matchPhonetic(input, form.greek)` and `greekToPhonetic` passes `;` through. All 7 stripped; verified with a throwaway script that each item's `greeklish` now matches. That check also caught two pre-existing failures in the same file — `Συγγνώμη`/"signomi" and `Πώς λέγεται`/"pos legetai" were unpassable for unrelated transliteration reasons; corrected to "singnomi" and "pos leyetai".)
- [x] Remove `font-serif` from Greek prompts and glosses in `opposites.tsx`. (Body font is DM Sans via `--font-sans`, so bare removal is correct — no explicit `font-sans` needed. Straight ASCII quotes on the gloss also replaced with typographic quotes.)
- [x] Add `backTo="/practice/blocks"` to all block drills. (Added to `chunks.tsx`, `days-of-week.tsx`, `numbers.tsx`; `opposites.tsx` already had it.)
- [x] Standardise preview delimiter on middle dot `·` in `index.tsx`.

---

## 3. Tailwind & Component Architecture

### Issues
- Duplicate inline `Paradigm` component between `which-forms.tsx:57-105` and `how-many-forms.tsx:47-93`.

### Actions
- [x] Extract a reusable `QuestionWordParadigm` component or `tv()` table structure for question word forms. (New `question-words/components/paradigm.tsx` — excluded from route discovery by `routeFileIgnorePattern`. Takes `caption`, `columns`, `rows` and the footnote as `children`, so it serves both the 4-column ποιος table and the 2-column πόσος table. Shared `practice/components/ParadigmTable.tsx` was not reusable: its axes are transposed (gender as columns) and its column headers are fixed to three genders with different colour tokens.)
