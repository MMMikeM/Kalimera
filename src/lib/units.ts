/**
 * Units: a few words carried from first sight to sentences. The unit data says
 * which words, which pattern it introduces and which sentences use them; this
 * module turns that, plus each word's forms from the vocabulary table, into the
 * items each stage drills.
 */

export type UnitStage = "meet" | "recognise" | "recall" | "pattern" | "sentences" | "check";

export type PatternId = "persons-singular" | "target-form" | "saying-no";

export interface UnitWord {
	/** A noun is written with its article ("ο καφές"); a verb in its first person ("πάω"). */
	greek: string;
	example: { greek: string; english: string };
}

export interface UnitSentence {
	english: string;
	greek: string;
	acceptAlso?: string[];
}

export interface Unit {
	id: string;
	title: string;
	words: UnitWord[];
	/** The one pattern this unit introduces. Later units drill it on their own words. */
	pattern?: PatternId;
	sentences: UnitSentence[];
}

/** A unit word's forms, read from the vocabulary table. */
export interface WordForms {
	vocabId: number;
	english: string;
	/** Present I / you / he-she, for a verb. */
	present?: { sg1: string; sg2: string; sg3: string };
	/** With article, for a noun. */
	noun?: { name: string; target: string };
}

export interface UnitItem {
	id: string;
	/** The prompt: English, or a form to change. */
	label: string;
	greek: string;
	/** A Greek line above the prompt, such as the verb a target form follows. */
	context?: string;
	/** A hint below the prompt, such as a sentence's words out of order. */
	detail?: string;
	vocabId?: number;
	/** Recognise's answer key: the word as the unit writes it. */
	dimension?: string;
	acceptAlso?: string[];
}

const ARTICLE = /^(ο|η|το) /;

export const isNoun = (word: UnitWord) => ARTICLE.test(word.greek);

/** The word as the vocabulary table spells it: a noun without its article. */
export const lemmaOf = (word: UnitWord) => word.greek.replace(ARTICLE, "");

const verbs = (unit: Unit) => unit.words.filter((w) => !isNoun(w));
const nouns = (unit: Unit) => unit.words.filter(isNoun);

/** The patterns taught up to and including this unit, oldest first. */
export const patternsSoFar = (units: readonly Unit[], index: number): PatternId[] =>
	units
		.slice(0, index + 1)
		.map((u) => u.pattern)
		.filter((p): p is PatternId => p !== undefined);

/** How many forms a pattern drills for a unit's words. */
const PATTERN_SIZE: Record<PatternId, (unit: Unit) => number> = {
	"persons-singular": (unit) => verbs(unit).length * 2,
	"target-form": (unit) => nouns(unit).length,
	"saying-no": (unit) => verbs(unit).length,
};

/** The number of items a stage's session is scored on. */
export const unitStageSize = (units: readonly Unit[], index: number, stage: UnitStage): number => {
	const unit = units[index]!;
	const forms = patternsSoFar(units, index).reduce((n, p) => n + PATTERN_SIZE[p](unit), 0);
	switch (stage) {
		case "meet":
			return 1;
		case "recognise":
		case "recall":
			return unit.words.length;
		case "pattern":
			return forms;
		case "sentences":
			return unit.sentences.length;
		case "check":
			return unit.words.length + forms + unit.sentences.length;
	}
};

const formsOf = (word: UnitWord, forms: ReadonlyMap<string, WordForms>) => {
	const found = forms.get(lemmaOf(word));
	if (!found) throw new Error(`No forms for ${word.greek}`);
	return found;
};

const presentOf = (word: UnitWord, forms: ReadonlyMap<string, WordForms>) => {
	const { present } = formsOf(word, forms);
	if (!present) throw new Error(`No present forms for ${word.greek}`);
	return present;
};

/** "I want" → "I don't want"; "I can" → "I can't". */
export const negateEnglish = (english: string) =>
	english.startsWith("I can") ? english.replace(/^I can/, "I can't") : english.replace(/^I /, "I don't ");

