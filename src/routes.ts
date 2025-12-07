import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("conversations", "routes/conversations/layout.tsx", [
    index("routes/conversations/index.tsx"),
    route("arriving", "routes/conversations/arriving.tsx"),
    route("food", "routes/conversations/food.tsx"),
    route("smalltalk", "routes/conversations/smalltalk.tsx"),
    route("requests", "routes/conversations/requests.tsx"),
  ]),
  route("phrases", "routes/phrases/layout.tsx", [
    index("routes/phrases/index.tsx"),
    route("survival", "routes/phrases/survival.tsx"),
    route("responses", "routes/phrases/responses.tsx"),
    route("requests", "routes/phrases/requests.tsx"),
    route("opinions", "routes/phrases/opinions.tsx"),
    route("connectors", "routes/phrases/connectors.tsx"),
    route("time", "routes/phrases/time.tsx"),
    route("constructions", "routes/phrases/constructions.tsx"),
  ]),
  route("quick-reference", "routes/quick-reference/layout.tsx", [
    index("routes/quick-reference/redirect.tsx"),
    route("cases-pronouns", "routes/quick-reference/cases-pronouns.tsx"),
    route("nouns-articles", "routes/quick-reference/nouns-articles.tsx"),
    route("prepositions", "routes/quick-reference/prepositions.tsx"),
    route("verbs", "routes/quick-reference/verbs.tsx"),
  ]),
  route("practice", "routes/practice/layout.tsx", [
    index("routes/practice/index.tsx"),
    route("pronouns", "routes/practice/pronouns.tsx"),
    route("articles", "routes/practice/articles.tsx"),
    route("verbs", "routes/practice/verbs.tsx"),
    route("vocabulary", "routes/practice/vocabulary.tsx"),
    route("review", "routes/practice/review.tsx"),
  ]),
  route("vocabulary", "routes/vocabulary/layout.tsx", [
    index("routes/vocabulary/index.tsx"),
    route("nouns", "routes/vocabulary/nouns.tsx"),
    route("verbs", "routes/vocabulary/verbs.tsx"),
    route("phrases", "routes/vocabulary/phrases.tsx"),
    route("reference", "routes/vocabulary/reference.tsx"),
  ]),
  route("search", "routes/search.tsx"),
] satisfies RouteConfig;
