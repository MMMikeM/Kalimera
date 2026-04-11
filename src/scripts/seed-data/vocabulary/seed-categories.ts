import type { VocabWithTags } from "../../seed-pipeline";
import { DAILY_PATTERN_ITEMS } from "../grammar-patterns";
import {
	ADJECTIVE_ITEMS,
	COLOR_ITEMS,
} from "./adjectives";
import {
	FREQUENCY_ITEMS,
	INDEFINITE_ADVERB_ITEMS,
	POSITION_ITEMS,
} from "./adverbs";
import { NUMBER_ITEMS } from "./numbers";
import { NOUN_ITEMS } from "./nouns";
import {
	DAY_ITEMS,
	LIKES_PLURAL_ITEMS,
	LIKES_SINGULAR_ITEMS,
	MONTH_ITEMS,
	PHRASE_SEED_CATEGORIES,
	TIME_TELLING_ITEMS,
} from "./phrases";
import {
	GENDERED_PRONOUN_ITEMS,
	INDEFINITE_PRONOUN_ITEMS,
} from "./pronouns";
import { TRANSPORT_ACTION_ITEMS, VERB_ITEMS } from "./verbs";

export const VOCAB_SEED_CATEGORIES: Array<{ name: string; items: VocabWithTags[] }> = [
	{ name: "nouns", items: NOUN_ITEMS },
	{ name: "verbs", items: VERB_ITEMS },
	...PHRASE_SEED_CATEGORIES,
	{ name: "time-telling phrases", items: TIME_TELLING_ITEMS },
	{ name: "days of week", items: DAY_ITEMS },
	{ name: "months", items: MONTH_ITEMS },
	{ name: "transport actions", items: TRANSPORT_ACTION_ITEMS },
	{ name: "frequency adverbs", items: FREQUENCY_ITEMS },
	{ name: "position adverbs", items: POSITION_ITEMS },
	{ name: "likes construction (singular)", items: LIKES_SINGULAR_ITEMS },
	{ name: "likes construction (plural)", items: LIKES_PLURAL_ITEMS },
	{ name: "colors", items: COLOR_ITEMS },
	{ name: "adjectives", items: ADJECTIVE_ITEMS },
	{ name: "indefinite pronouns", items: INDEFINITE_PRONOUN_ITEMS },
	{ name: "gendered pronouns", items: GENDERED_PRONOUN_ITEMS },
	{ name: "indefinite adverbs", items: INDEFINITE_ADVERB_ITEMS },
	{ name: "numbers", items: NUMBER_ITEMS },
	{ name: "daily patterns", items: DAILY_PATTERN_ITEMS },
];
