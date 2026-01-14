# Routes

React Router 7 framework mode. Loaders run server-side, components render on client.

## Structure

```
routes/example/
├── layout.tsx          # Shared UI + Outlet
├── index.tsx           # Default child route
├── $tab.tsx            # Dynamic routes
├── data.server.ts      # Queries and action handlers
└── components/         # Route-specific components
```

## Key Patterns

**Types:** Import from generated path, not parent

```typescript
import type { Route } from "./+types/layout";  // for layout.tsx
import type { Route } from "./+types/$tab";    // for $tab.tsx
```

**Data:** All server logic in `data.server.ts`

```typescript
// data.server.ts
export async function getPageData() {
  return db.query.vocabulary.findMany({ with: { tags: true } });
}

// layout.tsx
import { getPageData } from "./data.server";
export const loader = async () => getPageData();
```

**Actions:** Multi-intent pattern with zod-form-data

```typescript
const intent = formData.get("intent") as string;
return actionHandlers[intent](formData);
```

**Forms:** `useFetcher` for in-place mutations, `<Form>` for navigation

## Route Configuration

```typescript
// routes.ts
route("practice", "routes/practice/layout.tsx", [
  index("routes/practice/index.tsx"),
  route(":tab", "routes/practice/$tab.tsx"),
])
```

- `route()` - Adds URL segment
- `layout()` - Shared UI, no URL segment
- `index()` - Default child at parent URL
- `prefix()` - URL prefix only (use spread: `...prefix("api", [...])`)

## When to Defer

**Use `react-router-specialist` agent for:**

- Route configuration or restructuring
- Loader/action patterns
- Revalidation strategies
- Navigation hooks (useNavigate, useNavigation, useFetcher)
- Meta/headers/handle exports
- Type generation issues

**Use `ui-designer` agent for:**

- Component design and layouts
- Visual consistency
- Educational design patterns
