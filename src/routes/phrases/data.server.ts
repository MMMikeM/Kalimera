import { getVocabByTags, type VocabItem } from "@/db/queries/vocabulary";

// Re-export VocabItem as PhraseItem for semantic clarity
export type PhraseItem = VocabItem;

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const PHRASE_TAGS = [
	"essential",
	"survival",
	"responses",
	"social-phrase",
	"request",
	"command",
	"opinions",
	"discourse-markers",
	"discourse-filler",
	"days-of-week",
	"months",
	"time-telling",
	"likes-singular",
	"likes-plural",
	"name-construction",
	"question",
] as const;

type TagSlug = (typeof PHRASE_TAGS)[number];

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSFORMS
// ═══════════════════════════════════════════════════════════════════════════════

function groupByTag(items: PhraseItem[]): Record<TagSlug, PhraseItem[]> {
	const result = {} as Record<TagSlug, PhraseItem[]>;
	for (const tag of PHRASE_TAGS) {
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

// ═══════════════════════════════════════════════════════════════════════════════
// DATA LOADER
// ═══════════════════════════════════════════════════════════════════════════════

export async function getPhrasesData() {
	const allPhrases = await getVocabByTags(PHRASE_TAGS);
	const byTag = groupByTag(allPhrases);

	return {
		survival: {
			essential: byTag.essential,
			survival: byTag.survival,
		},
		responses: {
			responses: byTag.responses,
			socialPhrases: byTag["social-phrase"],
		},
		requests: {
			requests: byTag.request,
			commands: byTag.command,
		},
		opinions: {
			opinions: byTag.opinions,
		},
		connectors: {
			discourseMarkers: byTag["discourse-markers"],
			discourseFillers: byTag["discourse-filler"],
		},
		time: {
			daysOfWeek: byTag["days-of-week"],
			months: byTag.months,
			timeTelling: byTag["time-telling"],
		},
		constructions: {
			likesConstruction: {
				singular: byTag["likes-singular"],
				plural: byTag["likes-plural"],
			},
			nameConstruction: byTag["name-construction"],
			questionWords: byTag.question,
		},
	};
}

/** Inferred type for phrases loader data */
export type PhrasesLoaderData = Awaited<ReturnType<typeof getPhrasesData>>;
