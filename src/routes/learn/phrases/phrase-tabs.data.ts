import type { ContentColorScheme } from "@/components/ContentSection";

export interface PhraseSection {
	tag: string;
	title: string;
	colorScheme: ContentColorScheme;
	alwaysShow?: boolean;
}

/** Each Learn phrases tab's sections, in order: the tag it lists, its title and colour. */
export const PHRASE_TAB_SECTIONS = {
	survival: [
		{ tag: "essential", title: "Essential Greetings", colorScheme: "honey", alwaysShow: true },
		{ tag: "survival", title: "Survival Phrases", colorScheme: "terracotta" },
	],
	responses: [
		{ tag: "responses", title: "Common Responses", colorScheme: "terracotta", alwaysShow: true },
		{ tag: "social-phrase", title: "Social Phrases", colorScheme: "olive" },
	],
	requests: [
		{ tag: "request", title: "Polite Requests", colorScheme: "terracotta" },
		{ tag: "command", title: "Commands", colorScheme: "olive" },
	],
	opinions: [
		{ tag: "opinions", title: "Opinions & Feelings", colorScheme: "olive", alwaysShow: true },
	],
	connectors: [
		{ tag: "discourse-markers", title: "Discourse Markers", colorScheme: "olive" },
		{ tag: "discourse-filler", title: "Fillers & Connectors", colorScheme: "ocean" },
	],
} as const satisfies Record<string, readonly PhraseSection[]>;
