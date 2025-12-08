import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("conversations", "routes/conversations/layout.tsx", [
    index("routes/conversations/index.tsx"),
    route(":tab", "routes/conversations/$tab.tsx"),
  ]),
  route("phrases", "routes/phrases/layout.tsx", [
    index("routes/phrases/index.tsx"),
    route(":tab", "routes/phrases/$tab.tsx"),
  ]),
  route("quick-reference", "routes/quick-reference/layout.tsx", [
    index("routes/quick-reference/redirect.tsx"),
    route(":tab", "routes/quick-reference/$tab.tsx"),
  ]),
  route("practice", "routes/practice/layout.tsx", [
    index("routes/practice/index.tsx"),
    route(":tab", "routes/practice/$tab.tsx"),
  ]),
  route("vocabulary", "routes/vocabulary/layout.tsx", [
    index("routes/vocabulary/index.tsx"),
    route(":tab", "routes/vocabulary/$tab.tsx"),
  ]),
  route("search", "routes/search.tsx"),
] satisfies RouteConfig;
