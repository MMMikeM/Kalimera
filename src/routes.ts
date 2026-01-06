import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  // Auth
  route("login", "routes/login.tsx"),

  // Dashboard (replaces landing page)
  index("routes/home.tsx"),

  // Practice - core loop
  route("practice", "routes/practice/layout.tsx", [
    route("speed", "routes/practice/speed-drill.tsx"),
    route(":tab", "routes/practice/$tab.tsx"),
  ]),

  // Learn - content exploration (conversations, phrases, vocabulary)
  route("learn", "routes/learn/layout.tsx", [
    route("conversations", "routes/learn/conversations/layout.tsx", [
      route(":tab", "routes/learn/conversations/$tab.tsx"),
    ]),
    route("phrases", "routes/learn/phrases/layout.tsx", [
      route(":tab", "routes/learn/phrases/$tab.tsx"),
    ]),
    route("vocabulary", "routes/learn/vocabulary/layout.tsx", [
      route(":tab", "routes/learn/vocabulary/$tab.tsx"),
      route("verbs/:verbId", "routes/learn/vocabulary/verbs/$verbId/route.tsx"),
    ]),
  ]),

  // Legacy /explore redirects (backwards compatibility)
  route("explore/*", "routes/redirects/explore.tsx"),

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
