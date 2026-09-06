## Critical Rules

**Makefile first.** Check Makefile before run any command.

**pnpm only.** Never `npm` / `npx` — use `pnpm` / `pnpm exec` / `pnpm dlx`.

**Database setup (this repo):** `.env` holds **production** Turso credentials (no separate `.env.prod` exists). The `db-*` Makefile targets wrap the commands below; there are no `prod-db-*` targets — they sourced a `.env.prod` that never existed and have been removed.

```bash
# Production (Turso) — drizzle-kit auto-loads `.env`; these hit PROD
pnpm db:push        # or db:studio, db:generate, db:migrate

# Seeding needs the env passed explicitly — `pnpm db:seed` does NOT load `.env`
node --env-file=.env --import tsx src/scripts/seed.ts

# Local schema only — a `file:` URL makes drizzle.config.ts drop the auth token,
# so drizzle-kit uses the embedded @tursodatabase/database driver (no Docker)
TURSO_DATABASE_URL=file:./local.db pnpm exec drizzle-kit push

# Seeding and the app itself always hit Turso: src/server/db/index.ts uses the
# HTTP @tursodatabase/serverless driver, which rejects `file:` URLs.

# Or via the Makefile: make db-push · db-seed · db-setup · db-studio · db-push-local
```

The seeders (vocab + verb conjugations) are **idempotent additive upserts**. Re-running against prod is safe — only adds/updates rows, never deletes.

**Git:** `git mv` rename/move (keep history), `git rm` delete. Never commit without approval.

---

## Screenshots

`pnpm screenshots` (desktop 1280×720) or `pnpm screenshots --mobile` (375×812) — Playwright script at `screenshots/capture.ts`. Requires dev server running; `BASE_URL` env overrides `http://localhost:5173`. Logs in via `screenshots/login.ts`, captures ~30 fixed routes as full-page PNGs to `screenshots/desktop/` or `screenshots/mobile/`. For a single ad-hoc page, write a one-off Playwright script reusing `loginWithCredentials`.

---

## Duplicate Detection (jscpd)

`pnpm duplicates:llm` (or `make duplicates-llm`) — LLM-friendly output: runs jscpd then prints summary + clone list as `file:start-end <-> file:start-end` pairs (via `scripts/duplicates-summary.ts`). **Always use this**, never read `reports/jscpd/jscpd-report.json` raw (~200K). `duplicates:report` opens the HTML — human use only.

---

## Code Style

- Self-documenting; comments only for non-obvious logic
- Queen's English (colour, favourite)
- Read loader data with `Route.useLoaderData()`; it is typed from the loader
- Path alias: `@/` → `./src/`
- The Vite plugin regenerates `src/routeTree.gen.ts`; there is no separate typegen script

---

## Routes

Default **page routes** (loader + action + component) with `<Form>` and `useFetcher`.

**Resource routes** (no component) only for: webhooks, polling endpoints, background jobs.

**`prefix()` is URL namespacing only** — it does not create a parent route. If `..` should land on `/practice/cases`, then `cases` must be an actual `route()` parent with drills as children, not a `prefix("cases", [...])`. Flat prefix routes are siblings of `practice`, not children of `cases`.

**Colocate data with its owner** — don't create a central registry file that combines unrelated data from multiple modules. Each route/component owns its own data; a combined view (e.g. `drill-lookup.ts`) is derived from the owners, not the primary source. A god file that knows about cases, pronouns, verbs, AND blocks is the wrong abstraction.

---

## LLM Context Files

`.llm` files = structured LLM docs, not rendered.

| File                                         | Purpose                                                |
| -------------------------------------------- | ------------------------------------------------------ |
| `docs/user-flows.llm`                        | Route map, user journeys, data tables — **read first** |
| `src/routes/reference/tabs/*.content.llm`    | Grammar topics                                         |
| `src/routes/learn/phrases/content.llm`       | Phrase tabs                                            |
| `src/routes/learn/conversations/content.llm` | Conversation tabs                                      |
| `src/routes/learn/essentials/content.llm`    | Essentials subtabs                                     |

---

## Greek Rendering — Two Conventions

Two transliteration helpers exist with **opposite jobs**. Using the wrong one shipped
`pws` and `thelw` to learners for months.

| Module                             | Function               | Job                                                                                                      |
| ---------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `src/lib/greek-transliteration.ts` | `greekToPhonetic`      | **Matching only.** Reversible keyboard spelling (η→h, ω→w). `πώς` → `pws`. Never render it.              |
| `src/lib/greek-phonetic.ts`        | `greekToPronunciation` | **Display only.** Pronunciation gloss (η→i, ω→o, γ→y/gh). `πώς` → `pos`. Lossy — never match against it. |

`matchPhonetic` is the answer grader and may be imported anywhere.

**Never import either helper in a component.** Rendering goes through:

- `<GreekText>` — all Greek script. Owns `lang="el"`, the `greek-text` class, size and
  tone. Greek-ness and grammar colour are separate props (`tone="masculine"`,
  `tone="genitive"`), never fused.
- `<Pronunciation greek={…} />` — the gloss. Derives its own string and underlines the
  stressed run. Underline, not bold: weight is load-bearing in paradigm tables.
- `<GreekGloss greek={…} />` — the two paired.

`pnpm lint:greek` enforces this.

