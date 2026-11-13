/** Every old /reference address, by the path after /reference, and where it lives now. */
export const REFERENCE_REDIRECTS: Record<string, string> = {
	"": "/learn/tables/articles",
	articles: "/learn/tables/articles",
	nouns: "/learn/tables/nouns",
	pronouns: "/learn/tables/pronouns",
	adjectives: "/learn/tables/adjectives",
	verbs: "/learn/tables/verbs/present",
	"verbs/present": "/learn/tables/verbs/present",
	"verbs/past": "/learn/tables/verbs/past",
	"verbs/past-continuous": "/learn/tables/verbs/past-continuous",
	"verbs/future": "/learn/tables/verbs/future",
	cases: "/guides/roles",
	prepositions: "/guides/place",
	patterns: "/guides/little-words#likes",
};

export const referenceRedirect = (path: string): string | undefined => {
	const key = path.replace(/^\/+|\/+$/g, "");
	return Object.hasOwn(REFERENCE_REDIRECTS, key) ? REFERENCE_REDIRECTS[key] : undefined;
};
