## Critical Rules

**Makefile first.** Always check the Makefile before running any command.

**Database via Makefile only** — direct `pnpm` commands skip `.env` and hit local instead of Turso.

```bash
# Local (Docker libsql :8080)
make db-push | db-seed | db-setup | db-studio

# Production (Turso)
make prod-db-push | prod-db-seed | prod-db-setup | prod-db-studio
```

**Git:** Use `git mv` to rename/move (preserves history), `git rm` to delete. Never commit without explicit approval.

---

## Code Style

- Self-documenting; comments only for non-obvious logic
- Queen's English (colour, favourite)
- Derive route types from loader: `Route.ComponentProps["loaderData"]`
- Path alias: `@/` → `./src/`
- After changing loaders, run `pnpm react-router typegen` if type errors appear

---

## Routes

Default to **page routes** (loader + action + component) using `<Form>` and `useFetcher`.

**Resource routes** (no component) only for: webhooks, polling endpoints, background jobs.

---

## LLM Context Files

`.llm` files are structured LLM documentation, not rendered.

| File                                         | Purpose                                                |
| -------------------------------------------- | ------------------------------------------------------ |
| `docs/user-flows.llm`                        | Route map, user journeys, data tables — **read first** |
| `src/routes/reference/tabs/*.content.llm`    | Grammar topics                                         |
| `src/routes/learn/phrases/content.llm`       | Phrase tabs                                            |
| `src/routes/learn/conversations/content.llm` | Conversation tabs                                      |
| `src/routes/learn/essentials/content.llm`    | Essentials subtabs                                     |

---

## Educational Design Principles

- **Greek first.** Greek is prominent; English is context, not the focus.
- **Show structure.** Paradigm tables reveal patterns — they are the primary teaching surface.
- **Avoid redundancy.** Two columns showing the same info: remove one.
- **Examples show usage**, not definitions:
  - Good: `μου = my → το σπίτι μου (my house)`
  - Bad: `μου = my → Example: my`

---

## Brand

**Three words:** Scholarly · warm · honest

Like a well-worn study guide — serious, never intimidating, zero gamification. The λ mark anchors it: spare, precise, unmistakably Greek.

**Colour encodes grammar.** Nominative = ocean. Accusative = terracotta. Genitive = olive. Users feel the cases before they read the labels.

**Aesthetic:** Editorial reference materials — a university press study guide. Not a digital product trying to look premium.

**Anti-references:** Duolingo (gamified, cartoon), generic SaaS dashboards (cards, hero metrics, gradients), learning-app defaults (emoji as UX, streaks as manipulation).

---

## Design Principles

1. **Greek is the hero.** English is gloss — smaller, quieter, subordinate.
2. **Structure is pedagogy.** Tables are laid out with typographic precision; the table _is_ the lesson.
3. **Warmth without whimsy.** Scholarly doesn't mean clinical; colour and voice should feel like a trusted teacher.
4. **Honest feedback.** Correct is correct. Incorrect is incorrect. No artificial euphoria, no punishing reds.
5. **Whitespace earns its place.** Every element justifies its presence by helping the learner focus.

---

## PWA Layout

Fixed shell with scrolling inside `.app-main`:

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
