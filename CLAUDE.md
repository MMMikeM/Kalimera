## Critical Rules

**Makefile first.** Check Makefile before run any command.

**Database setup (this repo):** `.env` holds **production** Turso credentials (no separate `.env.prod` exists). The `prod-db-*` Makefile targets fail (`.env.prod: No such file`).

```bash
# Production (Turso) — `.env` is auto-loaded by drizzle-kit
make db-push | db-seed | db-setup | db-studio   # ← these hit PROD

# Local (Docker libsql :8080) — rename `.env` so drizzle falls back to localhost
docker compose up -d libsql                     # one-time
mv .env .env.bak && make db-push && make db-seed; mv .env.bak .env

# DO NOT use `make prod-db-*` — they require a `.env.prod` that doesn't exist.
```

The seeders (vocab + verb conjugations) are **idempotent additive upserts**. Re-running against prod is safe — only adds/updates rows, never deletes.

**Git:** `git mv` rename/move (keep history), `git rm` delete. Never commit without approval.

---

## Duplicate Detection (jscpd)

`pnpm duplicates:llm` (or `make duplicates-llm`) — LLM-friendly output: runs jscpd then prints summary + clone list as `file:start-end <-> file:start-end` pairs (via `scripts/duplicates-summary.ts`). **Always use this**, never read `reports/jscpd/jscpd-report.json` raw (~200K). `duplicates:report` opens the HTML — human use only.

---

## Code Style

- Self-documenting; comments only for non-obvious logic
- Queen's English (colour, favourite)
- Derive route types from loader: `Route.ComponentProps["loaderData"]`
- Path alias: `@/` → `./src/`
- After loader change, run `pnpm react-router typegen` if type errors

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

## Case Terminology

Two vocabularies in use — both correct, different contexts:

| Grammatical term | Learner label | Colour     | Route segment  |
| ---------------- | ------------- | ---------- | -------------- |
| Nominative       | Doer          | ocean      | `nominative-*` |
| Accusative       | Target        | terracotta | `accusative-*` |
| Genitive         | Owner         | olive      | `genitive-*`   |

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

**Colour encodes grammar.** Nominative = ocean. Accusative = terracotta. Genitive = olive. Users feel cases before read labels.

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
