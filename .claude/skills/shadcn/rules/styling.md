# Styling & Customization

See [customization.md](../customization.md) for theming, CSS variables, and adding custom colors.

## Contents

- Semantic colors
- Built-in variants first
- className for layout only
- No space-x-_ / space-y-_
- Prefer size-_ over w-_ h-\* when equal
- Prefer truncate shorthand
- `dark:` only where a step doesn't flip
- Use cn() for conditional classes
- No manual z-index on overlay components

---

## Semantic colors

**Incorrect:**

```tsx
<div className="bg-blue-500 text-white">
	<p className="text-gray-600">Secondary text</p>
</div>
```

**Correct:**

```tsx
<div className="bg-primary text-primary-foreground">
	<p className="text-muted-foreground">Secondary text</p>
</div>
```

In this project the semantic tokens are mapped onto the base palette in `src/index.css`, and the base palette scales (`cream`, `terracotta`, `ocean`, `olive`, `honey`, `navy`, `slate`, `sunset`, `stone`) are equally valid for chrome: `text-stone-600`, `bg-terracotta-600`. The reserved grammar role tokens (`case-*`, `gender-*`) assert a grammatical value about the Greek they wrap, so use them only for that, and only via `src/constants/grammar-palette.ts`. Never use a raw Tailwind hue such as `blue` or `gray`.

---

## No raw color values for status/state indicators

For positive, negative, or status indicators, use Badge variants, semantic tokens like `text-destructive`, or define custom CSS variables — don't reach for raw Tailwind colors.

**Incorrect:**

```tsx
<span className="text-emerald-600">+20.1%</span>
<span className="text-green-500">Active</span>
<span className="text-red-600">-3.2%</span>
```

**Correct:**

```tsx
<Badge variant="secondary">+20.1%</Badge>
<Badge>Active</Badge>
<span className="text-destructive">-3.2%</span>
```

If you need a success/positive color that doesn't exist as a semantic token, use a Badge variant or ask the user about adding a custom CSS variable to the theme (see [customization.md](../customization.md)).

---

## Built-in variants first

**Incorrect:**

```tsx
<Button className="border border-input bg-transparent hover:bg-accent">Click me</Button>
```

**Correct:**

```tsx
<Button variant="outline">Click me</Button>
```

---

## className for layout only

Use `className` for layout (e.g. `max-w-md`, `mx-auto`, `mt-4`), **not** for overriding component colors or typography. To change colors, use semantic tokens, built-in variants, or CSS variables.

**Incorrect:**

```tsx
<Card className="bg-blue-100 text-blue-900 font-bold">
	<CardContent>Dashboard</CardContent>
</Card>
```

**Correct:**

```tsx
<Card className="max-w-md mx-auto">
	<CardContent>Dashboard</CardContent>
</Card>
```

To customize a component's appearance, prefer these approaches in order:

1. **Built-in variants** — `variant="outline"`, `variant="destructive"`, etc.
2. **Semantic color tokens** — `bg-primary`, `text-muted-foreground`.
3. **CSS variables** — define custom colors in the global CSS file (see [customization.md](../customization.md)).

---

## No space-x-_ / space-y-_

Use `gap-*` instead. `space-y-4` → `flex flex-col gap-4`. `space-x-2` → `flex gap-2`.

```tsx
<div className="flex flex-col gap-4">
	<Input />
	<Input />
	<Button>Submit</Button>
</div>
```

---

## Prefer size-_ over w-_ h-\* when equal

`size-10` not `w-10 h-10`. Applies to icons, avatars, skeletons, etc.

---

## Prefer truncate shorthand

`truncate` not `overflow-hidden text-ellipsis whitespace-nowrap`.

---

## `dark:` only where a step doesn't flip

Dark mode is the `.dark` class on `<html>`. The `:root.dark` block in `src/index.css` remaps each ramp: light tints become dark tints and dark text shades become light text, so `bg-card`, `bg-terracotta-100` or `text-stone-800` need no override. `bg-background text-foreground` not `bg-white dark:bg-gray-950`.

Mid steps keep their light-mode value so solid fills under white text keep their contrast. Where such a step is used as text, add a `dark:` override, and only there: `text-terracotta-700 dark:text-terracotta-text` (`MobileNav`), `text-terracotta-700 dark:text-terracotta` (`LandingPage` headline).

---

## Use cn() for conditional classes

Use the `cn()` utility from the project for conditional or merged class names. Don't write manual ternaries in className strings.

**Incorrect:**

```tsx
<div className={`flex items-center ${isActive ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
```

**Correct:**

```tsx
import { cn } from "tailwind-variants"

<div className={cn("flex items-center", isActive ? "bg-primary text-primary-foreground" : "bg-muted")}>
```

---

## No manual z-index on overlay components

`Dialog`, `Sheet`, `Drawer`, `AlertDialog`, `DropdownMenu`, `Popover`, `Tooltip`, `HoverCard` handle their own stacking. Never add `z-50` or `z-[999]`.
