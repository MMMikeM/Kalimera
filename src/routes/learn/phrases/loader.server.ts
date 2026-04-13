import { getVocabBySlug } from "@/db.server/queries/vocabulary-sections";
import type { Vocabulary } from "@/db.server/types";

export type PhraseItem = Vocabulary;

export async function loader() {
	const [phraseTags, referenceTags, verbTags] = await Promise.all([
		getVocabBySlug("phrases", ["phrase"]),
		getVocabBySlug("reference", ["noun", "adverb", "adjective"]),
		getVocabBySlug("verbs", ["verb"]),
	]);

	const toSlugMap = (tags: typeof phraseTags) =>
		Object.fromEntries(tags.map(t => [t.slug, t.vocabularyTags.map(vt => vt.vocabulary).filter(v => v !== null)]));

	const phrases = toSlugMap(phraseTags);
	const reference = toSlugMap(referenceTags);
	const verbs = toSlugMap(verbTags);

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
export type PhrasesLoaderData = Awaited<ReturnType<typeof loader>>;
