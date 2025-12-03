# Greek Learning App

React Router 7 app deployed to Cloudflare Workers with Turso (libsql) database.

## Database Commands

**CRITICAL:** Always use the Makefile for database operations. Direct `pnpm` commands do NOT load `.env` variables.

### Local Development (Docker libsql-server on port 8080)

```bash
make db-push      # Push schema to local database
make db-seed      # Seed local database
make db-setup     # Push schema and seed locally
make db-studio    # Open Drizzle Studio (local)
```

### Production (Turso Cloud)

```bash
make prod-db-push     # Push schema to production
make prod-db-seed     # Seed production database
make prod-db-setup    # Push schema and seed production
make prod-db-studio   # Open Drizzle Studio (production)
```

### Why This Matters

The `src/db/index.ts` falls back to `http://127.0.0.1:8080` when `TURSO_DATABASE_URL` is not set:

```typescript
const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "http://127.0.0.1:8080",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
```

Running `pnpm db:seed` directly will seed a local database, not Turso. The Makefile's `prod-*` targets source `.env` first:

```makefile
prod-db-seed:
  set -a && . ./.env && set +a && pnpm db:seed
```

## Deployment

```bash
make deploy       # Build and deploy to Cloudflare Workers
make deploy-dry   # Dry run deployment
make logs         # Tail Cloudflare Worker logs
```

## Architecture

- **Cloudflare Workers:** Uses `context.db` from `entry.worker.ts` for database access
- **Local Dev:** Falls back to direct import when `context.db` is unavailable
- **Loaders pattern:** `const db = context?.db ?? (await import("../db")).db;`

## UI Components

**ShadCN UI is installed.** Use ShadCN components for new UI elements.

### Adding Components

```bash
pnpm dlx shadcn@latest add <component-name>
```

### Available Components

- `@/components/ui/tabs` - Tabs, TabsList, TabsTrigger, TabsContent
- `@/components/ui/collapsible` - Collapsible, CollapsibleTrigger, CollapsibleContent

### Import Pattern

```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
```

### Path Alias

The `@/` alias maps to `./src/`. Configure in `tsconfig.json` and `vite.config.ts`.

### Existing Custom Components

The app also has custom components in `src/components/ui/` using `tailwind-variants`:

- Card, Button, Badge, InfoBox, MonoText, SearchInput, Table

Prefer ShadCN for new components when available. Use existing custom components for consistency with current UI patterns.
