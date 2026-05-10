---
name: ts-start
description: >-
  Use when working with TanStack Start — server functions (createServerFn),
  file-based routing, middleware, execution boundaries (server-only/client-only),
  import protection, selective SSR, or static prerendering. Covers creating and
  composing server functions with Zod validation, auth patterns, cookie handling,
  request context, streaming, and the isomorphic execution model. Also use for
  migrating from React Router loaders/actions to server functions, debugging
  hydration mismatches, environment variable safety, and cache/SWR configuration.
---

You are an expert in TanStack Start. Before writing any code, load the relevant reference files from the `references/` directory using the Read tool. Each file covers a focused area — don't guess from memory, read first.

## Reference Index

| File                                           | When to load                                                                                   |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `references/execution-model.md`                | **Always load first.** Isomorphic-by-default, where code runs, env vars, hydration mismatches  |
| `references/server-functions.md`               | createServerFn, inputValidator, Zod, errors, redirects, CSRF, cookies, caching headers         |
| `references/middleware.md`                     | createMiddleware, auth middleware, context passing, server fn middleware vs request middleware |
| `references/routing.md`                        | File-based routing, \_\_root.tsx, createFileRoute, nested routes, route tree gen               |
| `references/code-execution-patterns.md`        | createServerOnlyFn, createClientOnlyFn, createIsomorphicFn, ClientOnly component               |
| `references/import-protection.md`              | _.server.ts / _.client.ts naming, server-only / client-only sentinel imports, deny rules       |
| `references/selective-serverside-rendering.md` | ssr: true/false/'data-only', per-route SSR control, shellComponent                             |
| `references/static-prerendering.md`            | prerender config in vite.config.ts, crawlLinks, autoStaticPathsDiscovery                       |

---

## Critical: Isomorphic by Default

**Route loaders run on BOTH server and client.** This is the most common source of bugs.

```tsx
// ❌ WRONG — process.env leaks to client, undefined under Worker SSR
export const Route = createFileRoute("/users")({
	loader: () => {
		const secret = process.env.API_KEY; // exposed!
		return fetch(`/api/users?key=${secret}`);
	},
});

// ✅ CORRECT — server function runs only on server
const getUsers = createServerFn().handler(() => {
	const secret = process.env.API_KEY; // server-only
	return fetchUsers(secret);
});

export const Route = createFileRoute("/users")({
	loader: () => getUsers(),
});
```

Also: **never read `process.env` at module scope** — it's wrong for two reasons: (1) leaks to client bundle, (2) on Cloudflare Workers, env is injected per-request, so module-scope reads evaluate to `undefined`.

---

## Server Functions

```tsx
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// GET (default) — queries
export const getItem = createServerFn({ method: "GET" })
	.inputValidator(z.object({ id: z.string() }))
	.handler(async ({ data }) => {
		return db.findItem(data.id);
	});

// POST — mutations
export const createItem = createServerFn({ method: "POST" })
	.inputValidator(z.object({ name: z.string().min(1) }))
	.handler(async ({ data }) => {
		const item = await db.createItem(data.name);
		return { success: true, id: item.id } as const;
	});
```

### Calling Server Functions

```tsx
// In route loaders
export const Route = createFileRoute("/items")({
	loader: () => getItems(),
});

// In components — use useServerFn() hook
import { useServerFn } from "@tanstack/react-start";

function ItemList() {
	const getItems = useServerFn(getServerItems);
	const { data } = useQuery({ queryKey: ["items"], queryFn: getItems });
}

// In event handlers — call directly
const handleDelete = async () => {
	const result = await deleteItem({ data: { id } });
};
```

### Error Handling & Redirects

```tsx
import { redirect, notFound } from "@tanstack/react-router";

export const getPost = createServerFn()
	.inputValidator(z.object({ id: z.string() }))
	.handler(async ({ data }) => {
		const user = await getSession();
		if (!user) throw redirect({ to: "/login" }); // redirect
		const post = await db.findPost(data.id);
		if (!post) throw notFound(); // 404
		if (problem) throw new Error("Boom"); // error — serialized to client
		return post;
	});
```

### Cookies & Request Headers

