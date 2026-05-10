# Routes

TanStack Start (TanStack Router + SSR). File-based routing — Vite plugin auto-discovers routes. Route tree generated at `src/routeTree.gen.ts`.

## Structure

```
routes/example/
├── route.tsx           # Layout route with loader + beforeLoad
├── index.tsx           # Default child route
├── $tab.tsx            # Dynamic routes
├── loader.server.ts    # Server-only queries + server functions
└── components/         # Route-specific components
```

## Key Patterns

**Route file:**

```typescript
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/example")({
  loader: async ({ context }) => {
    return await getData(context.userId);
  },
  component: function ExamplePage() {
    const data = Route.useLoaderData();
    return <div>{data.title}</div>;
  },
});
```

**Server functions** (mutations from client):

```typescript
import { createServerFn } from "@tanstack/react-start";

export const doThingFn = createServerFn({ method: "POST" })
	.inputValidator(z.object({ id: z.number() }))
	.handler(async ({ data }) => {
		return await db.doThing(data.id);
	});

// In component:
await doThingFn({ data: { id: 42 } });
```

**API routes** (HTTP endpoints with `server.handlers`):

```typescript
// Side-effect import required
import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/thing")({
	server: {
		handlers: {
			GET: async ({ request }) => Response.json({ ok: true }),
			POST: async ({ request }) => {
				const body = await request.json();
				return Response.json({ received: body });
			},
		},
	},
});
```

**Auth context** — available on all routes via `Route.useRouteContext()`:

```typescript
const { auth } = Route.useRouteContext();
// auth: { userId: number; username: string } | null
```

**Auth guard** (copy from practice/route.tsx):

```typescript
beforeLoad: async () => {
  const request = getRequest();
  const auth = getAuthSession(request);
  if (!auth?.userId) throw redirect({ to: "/" });
  return { userId: auth.userId };
},
```

## Co-located non-route files

Files not discovered as routes (configured via `routeFileIgnorePattern` in `vite.config.ts`):

- `*.server.ts` — server-only queries
- `tabs/`, `subtabs/`, `components/`, `engines/` directories
- `hooks.ts`, `drill-lookup.ts`, `group-section.tsx`
- `*.content.llm` content files

To exclude a new co-located file, prefix with `-` or extend the ignore pattern.
