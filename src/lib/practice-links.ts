/**
 * Where a reference tab's "practice this" link should point.
 *
 * Only topics with a drill of their own appear here; prepositions has a
 * reference tab but no drill, so it falls through to the practice index rather
 * than to a route that does not exist.
 */
export const DRILL_BY_TOPIC: Record<string, string> = {
	nouns: "/practice/cases/review/nouns",
	articles: "/practice/cases/review/articles",
	adjectives: "/practice/cases/review/adjectives",
	phrases: "/practice/cases/review/phrases",
	pronouns: "/practice/pronouns",
	verbs: "/practice/verbs",
	cases: "/practice/cases",
};

/**
 * `/practice` redirects anyone without a session to the homepage, while
 * `/reference` is public — so for a logged-out reader a drill link is worse
 * than no link, and register is the honest destination.
 */
export const drillHrefForTopic = (
	topic: string | undefined,
	isAuthenticated: boolean,
): string => {
	if (!isAuthenticated) return "/register";
	return (topic && DRILL_BY_TOPIC[topic]) ?? "/practice";
};
