# WIP: Impeccable upgrade and UI review (hand-off)

This is a hand-off from a claude.ai/code cloud session (27 Sep 2026) to an agent on Mike's local machine. It is a working folder and not meant to be merged as-is. Delete `wip/` once the work lands.

## The original ask (Mike)

> Are we on the latest version of Impeccable? Update for us, then run it over a few pages and let's find opportunity to improve the ui

## Status at hand-off

| Step                                | State                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| Check the Impeccable version        | Done. The repo has skill **3.0.7**; the latest release is **4.3.1**.               |
| Upgrade Impeccable                  | **Not done.** Blocked in the cloud session (details below). Needs Mike's decision. |
| Critique of 4 public pages          | Done with 3.0.7: `critique.md`, score **19/40**.                                   |
| Deterministic scan                  | Done as a grep-based stand-in for the detector: `detector-scan.md`.                |
| "Ask the user" step of the critique | **Open.** Four questions at the end of `critique.md`.                              |
| Any fixes to app code               | **None made.** Nothing under `src/` was changed.                                   |

## What's in this folder

| Path                        | What                                                                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `critique.md`               | The full critique: heuristic scores, anti-pattern verdict, P1/P2 issues with file:line and fixes, personas, open questions, draft plan. |
| `detector-scan.md`          | Rule-by-rule findings (em dashes, contrast, touch targets, false case colouring, global key handlers, debug strings …).                 |
| `impeccable-upgrade.md`     | Version facts, why the upgrade was blocked, exactly what `impeccable update` will change, v3 to v4 changes that matter, housekeeping.   |
| `scripts/review-capture.ts` | Playwright harness that re-captures every screenshot and re-runs the Enter-key bug repro.                                               |
| `screenshots/`              | 35 PNGs from the local run. Fonts are fallbacks (see caveats).                                                                          |

Screenshot names are `<desktop|mobile>-<page>-<n>.png`. The `n` counts viewport-height scroll steps inside `.app-main`. Other files:

- `*-try-question`, `*-try-correct`, `*-try-wrong`: drill states.
- `desktop-repro-enter-in-search.png`: the bug.
- `*-essentials-numbers-0.png`: the root error boundary with no database.

## Suggested next steps for the local agent

1. **Read `critique.md`**, then ask Mike (or Chrys) the four open questions at its end. Use AskUserQuestion. Do not start fixing before the streaks and priority answers, because they change the plan.
2. **Upgrade.** Explain the upgrade using `impeccable-upgrade.md` and let Mike run it or approve it. **Do not run it unprompted:** it was denied in the originating session.
3. **Refresh context, if upgraded.** Fix the PRODUCT.md drift, run `/impeccable document` for a DESIGN.md, and `git rm .impeccable.md`.
4. **Re-check the numbers.** Re-run the capture script (below). Ideally also run the real `impeccable detect` and `/impeccable critique` on 4.3.1, and compare with the 19/40 baseline.
5. **Fix, in the order Mike picks.** The draft order in `critique.md` is:
   1. harden: key handlers, error boundary, 404
   2. colorize: case-bearing spans only
   3. layout: article paradigm grid
   4. clarify: `/try` copy, em dashes, metalanguage second
   5. distill: landing and essentials
   6. polish

The one confirmed functional bug worth fixing regardless of other priorities: **Enter in the header search submits a blank drill answer** (`src/routes/practice/components/engines/drill-hooks.ts:76-82`, and `drill.tsx:175-185` for Space during feedback). The repro script exits 1 while it's present and 0 once fixed.

## Re-running the captures locally

```bash
make dev                      # or: pnpm dev (needs a real .env for DB-backed pages)
pnpm exec tsx wip/impeccable-review/scripts/review-capture.ts all      # or pages | drill | repro
# output: screenshots/review/ (gitignored). Override with OUT_DIR=..., BASE_URL=...
BASE_URL=https://kalimera.fly.dev pnpm exec tsx wip/impeccable-review/scripts/review-capture.ts pages
```

Running captures against prod was OK'd in the session (`kalimera.fly.dev`) for public pages. The cloud sandbox could not reach it. The drill states use `/try`, which is anonymous and keeps attempts client-side.

## Caveats about the evidence

- **Placeholder env.** The app ran without the database, using `SESSION_SECRET` set to a dummy string and `TURSO_DATABASE_URL=https://offline.invalid`. `/`, `/try`, `/reference/cases` and `/learn/essentials` rendered normally. `/learn/essentials/:subtab` needs Turso, so it was **not reviewed**; it shows the error boundary instead.
- **Fallback fonts.** Google Fonts failed in the sandbox browser (TLS interception by the proxy), so screenshots use DejaVu fallbacks, not Cormorant Garamond / DM Sans. Judge typography from code or fresh local captures.
- **Full-page capture.** Full-page screenshots of the flattened app shell only painted the first viewport in headless Chromium, which is why the script steps through `.app-main` in viewport-sized frames. `screenshots/capture.ts` (the repo's own script) may have the same problem; worth a look.
- **Scope.** Logged-in surfaces (dashboard, `/practice/*`, `/progress`) were not reviewed.

## Environment gotchas found along the way

- **Dev server rewrites the route tree.** Running `pnpm dev` rewrites `src/routeTree.gen.ts` with different formatting (about 3.5k lines of diff and no route changes). Restore it with `git checkout -- src/routeTree.gen.ts` unless routes really changed.
- **Node version.** `package.json` wants Node ≥ 26. The sandbox had 22, and dev still worked, with warnings.
- **Stopping Vite.** `pkill -f "vp dev"` kills only the wrapper. Vite (`…/vite-plus-core/…/cli.js dev`) keeps running and keeps regenerating the route tree, so kill it by PID.
- **No `.env` in cloud sessions.** Only `.env.example` exists, so DB-backed routes 500.

## House rules to keep in mind (from CLAUDE.md and Mike's preferences)

- pnpm only (`pnpm dlx`, never `npx`). Check the Makefile first. Never commit without approval; use `git mv` / `git rm`.
- British spelling. **No em dashes** in copy or prose.
- Greek rendering goes through `<GreekText>`, `<Pronunciation>` and `<GreekGloss>`, never the transliteration helpers directly. `pnpm lint:greek` enforces it.
- Never edit Greek content to make a drill pass.
- Colour: the `case-*` and `gender-*` role tokens make grammatical claims. Use the base palette for everything else. See `src/constants/grammar-palette.ts` and `docs/design-guidelines.md`.
- UI leads with Doer / Target / Owner. Grammar terms are secondary labels.
- Relevant project skills:
  - `visual-memory-design`: memory profile; relevant to motion and colour choices.
  - `greek-curriculum-expert`: for the "Before μου" trigger wording.
  - `intrinsic-motivation-design`: for the streaks question.
