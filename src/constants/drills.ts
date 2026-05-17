export type DrillCategory = "articles" | "nouns" | "adjectives" | "phrases" | "verbs" | "pronouns" | "blocks";
export type CaseRole = "doer" | "target" | "owner" | "mixed" | null;

export interface DrillMeta {
	label: string;
	route: string;
	category: DrillCategory;
	caseRole: CaseRole;
}

export const DRILL_REGISTRY: Record<string, DrillMeta> = {
	// Articles
	"articles-article-doer": { label: "Article (Doer)", route: "/practice/cases/nominative/article", category: "articles", caseRole: "doer" },
	"articles-article-target": { label: "Article (Target)", route: "/practice/cases/accusative/article", category: "articles", caseRole: "target" },
	"articles-article-owner": { label: "Article (Owner)", route: "/practice/cases/genitive/article", category: "articles", caseRole: "owner" },
	"articles-paradigm": { label: "All Articles", route: "/practice/cases/review/articles", category: "articles", caseRole: "mixed" },

	// Nouns
	"nominative-nouns": { label: "Noun (Doer)", route: "/practice/cases/nominative/noun", category: "nouns", caseRole: "doer" },
	"nominal-noun-target": { label: "Noun (Target)", route: "/practice/cases/accusative/noun", category: "nouns", caseRole: "target" },
	"nominal-noun-owner": { label: "Noun (Owner)", route: "/practice/cases/genitive/noun", category: "nouns", caseRole: "owner" },
	"nominal-all-nouns": { label: "All Nouns", route: "/practice/cases/review/nouns", category: "nouns", caseRole: "mixed" },

	// Adjectives
	"adjectives-agreement": { label: "Adjective (Doer)", route: "/practice/cases/nominative/adjective", category: "adjectives", caseRole: "doer" },
	"adjectives-agreement-target": { label: "Adjective (Target)", route: "/practice/cases/accusative/adjective", category: "adjectives", caseRole: "target" },
	"adjectives-agreement-owner": { label: "Adjective (Owner)", route: "/practice/cases/genitive/adjective", category: "adjectives", caseRole: "owner" },
	"nominal-all-adjectives": { label: "All Adjectives", route: "/practice/cases/review/adjectives", category: "adjectives", caseRole: "mixed" },

	// Phrases
	"nominal-phrase-doer": { label: "Phrase (Doer)", route: "/practice/cases/nominative/phrase", category: "phrases", caseRole: "doer" },
	"nominal-phrase-target": { label: "Phrase (Target)", route: "/practice/cases/accusative/phrase", category: "phrases", caseRole: "target" },
	"nominal-phrase-owner": { label: "Phrase (Owner)", route: "/practice/cases/genitive/phrase", category: "phrases", caseRole: "owner" },
	"nominal-all-phrases": { label: "All Phrases", route: "/practice/cases/review/phrases", category: "phrases", caseRole: "mixed" },

	// Verbs
	"verbs-present": { label: "Present Tense", route: "/practice/verbs/present", category: "verbs", caseRole: null },
	"verbs-eimai-present": { label: "είμαι (present)", route: "/practice/verbs/present/eimai", category: "verbs", caseRole: null },
	"verbs-present-irregular": { label: "Irregular Present", route: "/practice/verbs/present/irregular", category: "verbs", caseRole: null },
	"verbs-conjugation-endings": { label: "Conjugation Endings", route: "/practice/verbs/present/conjugations", category: "verbs", caseRole: null },
	"verbs-aorist-conjugation": { label: "Aorist Conjugation", route: "/practice/verbs/past/aorist-conjugation", category: "verbs", caseRole: null },
	"verbs-aorist-formation": { label: "Aorist Formation", route: "/practice/verbs/past/aorist-formation", category: "verbs", caseRole: null },
	"verbs-aorist-stems": { label: "Aorist Stems", route: "/practice/verbs/past/aorist-stems", category: "verbs", caseRole: null },
	"verbs-eimai-past": { label: "είμαι (past)", route: "/practice/verbs/past/eimai", category: "verbs", caseRole: null },
	"verbs-imperatives": { label: "Imperatives", route: "/practice/verbs/imperatives", category: "verbs", caseRole: null },
	"verbs-future-conjugation": { label: "Future", route: "/practice/verbs/future-conjugation", category: "verbs", caseRole: null },
	"verbs-na-constructions": { label: "να Constructions", route: "/practice/verbs/na-constructions", category: "verbs", caseRole: null },

	// Pronouns
	"pronouns-object": { label: "Object Pronouns", route: "/practice/pronouns/object", category: "pronouns", caseRole: null },
	"pronouns-placement": { label: "Pronoun Placement", route: "/practice/pronouns/placement", category: "pronouns", caseRole: null },
	"pronouns-possessives": { label: "Possessives", route: "/practice/pronouns/possessives", category: "pronouns", caseRole: null },

	// Blocks
	"blocks-numbers": { label: "Numbers", route: "/practice/blocks/numbers", category: "blocks", caseRole: null },
	"blocks-days-of-week": { label: "Days of the Week", route: "/practice/blocks/days-of-week", category: "blocks", caseRole: null },
	"blocks-chunks": { label: "Key Phrases", route: "/practice/blocks/chunks", category: "blocks", caseRole: null },
};

export const DRILL_CATEGORY_LABELS: Record<DrillCategory, string> = {
	articles: "Articles",
	nouns: "Nouns",
	adjectives: "Adjectives",
	phrases: "Phrases",
	verbs: "Verbs",
	pronouns: "Pronouns",
	blocks: "Building Blocks",
};
