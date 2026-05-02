## Critical Rules

**Makefile first.** Check Makefile before run any command.

**Database via Makefile only** — direct `pnpm` skip `.env`, hit local not Turso.

```bash
# Local (Docker libsql :8080)
make db-push | db-seed | db-setup | db-studio

# Production (Turso)
make prod-db-push | prod-db-seed | prod-db-setup | prod-db-studio
```

**Git:** `git mv` rename/move (keep history), `git rm` delete. Never commit without approval.

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
