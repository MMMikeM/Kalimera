# Components

## Structure

- **`/components/*.tsx`** - Custom components (tailwind-variants)
- **`/components/ui/*.tsx`** - ShadCN components (class-variance-authority)

## Custom Components

Built with `tailwind-variants`. Direct imports only — no barrel file:

```typescript
import { GreekText } from "@/components/GreekText";
import { Card } from "@/components/Card";
```

## ShadCN Components

Added via `pnpm dlx shadcn@latest add <component>`. Import from `@/components/ui/<component>`:

```typescript
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
```

### Available ShadCN Components

- alert
- button
- collapsible
- dialog
- input
- progress
- radio-group
- select
- tabs
