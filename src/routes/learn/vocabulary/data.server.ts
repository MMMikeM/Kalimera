import { hasNumericValue, hasTimeRange } from "@/db.server/metadata";
import {
	getVocabBySection,
	getVerbsWithPatterns,
	type VocabItemWithSection,
	type VerbWithPattern,
} from "@/db.server/queries/vocabulary";

// Re-export types for consumers
export type { VocabItemWithSection as VocabItem, VerbWithPattern };

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSFORMS
// ═══════════════════════════════════════════════════════════════════════════════

function groupByTag<T extends { tagSlug: string }>(items: T[]): Record<string, T[]> {
	const result: Record<string, T[]> = {};
	for (const item of items) {
		const key = item.tagSlug;
		if (!(key in result)) result[key] = [];
		result[key]?.push(item);
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
	// Query all sections in parallel
	const [nounsData, verbsData, phrasesData, referenceData, verbPatterns] = await Promise.all([
		getVocabBySection("nouns"),
		getVocabBySection("verbs"),
		getVocabBySection("phrases"),
		getVocabBySection("reference"),
		getVerbsWithPatterns(),
	]);

	// Group each section's data by tag
	const nouns = groupByTag(nounsData);
	const verbs = groupByTag(verbsData);
	const phrases = groupByTag(phrasesData);
	const reference = groupByTag(referenceData);

	return {
		nouns: {
			people: nouns.people ?? [],
			shopping: nouns.shopping ?? [],
			household: nouns.household ?? [],
			vehicles: nouns["transport-vehicle"] ?? [],
			summer: nouns.summer ?? [],
		},
		verbs: {
			categories: groupVerbsByPattern(verbPatterns),
			transportActions: verbs["transport-action"] ?? [],
		},
		phrases: {
			essential: phrases.essential ?? [],
			daysOfWeek: reference["days-of-week"] ?? [],
			months: reference.months ?? [],
			discourseFillers: phrases["discourse-filler"] ?? [],
			socialPhrases: phrases["social-phrase"] ?? [],
			commands: phrases.command ?? [],
			questionWords: phrases.question ?? [],
			likesConstruction: {
				singular: verbs["likes-singular"] ?? [],
				plural: verbs["likes-plural"] ?? [],
			},
			nameConstruction: phrases["name-construction"] ?? [],
			timeTelling: phrases["time-telling"] ?? [],
			discourseMarkers: phrases["discourse-markers"] ?? [],
			responses: phrases.responses ?? [],
			opinions: phrases.opinions ?? [],
			arriving: phrases["conversation-arriving"] ?? [],
			food: phrases["conversation-food"] ?? [],
			smalltalk: phrases["conversation-smalltalk"] ?? [],
		},
		reference: {
			timesOfDay: (reference["time-of-day"] ?? []).map((t) => ({
				...t,
				timeRange: hasTimeRange(t.metadata) ? t.metadata.timeRange : undefined,
			})),
			numbers: (reference.number ?? [])
				.map((n) => ({
					...n,
					numericValue: hasNumericValue(n.metadata) ? n.metadata.numericValue : undefined,
				}))
				.sort((a, b) => (a.numericValue ?? 0) - (b.numericValue ?? 0)),
			colors: reference.color ?? [],
			frequencyAdverbs: reference.frequency ?? [],
			positionAdverbs: reference.position ?? [],
		},
	};
}

/** Inferred type for vocabulary loader data */
export type VocabularyLoaderData = Awaited<ReturnType<typeof getVocabularyData>>;
