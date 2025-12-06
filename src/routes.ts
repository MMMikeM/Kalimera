import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("conversations", "routes/conversations.tsx"),
  route("quick-reference", "routes/quick-reference/index.tsx"),
  route("practice", "routes/practice.tsx"),
  route("vocabulary", "routes/vocabulary.tsx"),
  route("search", "routes/search.tsx"),
] satisfies RouteConfig;
