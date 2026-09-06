# Components

## Structure

- **`/components/*.tsx`** - Custom components (tailwind-variants)
- **`/components/ui/*.tsx`** - ShadCN components, restyled onto `tailwind-variants`

## Custom Components

Built with `tailwind-variants`. Direct imports only — no barrel file:

```typescript
import { GreekText } from "@/components/GreekText";
import { Card } from "@/components/Card";
import { TeachingCard } from "@/components/cards/TeachingCard";
```

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
- collapsible
- dropdown-menu
- form-field
- input
- label
- popover
- progress
- tabs
