// Seed-only input types - used during database seeding, not stored as-is
// These define the shape of seed data before transformation to DB format

import type { AdjectiveDeclensionPattern, CefrLevel, NounDeclensionPattern, VerbTense } from "../db.server/enums";
import type { Case, ConjugationFamily, Gender, GrammaticalNumber } from "../lib/greek-grammar";
import type { Phrase } from "./phrase";

/** Surface form and optional definite article (omit or null for bare / unknown). */
export interface NominalFormCellSeed {
	form: string;
	article?: string | null;
}

/** Keys: `${case}_${number}` e.g. `accusative_singular`. */
// At least one form required, but which ones are up to you
type AtLeastOne<T> = {
	[K in keyof T]: Pick<Required<T>, K> & Partial<T>;
}[keyof T];

type AllNounFormKeys = `${Case}_${GrammaticalNumber}`;

type FullNounNominalFormsSeed = Record<AllNounFormKeys, NominalFormCellSeed>;

// Requires at least one key, doesn't care which
export type NounNominalFormsSeed = AtLeastOne<FullNounNominalFormsSeed>;

type FullAdjectiveNominalFormsSeed = Record<
	`${Case}_${GrammaticalNumber}_${Gender}`,
	NominalFormCellSeed
>;

/** Keys: `${case}_${number}_${gender}` e.g. `nominative_singular_masculine`. */
export type AdjectiveNominalFormsSeed = AtLeastOne<FullAdjectiveNominalFormsSeed>;

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

export interface FullVerbSeed {
	lemma: string;
	english: string;
	cefrLevel?: CefrLevel;
	conjugationFamily: ConjugationFamily;
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
	cefrLevel?: CefrLevel;
	declensionPattern: NounDeclensionPattern;
	nominalForms: NounNominalFormsSeed;
	metadata?: Record<string, unknown>;
}

export interface AdverbSeed {
	lemma: string;
	english: string;
	cefrLevel?: CefrLevel;
}

export interface AdjectiveSeed {
	lemma: string;
	english: string;
	cefrLevel?: CefrLevel;
	pattern: AdjectiveDeclensionPattern;
	nominalForms: AdjectiveNominalFormsSeed;
}

export interface PronounSeed {
	lemma: string;
	english: string;
}

export interface NumberSeed {
	lemma: string;
	value: number;
}

// Re-export Phrase for convenience in seed files
export type { Phrase };
