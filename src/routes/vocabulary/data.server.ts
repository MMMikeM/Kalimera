import {
	getVocabByTags,
	getVerbsWithPatterns,
	type VocabItem,
	type VerbWithPattern,
} from "@/db/queries/vocabulary";

// Re-export types for consumers
export type { VocabItem, VerbWithPattern };

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const VOCABULARY_TAGS = [
	"people",
	"time-of-day",
	"time-expression",
	"time-telling",
	"position",
	"expression",
	"discourse-filler",
	"social-phrase",
	"command",
	"question",
	"likes-singular",
	"likes-plural",
	"name-construction",
	"discourse-markers",
	"responses",
	"opinions",
	"conversation-arriving",
	"conversation-food",
	"conversation-smalltalk",
	"shopping",
	"household",
	"color",
	"number",
	"transport-vehicle",
	"transport-action",
	"frequency",
	"summer",
	"essential",
	"days-of-week",
	"months",
] as const;

type TagSlug = (typeof VOCABULARY_TAGS)[number];

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSFORMS
// ═══════════════════════════════════════════════════════════════════════════════

function groupByTag(items: VocabItem[]): Record<TagSlug, VocabItem[]> {
	const result = {} as Record<TagSlug, VocabItem[]>;
	for (const tag of VOCABULARY_TAGS) {
		result[tag] = [];
	}
	for (const item of items) {
		const tag = item.tagSlug as TagSlug;
		if (result[tag]) {
			result[tag].push(item);
		}
	}
	return result;
}

export interface VerbSubCategory {
	title: string;
	pattern: string;
	verbs: VerbWithPattern[];
}

export interface VerbCategory {
	id: string;
	title: string;
	verbs: VerbWithPattern[];
	subCategories?: VerbSubCategory[];
}

const DEPONENT_PATTERNS = ["-ομαι", "-άμαι"];

function groupVerbsByPattern(verbs: VerbWithPattern[]): VerbCategory[] {
	const groups: Record<string, VerbCategory> = {};
	const deponentVerbs: Record<string, VerbWithPattern[]> = {
		"-ομαι": [],
		"-άμαι": [],
	};

	for (const verb of verbs) {
		const pattern = verb.pattern || "unknown";

		if (DEPONENT_PATTERNS.includes(pattern)) {
			deponentVerbs[pattern]?.push(verb);
		} else {
			if (!groups[pattern]) {
				groups[pattern] = {
					id: `verb-${pattern.toLowerCase().replace(/\s+/g, "-")}`,
					title: pattern,
					verbs: [],
				};
			}
			groups[pattern]?.verbs.push(verb);
		}
	}

	const result = Object.values(groups);

	const omaiVerbs = deponentVerbs["-ομαι"] ?? [];
	const amaiVerbs = deponentVerbs["-άμαι"] ?? [];
	const totalDeponents = omaiVerbs.length + amaiVerbs.length;
	if (totalDeponents > 0) {
		result.push({
			id: "verb-deponent",
			title: "deponent",
			verbs: [...omaiVerbs, ...amaiVerbs],
			subCategories: [
				{
					title: "Type 1: -ομαι",
					pattern: "-ομαι",
					verbs: omaiVerbs,
				},
				{
					title: "Type 2: -άμαι",
					pattern: "-άμαι",
					verbs: amaiVerbs,
				},
			],
		});
	}

	return result;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATA LOADER
// ═══════════════════════════════════════════════════════════════════════════════

export async function getVocabularyData() {
	const [allVocab, verbs] = await Promise.all([
		getVocabByTags(VOCABULARY_TAGS),
		getVerbsWithPatterns(),
	]);

	const byTag = groupByTag(allVocab);

	return {
		nouns: {
			people: byTag.people,
			shopping: byTag.shopping,
			household: byTag.household,
			vehicles: byTag["transport-vehicle"],
			summer: byTag.summer,
		},
		verbs: {
			categories: groupVerbsByPattern(verbs),
			transportActions: byTag["transport-action"],
		},
		phrases: {
			essential: byTag.essential,
			daysOfWeek: byTag["days-of-week"],
			months: byTag.months,
			discourseFillers: byTag["discourse-filler"],
			socialPhrases: byTag["social-phrase"],
			commands: byTag.command,
			questionWords: byTag.question,
			likesConstruction: {
				singular: byTag["likes-singular"],
				plural: byTag["likes-plural"],
			},
			nameConstruction: byTag["name-construction"],
			timeTelling: byTag["time-telling"],
			discourseMarkers: byTag["discourse-markers"],
			responses: byTag.responses,
			opinions: byTag.opinions,
			arriving: byTag["conversation-arriving"],
			food: byTag["conversation-food"],
			smalltalk: byTag["conversation-smalltalk"],
		},
		reference: {
			timesOfDay: byTag["time-of-day"].map((t) => ({
				...t,
				timeRange: (t.metadata as Record<string, unknown> | null)?.timeRange as
					| string
					| undefined,
			})),
			numbers: byTag.number
				.map((n) => ({
					...n,
					numericValue: (n.metadata as Record<string, unknown> | null)
						?.numericValue as number | undefined,
				}))
				.sort((a, b) => (a.numericValue ?? 0) - (b.numericValue ?? 0)),
			colors: byTag.color,
			frequencyAdverbs: byTag.frequency,
			positionAdverbs: byTag.position,
		},
	};
}

/** Inferred type for vocabulary loader data */
export type VocabularyLoaderData = Awaited<ReturnType<typeof getVocabularyData>>;