const wordItems = (unit: Unit, forms: ReadonlyMap<string, WordForms>): UnitItem[] =>
	unit.words.map((word) => {
		const found = formsOf(word, forms);
		return {
			id: `${unit.id}:word:${lemmaOf(word)}`,
			label: found.english,
			greek: word.greek,
			vocabId: found.vocabId,
			dimension: word.greek,
		};
	});

const PATTERN_ITEMS: Record<
	PatternId,
	(unit: Unit, forms: ReadonlyMap<string, WordForms>, carrier: string) => UnitItem[]
> = {
	"persons-singular": (unit, forms) =>
		verbs(unit).flatMap((word) => {
			const present = presentOf(word, forms);
			const vocabId = formsOf(word, forms).vocabId;
			return [
				{ id: `${unit.id}:sg2:${word.greek}`, label: `${present.sg1} → you`, greek: present.sg2, vocabId },
				{ id: `${unit.id}:sg3:${word.greek}`, label: `${present.sg1} → he/she`, greek: present.sg3, vocabId },
			];
		}),
	"target-form": (unit, forms, carrier) =>
		nouns(unit).map((word) => {
			const found = formsOf(word, forms);
			if (!found.noun) throw new Error(`No noun forms for ${word.greek}`);
			return {
				id: `${unit.id}:target:${lemmaOf(word)}`,
				label: `the ${found.english}`,
				context: `${carrier} ___`,
				greek: found.noun.target,
				vocabId: found.vocabId,
				...(otherFeminineArticle(found.noun.target) && {
					acceptAlso: [otherFeminineArticle(found.noun.target)!],
				}),
			};
		}),
	"saying-no": (unit, forms) =>
		verbs(unit).map((word) => {
			const found = formsOf(word, forms);
			return {
				id: `${unit.id}:no:${word.greek}`,
				label: negateEnglish(found.english),
				greek: `Δεν ${presentOf(word, forms).sg1}`,
				vocabId: found.vocabId,
			};
		}),
};

/** The verb a target form is shown after: this unit's first verb, else the nearest earlier one. */
const carrierVerb = (units: readonly Unit[], index: number) =>
	units
		.slice(0, index + 1)
		.reverse()
		.flatMap(verbs)[0]?.greek ?? "Βλέπω";

/** τη and την are both said before most nouns; either is right. */
const otherFeminineArticle = (form: string) =>
	form.startsWith("την ") ? form.replace(/^την /, "τη ") : form.startsWith("τη ") ? form.replace(/^τη /, "την ") : undefined;

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** A sentence's words in alphabetical order: every word given, the order left to the learner. */
export const scrambled = (greek: string) =>
	greek
		.replace(/[;;?!.,]/g, "")
		.split(/\s+/)
		.filter(Boolean)
		.sort((a, b) => a.localeCompare(b, "el"))
		.join(" · ");

const sentenceItems = (unit: Unit, withWords: boolean): UnitItem[] =>
	unit.sentences.map((sentence, i) => ({
		id: `${unit.id}:sentence:${i}`,
		label: sentence.english,
		greek: sentence.greek,
		...(withWords && { detail: scrambled(sentence.greek) }),
		...(sentence.acceptAlso && { acceptAlso: sentence.acceptAlso }),
	}));

const patternItems = (units: readonly Unit[], index: number, forms: ReadonlyMap<string, WordForms>) => {
	const carrier = capitalise(carrierVerb(units, index));
	return patternsSoFar(units, index).flatMap((p) => PATTERN_ITEMS[p](units[index]!, forms, carrier));
};

/** The items a stage drills. Their count is always `unitStageSize` for the stage. */
export const unitStageItems = (
	units: readonly Unit[],
	index: number,
	stage: UnitStage,
	forms: ReadonlyMap<string, WordForms>,
): UnitItem[] => {
	const unit = units[index]!;
	switch (stage) {
		case "meet":
		case "recognise":
		case "recall":
			return wordItems(unit, forms);
		case "pattern":
			return patternItems(units, index, forms);
		case "sentences":
			return sentenceItems(unit, true);
		case "check":
			return [...wordItems(unit, forms), ...patternItems(units, index, forms), ...sentenceItems(unit, false)];
	}
};
