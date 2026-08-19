# Plan: `src/routes/practice/cases` Alignment & Polish

Audit feedback and implementation plan for `src/routes/practice/cases/` (`index.tsx`, `nominative/*`, `accusative/*`, `genitive/*`, `review/*`, `*.content.llm`).

---

## 1. LLM Context Files

### Issues
- **Missing `.content.llm` Files:**
  - Only `nominative/noun.content.llm` exists.
  - Missing context files for `nominative/{article,adjective,phrase}`, `accusative/{noun,article,adjective,phrase}`, `genitive/{noun,article,adjective,phrase}`, and `review/{nouns,articles,adjectives,phrases}`.
- **Accuracy Drifts in `nominative/noun.content.llm`:**
  - Lines 15–57 describe a static 30-noun set, but `noun.tsx` dynamically queries user SRS with CEFR fallback via `getNounDrillItemsFn`.
  - Lines 61–63 describe typing/selecting M/F/N, whereas `noun.tsx` uses single-select gender option chips (`Masculine (ο)`, `Feminine (η)`, `Neuter (το)`).

### Actions
- [ ] Update `nominative/noun.content.llm` to reflect the dynamic SRS seeder pool architecture.
- [ ] Add consolidated case-level context documentation (`nominative.content.llm`, `accusative.content.llm`, `genitive.content.llm`, `cases-review.content.llm`).

---

## 2. Design Guidelines, Contrast & Bugs

### Issues
- **Navigation Self-Loop (High):**
  - `cases/index.tsx:139`: `<GroupSection title="The case system" returnTo={Route.fullPath}>` passes `returnTo="/practice/cases/"`, creating an infinite loop when clicking "← back". Should be `returnTo="/practice"`.
- **Palette & Contrast Violations:**
  - `nominative/noun.tsx:41`: Sets `colorTheme="honey"` instead of `colorTheme="ocean"`.
  - `review/articles.tsx:216-218`: Paradigm table headers use verb palette tokens (`text-navy-text`, `text-sunset-text`, `text-slate-text`) instead of gender role tokens (`text-gender-masculine-text`, `text-gender-feminine-text`, `text-gender-neuter-text`).
  - `review/articles.tsx:255`: Sets `bg-terracotta-100 text-terracotta-text` for the number dimension selector, colliding with Accusative case.
  - `review/articles.tsx:223`: Uses low-contrast `border-stone-100`.
- **Educational Labels & Titles:**
  - `nominative/noun.tsx:39`: Omits learner label "Doer" (uses `"Nominative Nouns"` vs `"Noun (Doer)"`).
  - `nominative/adjective.tsx:201`: Omits learner label (uses `"Adjective agreement"` vs `"Adjective (Doer)"`).
  - `review/adjectives.tsx:21`: Passes `category="nouns"` into `<VocabDrillPage>`, displaying the wrong header `"Nouns drill"`.
  - `review/phrases.tsx:65`: Subtitle states `"45 noun phrases"`, but code concatenates 90 items.
- **Code Typos & Stray Logs:**
  - `nominative/noun.tsx:33`: Stray `console.log({ items });`.
  - `nominative/adjective.tsx:82` & `accusative/adjective.tsx:82`: Typo `greeklish: "omorhes"` instead of `"omorfes"`.
  - `genitive/phrase.tsx:187`: Typo `id: "mikron-skylaon"` instead of `"mikron-skylon"`.
  - `nominative/noun.tsx:37`: `drillId="nominative-nouns"` mismatches loader/index (`"articles-noun-genders"`).

### Actions
- [ ] Fix navigation self-loop in `cases/index.tsx:139` to `returnTo="/practice"`.
- [ ] Set `colorTheme="ocean"` on `nominative/noun.tsx`.
- [ ] Align gender table headers in `review/articles.tsx` to `gender-*` tokens.
- [ ] Fix `category="adjectives"` in `review/adjectives.tsx`.
- [ ] Remove `console.log` and fix typos in adjective/phrase drills.
- [ ] Add explicit `backTo="/practice/cases/"` across review drills.

---

## 3. Tailwind & Component Architecture

### Issues
- Template string concatenations in `review/articles.tsx:224`.
- Ad-hoc dimension selector style maps in `review/phrases.tsx:34-53`.

### Actions
- [ ] Refactor review dimension chips to use a shared `tv()` variant across case review drills.
