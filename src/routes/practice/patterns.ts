// Weak area patterns for tracking specific grammar and vocabulary patterns

export const WEAK_AREA_PATTERNS = {
	// Cases
	"case:accusative": "Accusative case",
	"case:genitive": "Genitive case",
	"case:nominative": "Nominative case",

	// Verbs
	"verb_family:eimai": "είμαι conjugation",
	"verb_family:echo": "έχω conjugation",
	"verb_family:thelo": "θέλω conjugation",
	"verb_family:boro": "μπορώ conjugation",
	"verb_family:kano": "κάνω conjugation",
	"verb_family:pao": "πάω conjugation",

	// Pronouns
	"pronoun:object_weak": "Weak object pronouns (με, σε...)",
	"pronoun:object_strong": "Strong object pronouns (εμένα, εσένα...)",
	"pronoun:possessive": "Possessive pronouns (μου, σου...)",

	// Articles
	"article:masculine_singular": "Masculine singular articles (ο, τον, του)",
	"article:masculine_plural": "Masculine plural articles (οι, τους, των)",
	"article:feminine_singular": "Feminine singular articles (η, την, της)",
	"article:feminine_plural": "Feminine plural articles (οι, τις, των)",
	"article:neuter_singular": "Neuter singular articles (το, του)",
	"article:neuter_plural": "Neuter plural articles (τα, των)",
} as const;

export type WeakAreaPattern = keyof typeof WEAK_AREA_PATTERNS;

export const getPatternLabel = (pattern: string): string =>
	WEAK_AREA_PATTERNS[pattern as WeakAreaPattern] || pattern;

// Map drill types to their area types
export const DRILL_AREA_TYPES = {
	pronouns: "pronoun",
	articles: "article",
	verbs: "verb_family",
	cases: "case",
} as const;