**Never edit Greek content to make a drill pass.** If a card is unpassable the matcher
is wrong, not the Greek. Greek strings keep their authentic `;` and their tonos; the
gloss strips punctuation itself. There is no stored `greeklish` field — it is derived.

---

## Colour — Two Palettes

Two colour systems exist and they are **not** interchangeable. Reaching for the wrong one
is the colour equivalent of shipping `pws` to a learner.

| Palette                                                     | Tokens                                                                                                                    | Job                                                                                                |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Reserved role tokens** (`@theme static`, `src/index.css`) | `case-nominative-*`, `case-accusative-*`, `case-genitive-*`, `gender-masculine-*`, `gender-feminine-*`, `gender-neuter-*` | **Grammatical claims only.** Applying one asserts that the Greek it wraps has that case or gender. |
| **Base palette**                                            | `cream`, `terracotta`, `sunset`, `olive`, `ocean`, `honey`, `navy`, `slate`, `stone`                                      | **Everything else.** Nav, chrome, buttons, section grouping, page-local axes. Asserts nothing.     |

**The rule:** a colour used as fill, background or border around Greek grammatical content
asserts that content's grammatical value. If the assertion would be false, use the base
palette or neutral stone. `src/index.css` states this above the `@theme static` block, and
`src/constants/grammar-palette.ts` is the only place that should map a grammar role to a
token.

The base palette is **not** off-limits. It is the sanctioned choice for anything that is
not making a grammatical claim, and `grammar-palette.ts` already uses it that way for
page-local axes: `verb-active` → `navy`, `verb-contracted` → `slate`, `verb-deponent` →
`sunset`, `decision` → `honey`.

Do not reason from hue. `ocean` and `case-nominative` are both around hue 223, but they
are different tokens with different jobs; the same goes for `olive` / `case-genitive`.

Two practical notes:

- Ramps are not calibrated against each other. `honey-100` carries roughly four times the
  chroma of `ocean-100` or `olive-100`, so a set of sibling tints picked at the same step
  will not read as balanced. Check chroma, not just step number.
- Never put opacity on a `-text` token — it breaks AAA. `docs/design-guidelines.md` has the
  full palette, the AAA variants and the component-level assignments; read it before
  choosing a colour.

---

## Case Terminology

Two vocabularies in use — both correct, different contexts:

| Grammatical term | Learner label | Role token          | Route segment  |
| ---------------- | ------------- | ------------------- | -------------- |
| Nominative       | Doer          | `case-nominative-*` | `nominative-*` |
| Accusative       | Target        | `case-accusative-*` | `accusative-*` |
| Genitive         | Owner         | `case-genitive-*`   | `genitive-*`   |

The role tokens are their own scales, **not** `ocean` / `terracotta` / `olive` — see
"Colour — Two Palettes" above.

**Routes use grammatical terms** (`practice/cases/accusative-noun`). **UI uses learner labels** ("Target", "Doer", "Owner") — never assume the learner knows "accusative". Verb conjugations use **uncontracted forms** (αγαπάω, μιλάω) not contracted (αγαπώ, μιλώ).

---

## Educational Design Principles

- **Greek first.** Greek prominent; English context, not focus.
- **No metalanguage assumed.** Learner does NOT reliably know grammar terms (nominative, accusative, genitive, subject, direct object, case). Lead with plain-English handles (Doer/Target/Owner/"who's doing the action"); Greek grammar terms attach as labels bound to those handles, never as primary anchor.
- **Show structure.** Paradigm tables reveal patterns — primary teaching surface.
- **Avoid redundancy.** Two columns same info: drop one.
- **Examples show usage**, not definitions:
  - Good: `μου = my → το σπίτι μου (my house)`
  - Bad: `μου = my → Example: my`

---

## Brand

**Three words:** Scholarly · warm · honest

Like well-worn study guide — serious, never intimidating, zero gamification. λ mark anchor: spare, precise, unmistakably Greek.

**Colour encodes grammar.** The reserved `case-*` and `gender-*` role tokens mean one thing each, everywhere. Users feel cases before they read labels. See "Colour — Two Palettes".

**Aesthetic:** Editorial reference — university press study guide. Not digital product faking premium.

**Anti-references:** Duolingo (gamified, cartoon), generic SaaS dashboards (cards, hero metrics, gradients), learning-app defaults (emoji as UX, streaks as manipulation).

---

## Design Principles

1. **Greek is hero.** English = gloss — smaller, quieter, subordinate.
2. **Structure is pedagogy.** Tables typographically precise; table _is_ lesson.
3. **Warmth without whimsy.** Scholarly ≠ clinical; colour and voice feel like trusted teacher.
4. **Honest feedback.** Correct is correct. Incorrect is incorrect. No fake euphoria, no punishing reds.
5. **Whitespace earns place.** Every element justify presence by helping learner focus.

---

## PWA Layout

Fixed shell, scroll inside `.app-main`:

```tsx
<div className="app-shell">
	<main className="app-main">{/* scrollable */}</main>
	<nav className="fixed bottom-0">{/* mobile nav */}</nav>
</div>
```

CSS classes (in `src/index.css`):

- `.app-shell` — fixed, inset-0, overflow hidden
- `.app-main` — flex-1, overflow-y auto (scroll container)
- `.safe-area-pb` — padding for mobile safe area
