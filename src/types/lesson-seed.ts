/**
 * Unified types for lesson seed data.
 * Import from this file instead of importing from multiple sources.
 */

export type { Phrase } from "./phrase";
export type { FullVerbSeed, AdverbSeed } from "./seed";
export type { NounSeedInput } from "../scripts/seed-data/vocabulary/noun-seed-enrichment";
export type { AdjectiveSeedInput } from "../scripts/seed-data/vocabulary/adjective-seed-enrichment";

import type { AdjectiveSeedInput } from "../scripts/seed-data/vocabulary/adjective-seed-enrichment";
import type { NounSeedInput } from "../scripts/seed-data/vocabulary/noun-seed-enrichment";
import type { Phrase } from "./phrase";
import type { FullVerbSeed, AdverbSeed } from "./seed";

export type Lesson = {
	meta: Record<PropertyKey, any>;
	grammarNotes?: Record<PropertyKey, any>[];
	verbs?: FullVerbSeed[];
	nouns?: NounSeedInput[];
	adverbs?: AdverbSeed[];
	adjectives?: AdjectiveSeedInput[];
	phrases?: Phrase[];
};
