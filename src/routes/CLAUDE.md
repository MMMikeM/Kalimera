# Routes

TanStack Start (TanStack Router + SSR). File-based routing — Vite plugin auto-discovers routes. Route tree generated at `src/routeTree.gen.ts`.

## Structure

```
routes/example/
├── route.tsx           # Layout route with loader + beforeLoad
├── index.tsx           # Default child route
├── $tab.tsx            # Dynamic routes
└── components/         # Route-specific components
```

Server-only code (queries, server functions, auth) lives under `src/server/`, not beside routes.

## Key Patterns

**Route file:**

```typescript
import { createFileRoute, notFound } from "@tanstack/react-router";

import { pageTitle } from "@/lib/page-title";

export const Route = createFileRoute("/example/$slug")({
  loader: async ({ params }) => {
    const item = await getItemFn({ data: { slug: params.slug } });
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({ meta: [{ title: pageTitle(loaderData?.title ?? "Example") }] }),
  component: function ExamplePage() {
    const data = Route.useLoaderData();
    return <div>{data.title}</div>;
  },
});
```

**Errors and 404s**: the router's `defaultErrorComponent` and `defaultNotFoundComponent` (`src/router.tsx`, from `src/components/StatusPage.tsx`) render inside the app shell, so a failing page keeps the header and nav. Throw `notFound()` for an unknown param; don't throw a `Response`, which surfaces as a 500. The document itself is the root route's `shellComponent`.

**Server functions** (mutations from client):

```typescript
import { createServerFn } from "@tanstack/react-start";

export const doThingFn = createServerFn({ method: "POST" })
	.validator(z.object({ id: z.number() }))
	.handler(async ({ data }) => {
		// `db` is only importable inside src/server/db/queries/; call a query helper.
		return await doThing(data.id);
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

**Auth guard** (copy from practice/route.tsx). The root route loads the session into context, so a child route only checks it:

```typescript
beforeLoad: async ({ context }) => {
  if (!context.auth?.userId) throw redirect({ to: "/" });
},
```

Server functions check auth themselves with `requireAuth()` from `@/server/auth/session`; a route guard doesn't protect a direct call to the endpoint.

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
