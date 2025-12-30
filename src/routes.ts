import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  // Dashboard (replaces landing page)
  index("routes/home.tsx"),

  // Practice - core loop
  route("practice", "routes/practice/layout.tsx", [
    route("speed", "routes/practice/speed-drill.tsx"),
    route(":tab", "routes/practice/$tab.tsx"),
  ]),

  // Explore - merged content (conversations, phrases, words)
  route("explore", "routes/explore/layout.tsx", [
    route("conversations", "routes/explore/conversations/layout.tsx", [
      route(":tab", "routes/explore/conversations/$tab.tsx"),
    ]),
    route("phrases", "routes/explore/phrases/layout.tsx", [
      route(":tab", "routes/explore/phrases/$tab.tsx"),
    ]),
    route("words", "routes/explore/words/layout.tsx", [
      route(":tab", "routes/explore/words/$tab.tsx"),
    ]),
  ]),

  // Reference - grammar lookup
  route("reference", "routes/reference/layout.tsx", [
    route(":tab", "routes/reference/$tab.tsx"),
  ]),

  // Search (will become modal later, keep route for now)
  route("search", "routes/search.tsx"),

  // API routes
  route("api/push/subscribe", "routes/api/push.subscribe.ts"),
  route("api/push/unsubscribe", "routes/api/push.unsubscribe.ts"),
  route("api/push/vapid-key", "routes/api/push.vapid-key.ts"),
] satisfies RouteConfig;
