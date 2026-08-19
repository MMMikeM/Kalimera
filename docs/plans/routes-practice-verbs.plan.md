# Plan: `src/routes/practice/verbs` Alignment & Polish

Audit feedback and implementation plan for `src/routes/practice/verbs/` (`index.tsx`, `ladder.tsx`, `imperatives.tsx`, `modal-constructions.tsx`, `tense-recognition.tsx`, `present/*`, `past/*`, `future/*`, `*.content.llm`).

---

## 1. LLM Context Files

### Issues
- **`imperatives.content.llm`:**
  - Line 25 and line 31 duplicate `κοιτάζω`.
  - Missing `βρίσκω` (`Βρες!`) which is implemented in code.
  - Table has 14 unique verbs instead of 15.
- **`past/aorist-stems.content.llm`:**
  - Lines 30–32 list regular verbs (`γράφω`, `διαβάζω`, `αγοράζω`) that belong in `aorist-formation.tsx`.
  - Missing `μένω`, `καταλαβαίνω`, and `στέλνω`.
- **Missing Context Files:**
  - No `.content.llm` files for `present/`, `future/`, `past/aorist-formation.tsx`, `ladder.tsx`, `modal-constructions.tsx`, or `tense-recognition.tsx`.

### Actions
- [ ] Fix verb inventories in `imperatives.content.llm` and `past/aorist-stems.content.llm`.
- [ ] Add missing context documentation for remaining verb drills.

---

## 2. Design Guidelines, Contrast & Bugs

### Issues
- **Critical Filter Bug in `imperatives.tsx:131-134` (High):**
  - Selecting the category chip `"All 15"` (`id: "full"`) displays only 10 items because items 1–5 have `category: "tier-a"` while items 6–15 have `category: "full"`.
- **Duplicate Drill ID in `verbs/index.tsx:69-74`:**
  - `pastDrills` reuses ID `verbs-conjugation-endings` and incorrectly links to `/practice/verbs/present/conjugations`.
- **Missing `backTo` Props:**
  - `future/conjugation.tsx:20`, `imperatives.tsx:142`, `modal-constructions.tsx:400` are missing `backTo="/practice/verbs"`.
- **Theme Palette Limitations in `<Drill>`:**
  - Verb drills default to `terracotta` / `olive` / `honey` because `<Drill>` lacks `navy`, `slate`, and `sunset` theme support.
- **Missing Explicit Titles / Subtitles:**
  - `present/full.tsx`, `present/vocabulary.tsx`, `past/aorist-conjugation.tsx`, `past/aorist-vocabulary.tsx`, and `future/conjugation.tsx` omit `title` and `subtitle` on `<VocabDrillPage>`.
- **Item Count Mismatch:**
  - `future/formation.tsx:411`: Subtitle states `"40 rules"`, but array contains 35 items.
- **Greeklish / Transliteration Typos:**
  - `imperatives.tsx:90`: `greeklish: "grapso"` → `"grapse"`.
  - `imperatives.tsx:106`: `greeklish: "akouso"` → `"akouse"`.
  - `imperatives.tsx:58`: `id: "fate"` for singular `greek: "Φάε!"` (`fae`).
  - `modal-constructions.tsx:78, 110`: Trailing `w` in `greeklish`.
  - `modal-constructions.tsx:192, 380`: `milisi` / `argisi` → `milisei` / `argisei`.

### Actions
- [ ] Fix category filtering in `imperatives.tsx` so "All 15" includes Tier A items.
- [ ] Fix duplicate drill ID in `verbs/index.tsx:69`.
- [ ] Add explicit `backTo="/practice/verbs"` across all verb drills.
- [ ] Add explicit titles and subtitles to all `<VocabDrillPage>` instances.
- [ ] Correct transliterations and item count subtitles.

---

## 3. Tailwind & Component Architecture

### Actions
- [ ] Extend `<Drill>` theme palette in `drill.tsx` to support `navy` (`verb-active`), `slate` (`verb-contracted`), and `sunset` (`verb-deponent`).
