import { fetchSectionVocabularyByTagSlug } from "@/db.server/queries/vocabulary";
import type { Vocabulary } from "@/db.server/types";

export type PhraseItem = Vocabulary;

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSFORMS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getPhrasesData() {
	const [phrases, reference, verbs] = await Promise.all([
		fetchSectionVocabularyByTagSlug("phrases"),
		fetchSectionVocabularyByTagSlug("reference"),
		fetchSectionVocabularyByTagSlug("verbs"),
	]);

	return {
		survival: {
			essential: phrases.essential ?? [],
			survival: phrases.survival ?? [],
		},
		responses: {
			responses: phrases.responses ?? [],
			socialPhrases: phrases["social-phrase"] ?? [],
		},
		requests: {
			requests: phrases.request ?? [],
			commands: phrases.command ?? [],
		},
		opinions: {
			opinions: phrases.opinions ?? [],
		},
		connectors: {
			discourseMarkers: phrases["discourse-markers"] ?? [],
			discourseFillers: phrases["discourse-filler"] ?? [],
		},
		time: {
			daysOfWeek: reference["days-of-week"] ?? [],
			months: reference.months ?? [],
			timeTelling: phrases["time-telling"] ?? [],
		},
		patterns: {
			likesConstruction: {
				singular: verbs["likes-singular"] ?? [],
				plural: verbs["likes-plural"] ?? [],
			},
			nameConstruction: phrases["name-construction"] ?? [],
		},
	};
}

/** Inferred type for phrases loader data */
export type PhrasesLoaderData = Awaited<ReturnType<typeof getPhrasesData>>;
