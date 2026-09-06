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
 .validator(z.object({ id: z.number() }))
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

The ignore pattern is `(tabs|components|\.test\.|\.data\.)`, so what is excluded is:

- `*.data.ts` — drill catalogues and content item lists, importable from tests
  without pulling in the route
- `*.test.ts` / `*.test.tsx`
- anything under a `tabs/` or `components/` directory — which also covers
  `subtabs/` and `components/engines/`, since the pattern is a substring match
- `*.content.llm`, which is not a `.ts`/`.tsx` file at all

`*.server.ts` is **not** in the pattern. Server-only code lives under
`src/server/` and is imported from routes; a `foo.server.ts` sitting beside a
route would be picked up as one.

To exclude a new co-located file, name it `*.data.ts` or put it under
`components/`, or extend the pattern in `vite.config.ts`.
