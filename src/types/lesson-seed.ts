import type { AdjectiveSeedInput } from "../scripts/seed-data/vocabulary/adjective-seed-enrichment";
import type { NounSeedInput } from "../scripts/seed-data/vocabulary/noun-seed-enrichment";
import type { Phrase } from "./phrase";
import type { FullVerbSeed, AdverbSeed } from "./seed";

/**
 * Unified types for lesson seed data.
 * Import from this file instead of importing from multiple sources.
 */

/**
 * Where a note is taught: a guide section (`"verbs/ladder"`), the word's own entry
 * in Learn (`"word"`), or Learn → Essentials (`"essentials"`). The guides guard
 * test fails on any value that names no real section.
 */
export type GrammarNoteHome = `${string}/${string}` | "word" | "essentials";

export type GrammarNote = {
	pattern: string;
	examples: string[];
	explanation: string;
	section: GrammarNoteHome;
};

export type Lesson = {
	meta: Record<PropertyKey, unknown>;
	grammarNotes?: GrammarNote[];
	verbs?: FullVerbSeed[];
	nouns?: NounSeedInput[];
	adverbs?: AdverbSeed[];
	adjectives?: AdjectiveSeedInput[];
	phrases?: Phrase[];
};
