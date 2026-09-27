# Impeccable: version state and upgrade notes

## Where things stand

| Piece               | In this repo                                     | Latest released (checked 27 Sep 2026)             |
| ------------------- | ------------------------------------------------ | ------------------------------------------------- |
| Skill               | **3.0.7** (`.claude/skills/impeccable/SKILL.md`) | **4.3.1** (git tag `skill-v4.3.1`, 8 Sep 2026)    |
| CLI (`impeccable`)  | not a dependency                                 | 4.1.0 on npm (a small launcher)                   |
| Engine (native bin) | none; v3 used Node scripts in `scripts/`         | 0.1.5 (pinned by skill 4.3.1's `scripts/VERSION`) |

The Impeccable repo's `main` is already "preparing 4.4.0" (engine 0.1.6), but that version is not tagged or released. Stick to the released 4.3.1.

**Nothing was upgraded.** The repo still has 3.0.7, unchanged.

## Why the cloud session could not upgrade

1. `impeccable update` downloads the skill bundle from `impeccable.style`, which the cloud environment's network policy blocks (`kalimera.fly.dev` is blocked too).
2. The CLI supports a local bundle through `IMPECCABLE_BUNDLE_PATH`. The session cloned `github.com/pbakaus/impeccable` at `skill-v4.3.1` and tried `pnpm dlx impeccable@4.1.0 update --project -y --no-hooks` with that path. **The session's permission classifier denied running the downloaded CLI against the repo.** The upgrade was then left for Mike to decide rather than worked around.

**For an agent picking this up:** do not run the upgrade on your own initiative. It was denied in the originating session. Tell Mike what it will change (below) and let him run it or approve it.

## How to upgrade locally (Mike's call)

CLAUDE.md says pnpm only, so use `pnpm dlx`, not `npx`:

```bash
# Interactive: shows what it found and asks about hooks
pnpm dlx impeccable update --project

# Or: match today's setup, which has no Impeccable hooks
pnpm dlx impeccable update --project -y --no-hooks
```

What it does, from reading the CLI source (`crates/skills/src/commands.rs`, `bundle.rs`, `hook_manifest.rs` at `skill-v4.3.1`):

- **Skill folder:** it replaces `.claude/skills/impeccable/` with the v4 bundle. That is a new `SKILL.md`, a new `reference/` set (adds `init`, `doctor`, `hooks`, `new-work`, `craft-floor`, `routing`, `visualize` and native-platform files) and `scripts/` with an `impeccable` shell launcher. The v3 Node scripts (`load-context.mjs`, `live-*.mjs`, `pin.mjs` …) go away.
- **Agents:** it adds four agents to `.claude/agents/`: `impeccable-asset-producer`, `impeccable-documenter`, `impeccable-finish-reviewer`, `impeccable-manual-edit-applier`.
- **Hooks:** unless you pass `--no-hooks`, it merges hooks into `.claude/settings.local.json`. That file is gitignored via `*.local`, so the hooks stay on your machine. The hooks are:
  - `PostToolUse` on Edit|Write: "Checking UI changes", 5s.
  - `Stop`: "Design deep pass", 30s.
  - Both run `.claude/skills/impeccable/scripts/impeccable hook`. The existing `.claude/settings.json` (the force-push guard) is not touched.
- **Engine binary:** the first run of the launcher downloads it. It goes to `~/.impeccable/bin/0.1.5/` from GitHub releases. Alternatives are `IMPECCABLE_BIN` or the npm platform package `@impeccable/cli-<os>-<arch>`.
- **Only installed providers:** it updates the harness folders that already have the skill. Here that is `.claude/` only.

Afterwards, check the result:

```bash
.claude/skills/impeccable/scripts/impeccable context   # replaces load-context.mjs
.claude/skills/impeccable/scripts/impeccable detect src/routes/try.tsx src/routes/reference
```

## Changes between 3.0.7 and 4.3.1 that matter for Kalimera

- **`teach` is now `init`** (3.5.0). It writes PRODUCT.md, offers a DESIGN.md and sets up Live Mode.
- **Critique history.** Critique runs are saved to `.impeccable/critique/` (3.1.0), and `polish` reads the latest one. Decide whether `.impeccable/` is committed or gitignored.
- **DESIGN.md-aware detection** (3.7.0). With a `DESIGN.md`, the detector and hooks flag font, colour and radius drift against it. **Kalimera has no DESIGN.md.** The real palette lives in `src/index.css` and `docs/design-guidelines.md`. Run `/impeccable document` after upgrading; it is probably the single highest-value step.
- **Warm-neutral backgrounds are a named tell** (3.5.0). The cream/beige background band is flagged as AI slop. v4 also says "the brief wins" and "refinement preserves the incumbent identity", and PRODUCT.md pins cream. So it should hold, but watch for v4 pushing against the cream.
- **Direction by dice** (4.0.x). For new surfaces and redesigns, a roll service (`impeccable.style/api/roll`) deals six challenger "worlds" and opens a browser decision page. Rendered comps need a native image tool or `OPENAI_API_KEY`. Without network it runs "degraded". Most Kalimera work is refinement of existing pages, which skips the roll.
- **Comp-first or code-first** (4.1.0). A `buildPath` setting lives in `.impeccable/config.json`.
- **Cloud sessions.** For v4 to work fully in claude.ai/code sessions, the environment's network access needs `impeccable.style` and GitHub release downloads allowed. Otherwise the engine cannot download and the roll degrades.

## Housekeeping to do with the upgrade

1. **Delete the duplicate context file.** `.impeccable.md` is a byte-for-byte copy of `PRODUCT.md`, left over from v3's rename. The v4 engine source does not read it. `git rm .impeccable.md`.
2. **PRODUCT.md has drifted from the code and CLAUDE.md.**
   - The colour table says the case tokens are the ocean/terracotta/olive/honey hexes. In `src/index.css` they are separate `case-*` scales (`--color-case-nominative: var(--color-case-nominative-text)`), and CLAUDE.md says so explicitly.
   - It lists a vocative token that no longer exists in `src/index.css`.
   - It has no `register` field. Add `register: product`.
   - It says "No streaks. Not now, not ever", but the app ships streaks. That needs a decision (see `critique.md`).
3. **Refresh the context files, in this order:** `/impeccable init` (or hand-edit) for PRODUCT.md, then `/impeccable document` for DESIGN.md, then re-run `/impeccable critique` so the score can be compared with the 3.0.7 baseline of 19/40.
