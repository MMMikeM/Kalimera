// Seed-only input types - used during database seeding, not stored as-is
// These define the shape of seed data before transformation to DB format

import type { Gender, ConjugationFamily } from "../lib/greek-grammar";
import type { Phrase } from "./phrase";

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
