# Components

## Structure

- **`/components/*.tsx`** - Custom components (tailwind-variants)
- **`/components/cards/*.tsx`** - Card shells: `TeachingCard`, `LookupCard`, `Callout`, `NextStepCard`, `NavigatorCard`
- **`/components/ui/*.tsx`** - ShadCN components, restyled onto `tailwind-variants`

## Custom Components

Built with `tailwind-variants`. Direct imports only — no barrel file:

```typescript
import { GreekText } from "@/components/GreekText";
import { Card } from "@/components/Card";
import { TeachingCard } from "@/components/cards/TeachingCard";
```

## Reach for these first

| Need | Component | Rule |
| --- | --- | --- |
| Greek on screen | `GreekText`, `Pronunciation`, `GreekGloss` | Never render Greek or a transliteration any other way (`pnpm lint:greek`) |
| A phrase where only some words carry a case | `MarkedGreek` | Only the `marked` words take the case tone; the rest stays neutral |
| A button | `Button` (`ui/button`) | Defaults to `primary`; pass `variant` for anything else |
| Navigation that looks like a button | `ButtonLink` (`ui/button`) | Never nest a `<Button>` in a `<Link>` |
| A back link | `BackLink` | Label it with where it goes ("Learn", "Exit"), never the current page |
| A page title and lede | `PageHeading` | Every page's `h1`; `ReferenceHero` builds on it |
| A section heading on a reference page | `BandHeading` | `h2` by default, `h3` for a sub-band; no kicker above it |
| An index of sections | `SectionIndex` | Greek-first ruled list, no icons or tints |
| Error, 404 or failed load | `StatusPage` (`RouteError`, `RootError`, `NotFound`) | Registered on the router; you rarely render them yourself |
| Correct / Incorrect / Time's up | `Verdict` | The only place that wording and colour live |

## ShadCN Components

Added via `pnpm dlx shadcn@latest add <component>`. Import from `@/components/ui/<component>`:

```typescript
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
```

### Available ShadCN Components

- alert
- badge
- button
- dropdown-menu
- form-field
- input
- label
- popover
- tabs