```tsx
import {
	getRequest,
	getRequestHeader,
	setCookie,
	deleteCookie,
	setResponseHeaders,
	setResponseStatus,
} from "@tanstack/react-start/server";

export const login = createServerFn({ method: "POST" })
	.inputValidator(z.object({ password: z.string() }))
	.handler(async ({ data }) => {
		const userId = await validatePassword(data.password);
		if (!userId) return { success: false } as const;
		setCookie("session", userId, {
			httpOnly: true,
			sameSite: "lax",
			path: "/",
			maxAge: 604800,
		});
		return { success: true } as const;
	});

export const logout = createServerFn({ method: "POST" }).handler(async () => {
	deleteCookie("session");
	throw redirect({ to: "/" });
});
```

### Cache-Control Headers

```tsx
// Public (non-personalised) — safe to cache at CDN
export const getPublicData = createServerFn({ method: "GET" }).handler(async () => {
	setResponseHeaders(
		new Headers({
			"Cache-Control": "public, max-age=300",
			"CDN-Cache-Control": "max-age=3600, stale-while-revalidate=600",
		}),
	);
	return fetchPublicData();
});

// ⚠️ If the response depends on identity at ALL, use private — not public
export const getMyData = createServerFn({ method: "GET" }).handler(async () => {
	const session = await requireSession();
	setResponseHeaders(
		new Headers({
			"Cache-Control": "private, max-age=60",
			Vary: "Cookie, Authorization",
		}),
	);
	return db.findByUser(session.userId);
});
```

### CSRF Protection

Start auto-installs CSRF middleware if you have no `src/start.ts`. If you define `src/start.ts`, add it explicitly:

```tsx
// src/start.ts
import { createStart, createCsrfMiddleware } from "@tanstack/react-start";

const csrfMiddleware = createCsrfMiddleware({
	filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
	requestMiddleware: [csrfMiddleware],
}));
```

### File Organisation

```
src/utils/
├── users.functions.ts   # createServerFn wrappers — safe to import anywhere
├── users.server.ts      # Server-only helpers (DB queries) — import only inside handlers
└── schemas.ts           # Shared Zod schemas — client-safe
```

Static imports of `.functions.ts` from client components are safe — the build replaces server implementations with RPC stubs. Avoid dynamic `import()` of server function files.

---

## Middleware

### Server Function Middleware (auth, context, logging)

```tsx
import { createMiddleware } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";

export const authMiddleware = createMiddleware().server(async ({ next, request }) => {
	const cookie = request.headers.get("Cookie");
	const userId = parseCookie(cookie, "session");
	if (!userId) throw redirect({ to: "/login" });
	return next({ context: { userId } });
});

// Use in server function
export const getProfile = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		// context.userId is typed
		return db.users.findById(context.userId);
	});
```

### Composing Middleware

```tsx
const loggingMiddleware = createMiddleware().server(async ({ next }) => {
	console.log("request start");
	const result = await next();
	console.log("request end");
	return result;
});

const authMiddleware = createMiddleware()
	.middleware([loggingMiddleware]) // runs first
	.server(async ({ next }) => {
		// auth check...
		return next({ context: { userId } });
	});
```

### Request Middleware (all server requests)

```tsx
// src/start.ts
import { createStart, createMiddleware } from "@tanstack/react-start";

const globalLogger = createMiddleware().server(async ({ next, request }) => {
	console.log(request.method, request.url);
	return next();
});

export const startInstance = createStart(() => ({
	requestMiddleware: [globalLogger],
}));
```

**Auth must be on the server function, not just the route.** A route `beforeLoad` redirect protects the page experience but doesn't block direct RPC calls to the server function endpoint.

---

## Execution Boundaries

```tsx
import { createServerOnlyFn, createClientOnlyFn, createIsomorphicFn } from "@tanstack/react-start";

// Crashes on client if called — for utilities, not RPC
const getDbUrl = createServerOnlyFn(() => process.env.DATABASE_URL);

// Crashes on server if called
const saveToStorage = createClientOnlyFn((key: string, val: unknown) => {
	localStorage.setItem(key, JSON.stringify(val));
});

// Different implementation per environment
const logger = createIsomorphicFn()
	.server((msg) => console.log(`[SERVER]: ${msg}`))
	.client((msg) => console.log(`[CLIENT]: ${msg}`));
```

### ClientOnly Component & useHydrated

```tsx
import { ClientOnly, useHydrated } from "@tanstack/react-router";

// Render fallback on server, children after hydration
function Analytics() {
	return (
		<ClientOnly fallback={null}>
			<GoogleAnalyticsScript />
		</ClientOnly>
	);
}

// Conditional logic based on hydration state
function TimeZoneDisplay() {
	const hydrated = useHydrated();
	const tz = hydrated ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
	return <div>{tz}</div>;
}
```

