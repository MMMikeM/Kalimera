## Critical Rules

**Makefile first.** Check Makefile before run any command.

**pnpm only.** Never `npm` / `npx` — use `pnpm` / `pnpm exec` / `pnpm dlx`.

**Database setup (this repo):** `.env` holds **production** Turso credentials (no separate `.env.prod` exists). The `db-*` Makefile targets wrap the commands below; there are no `prod-db-*` targets — they sourced a `.env.prod` that never existed and have been removed.

```bash
# Production (Turso) — drizzle-kit auto-loads `.env`; these hit PROD
pnpm db:push        # or db:studio, db:generate, db:migrate

# Seeding: tsx does not auto-load `.env`, so the script passes it explicitly
pnpm db:seed        # node --env-file=.env --import tsx src/scripts/seed.ts

# Local schema only — a `file:` URL makes drizzle.config.ts drop the auth token,
# so drizzle-kit uses the embedded @tursodatabase/database driver (no Docker)
TURSO_DATABASE_URL=file:./local.db pnpm exec drizzle-kit push

# Seeding and the app itself always hit Turso: src/server/db/index.ts uses the
# HTTP @tursodatabase/serverless driver, which rejects `file:` URLs.

# Or via the Makefile: make db-push · db-seed · db-setup · db-studio · db-push-local
# Ad-hoc SQL against prod, in one transaction: make sql path/to/file.sql
```

The seeders (vocab + verb conjugations) are **idempotent additive upserts**. Re-running against prod is safe — only adds/updates rows, never deletes.

**Connections:** the app shares one Turso connection (`db`, with a one-shot retry for reads). Transactions go through `inTransaction`, which gives each its own connection. See `src/server/db/CLAUDE.md`.

**Git:** `git mv` rename/move (keep history), `git rm` delete. Never commit without approval.

---

## Screenshots

`pnpm screenshots` (desktop 1280×720) or `pnpm screenshots --mobile` (375×812) — Playwright script at `screenshots/capture.ts`. Requires dev server running; `BASE_URL` env overrides `http://localhost:5173`. Logs in via `screenshots/login.ts`, captures ~40 fixed routes as full-page PNGs to `screenshots/desktop/` or `screenshots/mobile/`. Add `--route /reference/cases` to capture one page. It unpins `.app-shell` before each shot, since the fixed shell otherwise clips full-page captures to the viewport.

---

## Duplicate Detection (jscpd)

`pnpm duplicates:llm` (or `make duplicates-llm`) — LLM-friendly output: runs jscpd then prints summary + clone list as `file:start-end <-> file:start-end` pairs (via `scripts/duplicates-summary.ts`). **Always use this**, never read `reports/jscpd/jscpd-report.json` raw (~200K). `duplicates:report` opens the HTML — human use only.

---

## Code Style

- Self-documenting; comments only for non-obvious logic
- Queen's English (colour, favourite)
- Read loader data with `Route.useLoaderData()`; it is typed from the loader
- Reuse the shared components before writing new UI (`src/components/README.md`): `ButtonLink` for navigation that looks like a button, `BackLink`, `PageHeading`, `StatusPage`, `Verdict`, `MarkedGreek`, `SectionIndex`
- Path alias: `@/` → `./src/`
- The Vite plugin regenerates `src/routeTree.gen.ts`; there is no separate typegen script

---

## Routes

TanStack Start with file-based routing; `src/routes/CLAUDE.md` has the patterns.

Default **page routes**: a file route with a `loader` and a component. Mutations are `createServerFn` functions in `src/server/fns/*`, called from components.

**Endpoints** (a file route with `server.handlers`, e.g. `/api/errors`) only for: webhooks, polling endpoints, background jobs.

**Nesting comes from the file tree.** A folder without a `route.tsx` adds path segments but no parent route, so `..` from `practice/cases/accusative/noun` does not land on `/practice/cases`. Drills pass an explicit `backTo` instead.

**Colocate data with its owner** — don't create a central registry file that combines unrelated data from multiple modules. Each route/component owns its own data; a combined view (e.g. `practice/drill-catalogue.data.ts`) is derived from the owners, not the primary source. A god file that knows about cases, pronouns, verbs, AND blocks is the wrong abstraction.

**Router devtools ship to production on purpose** (`TanStackRouterDevtoolsInProd` in `__root.tsx`). Don't remove, gate or flag the badge.

---

## LLM Context Files

`.llm` files = structured LLM docs, not rendered.

