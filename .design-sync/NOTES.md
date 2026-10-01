# design-sync notes

## Build

- Kalimera is an app, not a package: there is no dist/. `node .design-sync/build-pkg.mjs` (cfg.buildCmd) stages `.ds-sync/pkg` with an entry re-exporting the synced components, a `.d.ts` tree emitted by `tsgo`, and the app's Tailwind CSS compiled by `@tailwindcss/cli`. Run it before the converter, then pass `--entry ./.ds-sync/pkg/index.ts --node-modules ./node_modules`.
- The synced set is the `SYNCED` list in `build-pkg.mjs`. Router- and server-bound components (BackLink, SectionIndex, StatusPage, NextStepCard, ButtonLink, GlobalSearch, nav) are left out on purpose: they need a TanStack Router or server context a design canvas can't give.
- `build-pkg.mjs` rewrites the emitted `@/` imports to relative paths; without that, ts-morph can't follow the alias and aliased prop types collapse to `any`.
- The Tailwind CLI is installed into `.ds-sync/` (`npm i @tailwindcss/cli@4.3.2` alongside esbuild, ts-morph and @types/react). `.ds-sync/` is the design-sync staging dir and uses npm by the skill's design; the repo itself stays pnpm-only.
- `.design-sync/styles.css` is the Tailwind input. It imports `src/index.css`, scans `src/components` and `.design-sync/previews`, and safelists the palette utilities with `@source inline(...)`, because designs are written after the CSS is compiled and would otherwise use classes that were never generated.
- Fonts (Cormorant Garamond, DM Sans) load from Google Fonts via a remote `@import` in `styles.css`; `[FONT_REMOTE]` is expected.
- Groups come from `.design-sync/groups/*.md` category stubs via `docsMap`; the shadcn primitives stay in `general`.

## Re-sync

Stage the scripts per the skill (plus `npm i @tailwindcss/cli@4.3.2` in `.ds-sync/`), fetch the project's `_ds_sync.json` to `.design-sync/.cache/remote-sync.json`, then:

```sh
node .design-sync/build-pkg.mjs
node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules \
  --entry ./.ds-sync/pkg/index.ts --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json
```

## Previews

- Import from `"kalimera"`. Wrap cards in `max-w-sm` so they don't stretch across the cell.
- The `case-*` colour schemes and `GreekText` case tones render no colour any more (grammar is shown by `GrammarMark`); use `neutral`, `decision`, `verb-*` or `gender-*` schemes in previews.
- Greek in previews must be real, correctly accented Greek. Mark whole phrases, article included.
- `preview-rebuild.mjs` doesn't recompile CSS: a class used only in a preview exists once `build-pkg.mjs` runs again (it scans `.design-sync/previews`). Check new classes against `ds-bundle/_ds_bundle.css`.
- Previews import only from `"kalimera"`, so icons are inline SVG; lucide isn't in the bundle.
- The bundle exports no data constants beyond `CASE_ROW_DEFS` and `GENDER_COLUMN_DEFS`; previews inline values from `src/constants`.
- Base UI: `DropdownMenuLabel` throws outside `DropdownMenuGroup` ("MenuGroupContext is missing"). Open overlays need the trigger wrapper to be `items-start` with a min height, or the popup opens below a stretched trigger. `Popover` takes `initialFocus={false}`; `DropdownMenuContent` gets `outline-none` to drop the focus ring.
- Cells appear in alphabetical order, not file order.
- Compound sub-parts (Alert*, Tabs*, Popover*, DropdownMenu*, NavigatorCell) get no card: `cfg.componentSrcMap` nulls them, and the conventions header lists them under their parent. They stay in the bundle. Every sub-part example lives as an export in its parent's preview, written inline rather than imported, because a parent's `.prompt.md` examples come from that file's own source. DropdownMenu and Popover are column cards with a frame as tall as their content (`900x5800`, `900x2300`), so every story shows. Their overlays portal to the page and are placed from each trigger, and a frame shorter than the content makes them flip away from its edge into the wrong cell. Raise the viewport when a story is added.
- Submenus: `DropdownMenuSub > DropdownMenuSubTrigger + DropdownMenuPositioner alignOffset={-5} > DropdownMenuSubContent`; a controlled `open` on the Sub holds it open. `DropdownMenuPortal` only wraps `DropdownMenuPositioner`, which already portals, so it adds nothing visible.
- Greek inside menu items goes through `GreekText size="inherit" tone="inherit"`, or its `text-foreground` beats the row highlight.
- `PopoverArrow` has no styling of its own; its preview styles it inline.
- `Label`'s disabled look needs a `group` ancestor with `data-disabled="true"`, or a `peer` input before it.
- `NavigatorCard layout="grid"` uses viewport breakpoints (`sm:grid-cols-2`), not the card's width.
- Native checkboxes need `accentColor: var(--color-primary)` inline; `accent-*` classes aren't compiled.
- The `.d.ts` extractor keeps only a core set of props for components that spread `React.ComponentProps<"x">`; `Input` and `Label` have hand-written contracts in `cfg.dtsPropsFor` so `type`, `placeholder`, `htmlFor` and the rest reach the design agent.
- The Shortcut preview's keys are invented; the app has no keyboard shortcuts.

## Known render warns

- `[GRID_OVERFLOW]` on DropdownMenu and Popover ("stories position content outside their cells"): deliberate; see the column-card note above.

- None after the first full pass; the initial `[RENDER_THIN]` on LookupCard, NavigatorCard, TeachingCard and PageHeading was the unauthored floor and is gone.

## App issues found while syncing (not sync faults)

- Greek renders in the system fallback: DM Sans and Cormorant Garamond have no Greek glyphs, and `src/index.css` sets no Greek font.
- `CASE_ROW_DEFS` and every `MarkedGreek` call site still pass `case-*` schemes and tones, which render no colour now.
- `ParadigmTable` sets Greek in `font-mono`, and no mono font is defined.
- `TenseNavigator` styles tabs with `data-[state=active]:*`; Base UI sets `data-active`, so the tense colours never show.
- `DropdownMenuContent` lacks the `outline-hidden` that `PopoverContent` has.

## Re-sync risks

- `build-pkg.mjs`'s `SYNCED` list is hand-kept: a new presentational component won't sync until it is added.
- The safelist in `.design-sync/styles.css` names the palette scales; a new scale in `src/index.css` needs adding there.
- Remote fonts: previews and designs depend on Google Fonts being reachable.
- `.design-sync/styles.css` resets `html, body` to `height: auto; overflow-x: clip`. The app's `height: 100%; overflow-x: hidden` made body a scroll box inside cards, so Claude Design sized grid cards to a short strip with an inner scrollbar.
