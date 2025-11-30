import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/daily-patterns.tsx"),
  route("core-rules", "routes/core-rules.tsx"),
  route("advanced-cases", "routes/advanced-cases.tsx"),
  route("case-practice", "routes/case-practice.tsx"),
  route("present", "routes/present.tsx"),
  route("other-tenses", "routes/other-tenses.tsx"),
  route("vocabulary", "routes/vocabulary.tsx"),
  route("search", "routes/search.tsx"),
] satisfies RouteConfig;