---

## Import Protection

Files named `*.server.*` are denied in client bundles; `*.client.*` are denied in server bundles. When you can't rename the file:

```tsx
// Mark entire file as server-only
import "@tanstack/react-start/server-only";

// Mark entire file as client-only
import "@tanstack/react-start/client-only";
```

Type-only imports (`import type { ... }`) are ignored — erased at runtime, can't leak.

Dev: warns and mocks violations. Build: hard error.

---

## File-Based Routing

```
src/routes/
├── __root.tsx           # Always rendered — html/head/body shell
├── index.tsx            # /
├── about.tsx            # /about
├── posts.tsx            # /posts layout
├── posts.$postId.tsx    # /posts/:postId  (flat dot notation)
└── posts/$postId/
    └── edit.tsx         # /posts/:postId/edit  (directory form)
```

### Root Route

```tsx
// src/routes/__root.tsx
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
		],
		links: [{ rel: "icon", href: "/favicon.ico" }],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<Outlet />
				<Scripts />
			</body>
		</html>
	);
}
```

### File Route with Loader

```tsx
// src/routes/posts.$postId.tsx
import { createFileRoute } from "@tanstack/react-router";
import { getPost } from "~/utils/posts.functions";

export const Route = createFileRoute("/posts/$postId")({
	loader: ({ params }) => getPost({ data: { id: params.postId } }),
	staleTime: 30_000,
	component: PostPage,
});

function PostPage() {
	const post = Route.useLoaderData();
	return <div>{post.title}</div>;
}
```

Route tree is auto-generated — the path string in `createFileRoute` is managed by the bundler plugin. Run dev or build to regenerate `routeTree.gen.ts`.

---

## Selective SSR

Control per-route whether `beforeLoad`, `loader`, and the component run on the server:

```tsx
// ssr: true (default) — full SSR
// ssr: false — everything client-side (canvas, localStorage-dependent routes)
// ssr: 'data-only' — run loader on server, render component on client

export const Route = createFileRoute("/editor")({
	ssr: false,
	component: () => <CanvasEditor />,
});

// Functional form — decide at runtime from params/search
export const Route = createFileRoute("/docs/$docType/$docId")({
	ssr: ({ params }) => {
		if (params.status === "success" && params.value.docType === "sheet") return false;
	},
	component: DocPage,
});
```

Child inherits parent `ssr` and can only make it more restrictive (true → data-only → false).

Global default:

```tsx
// src/start.ts
export const startInstance = createStart(() => ({ defaultSsr: false }));
```

---

## Static Prerendering

```ts
// vite.config.ts
tanstackStart({
	prerender: {
		enabled: true,
		crawlLinks: true, // follow links from prerendered pages
		autoStaticPathsDiscovery: true, // auto-discover static routes
		concurrency: 14,
		filter: ({ path }) => !path.startsWith("/admin"),
	},
});
```

Dynamic routes (`/posts/$id`) are excluded from auto-discovery but can be reached via `crawlLinks` if linked from a prerendered page.

---

## Anti-Patterns Checklist

| ❌ Wrong                                    | ✅ Right                                         |
| ------------------------------------------- | ------------------------------------------------ |
| `process.env.X` at module scope             | Read inside `.handler()` or `createServerOnlyFn` |
| Sensitive logic in route `loader`           | Move to `createServerFn`                         |
| Different server/client render output       | Use `useHydrated` or `ClientOnly`                |
| Auth only in route `beforeLoad`             | Also enforce in every server function            |
| `VITE_` prefix for secrets                  | `VITE_` is client-exposed by design              |
| Dynamic `import()` of server function files | Static import only                               |
| `Cache-Control: public` on auth'd responses | Use `private` + `Vary: Cookie`                   |
| `method: "GET"` for mutations               | `method: "POST"`                                 |
| No `.inputValidator()`                      | Validate all inputs with Zod                     |

---

## Working Process

1. **Load relevant reference files** before writing code
2. **Server functions for all server logic** — never sensitive logic in route loaders directly
3. **Validate all inputs with Zod** via `.inputValidator()`
4. **Auth in middleware, enforced on every server function** that needs it
5. **Discriminated union returns** with `as const`
6. **Fire-and-forget non-critical side effects** (no await)
7. **`Promise.all` for independent queries**
