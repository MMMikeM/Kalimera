import {
	getVocabBySection,
	type VocabItemWithSection,
} from "@/db/queries/vocabulary";

// Re-export VocabItemWithSection as PhraseItem for semantic clarity
export type PhraseItem = VocabItemWithSection;

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSFORMS
// ═══════════════════════════════════════════════════════════════════════════════

function groupByTag<T extends { tagSlug: string }>(items: T[]): Record<string, T[]> {
	const result: Record<string, T[]> = {};
	for (const item of items) {
		const group = (result[item.tagSlug] ??= []);
		group.push(item);
	}
	return result;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATA LOADER
// ═══════════════════════════════════════════════════════════════════════════════

export async function getPhrasesData() {
	// Query sections that contain phrase-related tags
	const [phrasesData, referenceData, verbsData] = await Promise.all([
		getVocabBySection("phrases"),
		getVocabBySection("reference"),
		getVocabBySection("verbs"),
	]);

	// Group each section's data by tag
	const phrases = groupByTag(phrasesData);
	const reference = groupByTag(referenceData);
	const verbs = groupByTag(verbsData);

	return {
		survival: {
			essential: phrases["essential"] ?? [],
			survival: phrases["survival"] ?? [],
		},
		responses: {
			responses: phrases["responses"] ?? [],
			socialPhrases: phrases["social-phrase"] ?? [],
		},
		requests: {
			requests: phrases["request"] ?? [],
			commands: phrases["command"] ?? [],
		},
		opinions: {
			opinions: phrases["opinions"] ?? [],
		},
		connectors: {
			discourseMarkers: phrases["discourse-markers"] ?? [],
			discourseFillers: phrases["discourse-filler"] ?? [],
		},
		time: {
			daysOfWeek: reference["days-of-week"] ?? [],
			months: reference["months"] ?? [],
			timeTelling: phrases["time-telling"] ?? [],
		},
		constructions: {
			likesConstruction: {
				singular: verbs["likes-singular"] ?? [],
				plural: verbs["likes-plural"] ?? [],
			},
			nameConstruction: phrases["name-construction"] ?? [],
			questionWords: phrases["question"] ?? [],
		},
	};
}

/** Inferred type for phrases loader data */
export type PhrasesLoaderData = Awaited<ReturnType<typeof getPhrasesData>>;
