---
name: shadcn
description: Manage shadcn/ui components — add, style, compose.
user-invocable: false
---

# shadcn/ui

Components are added as source code via the CLI.

> **This project uses base-ui (`@base-ui/react`).** Components use base-ui APIs — refer to `@base-ui/react` docs and basecn patterns, not generic shadcn examples.

> **CLI runner**: Always use `pnpm dlx shadcn@latest` — this project uses pnpm.

## Project Context

- **Base**: `base` (`@base-ui/react` primitives): use `render`, NOT `asChild`
- **Package manager**: pnpm
- **Alias**: `@/` → `./src/` (`components.json` aliases, `tsconfig.json`)
- **Tailwind**: v4 (`@theme` and `@theme static` blocks in `src/index.css`, not `tailwind.config.js`)
- **Framework**: SSR app on TanStack Start (Nitro Node server), built with Vite
- **Icon library**: `lucide` (`components.json`)
- **`cn`**: import from `tailwind-variants`. There is no `src/lib/utils.ts`, although `components.json` still points `aliases.utils` at `@/lib/utils`
- **Button**: `src/components/ui/button.tsx` is the project's own `tv()` button, not the shadcn one. `variant` defaults to `primary` (also `secondary`, `outline`, `ghost`); sizes `sm`, `md`, `lg`. For navigation use `ButtonLink` (built with `createLink` from TanStack Router), never a `<Button>` inside a `<Link>`

Run `pnpm dlx shadcn@latest info --json` to get current project context.

## Critical Rules

### Styling → [styling.md](./rules/styling.md)

- **`className` for layout, not styling.** Never override component colors/typography.
- **`gap-*` not `space-x/y-*`.** Use `flex` + `gap-*` or `flex flex-col gap-*`.
- **`size-*` when width = height.** `size-10` not `w-10 h-10`.
- **Project colour tokens only.** The shadcn semantic tokens (`bg-card`, `text-muted-foreground`) and the base palette scales (`cream`, `terracotta`, `ocean`, `olive`, `honey`, `navy`, `slate`, `sunset`, `stone`) for chrome. Reserved grammar role tokens (`case-*`, `gender-*`) only for grammatical claims, read from `src/constants/grammar-palette.ts` (the linter flags hand-written role tokens). Never a raw Tailwind hue such as `bg-blue-500`. See the Two Palettes section of CLAUDE.md.
- **`dark:` only where a step doesn't flip.** `:root.dark` in `src/index.css` remaps light tints and dark text shades, so most classes need no override; mid steps keep their value, so use `dark:` only there (e.g. `text-terracotta-700 dark:text-terracotta-text` in `MobileNav`).
- **Use `cn()` for conditional classes.**

### Forms → [forms.md](./rules/forms.md)

- **`FieldGroup` + `Field`** for form layout, not raw divs.
- **`data-invalid` on `Field`, `aria-invalid` on the control** for validation.
- **`ToggleGroup`** for 2–7 option sets, not looped Buttons.

### Composition → [composition.md](./rules/composition.md)

- **Items inside Groups.** `SelectItem` → `SelectGroup`.
- **`render` for custom triggers** (base), NOT `asChild` (that's radix).
- **Dialog/Sheet/Drawer need a Title** — use `sr-only` class if hidden.
- **Full Card composition.** `CardHeader`/`CardTitle`/`CardContent`/`CardFooter`.
- **Use `Skeleton`** for loading, `Badge` for status, `Alert` for callouts, `Separator` not `<hr>`.

### Icons → [icons.md](./rules/icons.md)

- **`data-icon` on icons in buttons.** `data-icon="inline-start"` or `"inline-end"`.
- **No sizing classes on icons inside components.** Components handle sizing via CSS.

### Base Primitives (NOT radix)

- **`render` for custom triggers**, NOT `asChild`. See [composition.md](./rules/composition.md).
- **`nativeButton={false}`** when `render` is a non-button element
- **Select** needs `items` prop on root, placeholder via `{ value: null }` item
- **ToggleGroup** uses `multiple` boolean, `defaultValue` is always an array
- **Slider** takes a scalar `defaultValue`, not an array
- **Accordion** uses `defaultValue={["item-1"]}` (array), no `type` or `collapsible`

## Workflow

1. **Search first** — `pnpm dlx shadcn@latest search -q "..."` before writing custom UI
2. **Get docs** — `pnpm dlx shadcn@latest docs <component>` for API and examples
3. **Add** — `pnpm dlx shadcn@latest add button card dialog`
4. **Fix imports**: after adding, replace `import { cn } from "@/lib/utils"` with `import { cn } from "tailwind-variants"` in all added files
5. **Verify** — read added files, check for missing sub-components, wrong composition, rule violations

## Quick Reference

```bash
pnpm dlx shadcn@latest info --json          # project context
pnpm dlx shadcn@latest search -q "sidebar"  # find components
pnpm dlx shadcn@latest docs button dialog   # get docs URLs
pnpm dlx shadcn@latest add button card      # install components
pnpm dlx shadcn@latest add button --diff    # preview upstream changes
```

## Detailed References

- [rules/forms.md](./rules/forms.md) — FieldGroup, Field, InputGroup, validation
- [rules/composition.md](./rules/composition.md) — Groups, overlays, Card, loading states
- [rules/icons.md](./rules/icons.md) — data-icon, icon sizing
- [rules/styling.md](./rules/styling.md) — semantic colors, spacing, cn()
- [cli.md](./cli.md) — full CLI reference
- [customization.md](./customization.md) — theming, CSS variables
