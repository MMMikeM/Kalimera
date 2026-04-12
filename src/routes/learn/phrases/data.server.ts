import {
	fetchPhrases,
	fetchReference,
	fetchVerbsBySection,
} from "@/db.server/queries/vocabulary-sections";
import type { Vocabulary } from "@/db.server/types";
import { groupBySlug } from "@/lib/group-by-slug";

export type PhraseItem = Vocabulary;

export async function getPhrasesData() {
	const [phraseRows, referenceRows, verbRows] = await Promise.all([
		fetchPhrases(),
		fetchReference(),
		fetchVerbsBySection(),
	]);

	const phrases = groupBySlug(phraseRows);
	const reference = groupBySlug(referenceRows);
	const verbs = groupBySlug(verbRows);

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
