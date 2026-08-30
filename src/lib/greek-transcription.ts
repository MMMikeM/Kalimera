/**
 * Greek → Latin transcription: the string a learner types, and the only string
 * answer matching accepts.
 *
 * NOT IMPLEMENTED YET. This module exists so the specification in
 * `greek-transcription.test.ts` can be written and reviewed before the table is
 * built. See `docs/plans/greek-transliteration.plan.md`.
 *
 * Distinct from `greek-phonetic.ts`, which renders how a word *sounds* and is
 * for display only. A transcription tells you how the word is spelled in Latin
 * letters; it is deliberately not a pronunciation guide.
 */

export interface TranscriptionUnit {
	/** Greek letter or cluster, lowercase, no diacritics. */
	greek: string;
	/** Its Latin rendering. */
	latin: string;
	/** Context guard, e.g. voicing for αυ/ευ or word-initial position. */
	when?: (chars: string[], index: number) => boolean;
}

export const TRANSCRIPTION_UNITS: TranscriptionUnit[] = [];

export const transcribe = (_greek: string): string => {
	throw new Error("greek-transcription: not implemented");
};

/**
 * Strict: the input must be either the Greek word itself or its exact
 * transcription. There is deliberately no set of tolerated variants.
 */
export const matchesGreek = (_input: string, _greek: string): boolean => {
	throw new Error("greek-transcription: not implemented");
};
