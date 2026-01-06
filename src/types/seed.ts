// Seed-only input types - used during database seeding, not stored as-is
// These define the shape of seed data before transformation to DB format

import type { Gender, ConjugationFamily } from "../lib/greek-grammar";
import type { VerbTense } from "../db/enums";
import type { Phrase } from "./phrase";

export interface VerbConjugationFormsSeed {
	sg1: string;
	sg2: string;
	sg3: string;
	pl1: string;
	pl2: string;
	pl3: string;
}

export interface VerbConjugationSeed {
	tense: VerbTense;
	forms: VerbConjugationFormsSeed;
	stems?: Partial<VerbConjugationFormsSeed>;
}

export interface VerbImperativeSeed {
	imperfective?: { singular: string; plural: string };
	perfective?: { singular: string; plural: string };
}

export interface FullVerbSeed extends VerbSeed {
	isSuppletive?: boolean;
	stems?: {
		present?: string;
		aorist?: string;
		future?: string;
	};
	conjugations?: VerbConjugationSeed[];
	imperatives?: VerbImperativeSeed;
}

export interface NounSeed {
	lemma: string;
	gender: Gender;
	english: string;
	metadata?: Record<string, unknown>;
}

export interface VerbSeed {
	lemma: string;
	english: string;
	conjugationFamily: ConjugationFamily;
}

export interface AdverbSeed {
	lemma: string;
	english: string;
}

export interface AdjectiveSeed {
	lemma: string;
	english: string;
}

export interface NumberSeed {
	lemma: string;
	value: number;
}

// Re-export Phrase for convenience in seed files
export type { Phrase };