| File                                         | Purpose                                                |
| -------------------------------------------- | ------------------------------------------------------ |
| `docs/user-flows.llm`                        | Route map, user journeys, data tables — **read first** |
| `src/routes/reference/content.llm`           | Reference index and tabs                               |
| `src/routes/reference/tabs/*.content.llm`    | Grammar topics                                         |
| `src/routes/learn/content.llm`               | Learn index                                            |
| `src/routes/learn/phrases/content.llm`       | Phrase tabs                                            |
| `src/routes/learn/conversations/content.llm` | Conversation tabs                                      |
| `src/routes/learn/essentials/content.llm`    | Essentials subtabs                                     |
| `src/routes/practice/content.llm`            | Practice routes and the drill engine                   |
| `src/routes/practice/**/*.content.llm`       | Individual drill groups                                |

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
  tone. Its gender and case tones (`tone="masculine"`, `tone="genitive"`) are legacy
  grammar colour; new work marks grammar with `<GrammarMark>`.
- `<Pronunciation greek={…} />` — the gloss. Derives its own string and underlines the
  stressed run. Underline, not bold: bold reads as emphasis on the form, not as stress.
- `<GreekGloss greek={…} />` — the two paired.
- `<GrammarMark case={…}>` — a Greek phrase with its case, number and gender marked
  beneath it. See "Grammar Marks, Not Grammar Colour".

`pnpm lint:greek` enforces this.

**Never edit Greek content to make a drill pass.** If a card is unpassable the matcher
is wrong, not the Greek. Greek strings keep their authentic `;` and their tonos; the
gloss strips punctuation itself. There is no stored `greeklish` field — it is derived.

---

## Grammar Marks, Not Grammar Colour

Grammar is shown by `<GrammarMark>`, a line under a Greek phrase:

| Channel   | Shows  | Values                                                                        |
| --------- | ------ | ----------------------------------------------------------------------------- |
| End shape | Case   | `<->` Doer · `>-<` Target · `o-o` Owner · `!-!` Calling (vocative)            |
| Lines     | Number | one line = one · two lines = more than one                                    |
| Colour    | Gender | on the mark only, from `GENDER_MARK`; omit `gender` and the mark claims none |

```tsx
<GrammarMark case="accusative" gender="feminine" plural>τις γυναίκες</GrammarMark>
```

Mark the whole phrase, article included. Show only the axes the page teaches: a page about
case passes no `gender`. Marks are for nouns, articles, adjectives and pronouns; do not give
them a second meaning on verb pages. A marked phrase never wraps. `/specimens/grammar-mark`
(dev only) shows every case and edge case, and `e2e/grammar-mark.spec.ts` photographs it.

**Colour carries no grammar any more** outside a mark's gender, and a guide section that teaches one
gender's nouns, whose header takes that gender's pale scale (`tone: "gender-masculine"`). The palette is open for the
redesign, with no semantic constraints on it. The case scales are gone: pages built before the
marks still name `case-*` classes, which now render no colour until those pages are redesigned.
The `gender-*` scales stay, because the marks use them.

What still holds, because it is accessibility rather than grammar:

- Never put opacity on a `-text` token — it breaks AAA. `docs/design-guidelines.md` has the
  palette and contrast figures.
- Feedback text uses `text-correct-text` / `text-incorrect-text`; the bare `correct` /
  `incorrect` tokens are for bars, borders and icons.
- Ramps are not calibrated against each other: `honey-100` carries about four times the
  chroma of `ocean-100`. Check chroma, not just step number.

---

## Case Terminology

Two vocabularies in use — both correct, different contexts:

| Grammatical term | Learner label | Mark  | Route segment  |
| ---------------- | ------------- | ----- | -------------- |
| Nominative       | Doer          | `<->` | `nominative/*` |
| Accusative       | Target        | `>-<` | `accusative/*` |
| Genitive         | Owner         | `o-o` | `genitive/*`   |
| Vocative         | Calling       | `!-!` | —              |

**Routes use grammatical terms** (`practice/cases/accusative/noun`). **UI uses learner labels** ("Target", "Doer", "Owner") — never assume the learner knows "accusative". Verb conjugations use **uncontracted forms** (αγαπάω, μιλάω) not contracted (αγαπώ, μιλώ).

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

**Marks encode grammar.** Each case has one end shape everywhere, so learners read the case before the label. See "Grammar Marks, Not Grammar Colour".

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

- `.app-shell` — fixed to the top and sides, `height: 100dvh`, overflow hidden
- `.app-main` — flex-1, overflow-y auto (scroll container)
- `.safe-area-pb` — padding for mobile safe area
