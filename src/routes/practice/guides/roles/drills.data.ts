import type { DrillEntry } from "@/constants/drills";

export const ROLES_DRILLS: DrillEntry[] = [
	{
		id: "articles-indefinite",
		to: "/practice/guides/roles/indefinite",
		title: "ένας or έναν",
		greek: "ένας σκύλος · έναν σκύλο · μια γάτα",
		minutes: 2,
		category: "articles",
		caseRole: null,
	},
	{
		id: "roles-linking-plain",
		to: "/practice/guides/roles/linking-plain",
		title: "Plain form or Target form",
		greek: "είμαι γιατρός · βλέπω τον γιατρό",
		minutes: 2,
		category: "nouns",
		caseRole: null,
	},
	{
		id: "articles-with-or-without",
		to: "/practice/guides/roles/with-or-without",
		title: "With or without the article",
		greek: "η Ελλάδα · είμαι γιατρός · πάω σινεμά",
		minutes: 2,
		category: "articles",
		caseRole: null,
	},
];
