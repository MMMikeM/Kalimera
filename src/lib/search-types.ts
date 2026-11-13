export type SearchLink =
	| { to: "/learn/verbs/$verbId"; params: { verbId: string } }
	| { to: "/learn/nouns/$subject"; params: { subject: string } }
	| { to: "/learn/phrases/$tab"; params: { tab: string } }
	| { to: "/learn/essentials/$subtab"; params: { subtab: string } };

export interface SearchEntry {
	id: number;
	/** Nouns carry their article. */
	greek: string;
	english: string;
	kind: "word" | "phrase";
	principalParts?: { past?: string; future?: string };
	/** Absent when the word has no page: the result row is the whole answer. */
	link?: SearchLink;
}

export interface SearchHit {
	entry: SearchEntry;
	/** Set when a form matched rather than the dictionary word: `{ greek: "πας", note: "you go" }`. */
	matchedForm?: { greek: string; note: string };
}

export interface SearchResult {
	/** The query actually searched, when nothing matched literally and a typo fix did. */
	corrected?: string;
	words: SearchHit[];
	phrases: SearchHit[];
}
