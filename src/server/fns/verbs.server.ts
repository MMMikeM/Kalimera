import type { DrillQuestion } from "@/lib/drill/types";
import { getDrillVocabPool } from "@/server/db/queries/drill-pool";
import {
	getVerbsWithConjugationsForTense,
	getVerbsWithConjugationsForTenses,
} from "@/server/db/queries/vocabulary";

// TODO: view concern — prompt strings should be assembled client-side from
// structured data (person, tense, stem). DrillQuestion.prompt is currently a
// pre-built string, so this lives here until that interface is refactored.
const PERSON_LABELS: Record<string, string> = {
	sg1: "I",
	sg2: "you",
	sg3: "he/she",
	pl1: "we",
	pl2: "you all",
	pl3: "they",
};

/** Time words anchor each tense the way the lesson sheets do (χθες / σήμερα / αύριο). */
const LADDER_TENSES = {
	present: { timeWord: "σήμερα", label: "present", dimension: "present" },
	aorist: { timeWord: "χθες", label: "past", dimension: "past" },
	future: { timeWord: "αύριο", label: "future", dimension: "future" },
} as const;

type LadderTense = keyof typeof LADDER_TENSES;

const LADDER_TENSE_LIST = ["present", "aorist", "future"] as const;

const drawVerbPool = (userId: number, drillId: string, limit: number) =>
	getDrillVocabPool({ userId, drillId, wordTypes: ["verb"], limit });

const assertEnough = (questions: DrillQuestion[], limit: number) => {
	if (questions.length < limit) {
		throw new Error(
			`Insufficient questions: got ${questions.length}, need ${limit}. Pool may be exhausted or conjugations unseeded.`,
		);
	}
	return questions;
};

const sg1ByTense = (conjugations: Array<{ tense: string; person: string; form: string }>) => {
	const forms = new Map<LadderTense, string>();
	for (const conj of conjugations) {
		if (conj.person !== "sg1") continue;
		if (conj.tense in LADDER_TENSES) forms.set(conj.tense as LadderTense, conj.form);
	}
	return forms;
};

/** What distinguishes one conjugation drill from another. */
export interface ConjugationDrill {
	tense: "present" | "aorist" | "past_continuous" | "future";
	idPrefix: string;
	/**
	 * `vocabulary` asks for the first person from the English meaning. `conjugation`
	 * shows the first person and asks for the other five, so a card tests the ending
	 * alone and never whether the learner remembers the verb.
	 */
	kind: "vocabulary" | "conjugation";
}

const englishPrompt = (english: string, tense: ConjugationDrill["tense"]) =>
	tense === "future" ? `I will ${english.replace(/^I /, "").replace(/^am\b/, "be")}` : english;

/** Verbs the learner has met come first; unmet ones only top up a pool that would run short. */
const preferMetVerbs = (questions: DrillQuestion[], limit: number) => {
	const met = questions.filter((q) => q.bucket !== "new");
	if (met.length >= limit) return met;
	const unmet = questions.filter((q) => q.bucket === "new");
	return [...met, ...unmet.slice(0, limit - met.length)];
};

export const getVerbConjugationQuestions = async (
	userId: number,
	drillId: string,
	limit: number,
	{ tense, idPrefix, kind }: ConjugationDrill,
): Promise<DrillQuestion[]> => {
	const { allIds, bucketMap } = await drawVerbPool(userId, drillId, limit);
	const vocabRows = await getVerbsWithConjugationsForTense(allIds, tense);

	const questions: DrillQuestion[] = [];
	for (const vocab of vocabRows) {
		const firstPerson = vocab.verbConjugations.find((c) => c.person === "sg1");
		if (!firstPerson) continue;
		const cards =
			kind === "vocabulary"
				? [{ conj: firstPerson, prompt: englishPrompt(vocab.englishTranslation, tense) }]
				: vocab.verbConjugations
						.filter((c) => c.person !== "sg1")
						.map((conj) => ({
							conj,
							prompt: `${firstPerson.form} → ${PERSON_LABELS[conj.person] ?? conj.person}`,
						}));
		for (const { conj, prompt } of cards) {
			questions.push({
				id: `${idPrefix}${vocab.id}-${conj.person}`,
				prompt,
				correctGreek: conj.form,
				vocabId: vocab.id,
				bucket: bucketMap.get(vocab.id),
			});
		}
	}

	return assertEnough(kind === "conjugation" ? preferMetVerbs(questions, limit) : questions, limit);
};

/**
 * Transformation cards across the three-form ladder: each card shows one form and
 * asks for the next one round the loop (present → past → future → present).
 */
export const getTenseLadderQuestions = async (
	userId: number,
	limit: number,
): Promise<DrillQuestion[]> => {
	const { allIds, bucketMap } = await drawVerbPool(userId, "verbs-tense-ladder", limit);
	const vocabRows = await getVerbsWithConjugationsForTenses(allIds, [...LADDER_TENSE_LIST]);

	const questions: DrillQuestion[] = [];
	for (const vocab of vocabRows) {
		const forms = sg1ByTense(vocab.verbConjugations);
		const present = forms.get("present");
		const aorist = forms.get("aorist");
		const future = forms.get("future");
		if (!present || !aorist || !future) continue;

		const steps = [
			{ from: present, to: aorist, tense: "aorist" },
			{ from: aorist, to: future, tense: "future" },
			{ from: future, to: present, tense: "present" },
		] as const;

		for (const step of steps) {
			const target = LADDER_TENSES[step.tense];
			questions.push({
				id: `db-verb-ladder-${vocab.id}-${step.tense}`,
				prompt: `${step.from} → ${target.timeWord} (${target.label})`,
				correctGreek: step.to,
				vocabId: vocab.id,
				bucket: bucketMap.get(vocab.id),
			});
		}
	}

	return assertEnough(questions, limit);
};

/**
 * Same sg1 forms as the ladder, but each card carries its tense as the reverse-mode
 * answer key: show έβαλα, pick "past".
 */
export const getTenseRecognitionQuestions = async (
	userId: number,
	limit: number,
): Promise<DrillQuestion[]> => {
	const { allIds, bucketMap } = await drawVerbPool(userId, "verbs-tense-recognition", limit);
	const vocabRows = await getVerbsWithConjugationsForTenses(allIds, [...LADDER_TENSE_LIST]);

	const questions: DrillQuestion[] = [];
	for (const vocab of vocabRows) {
		const forms = sg1ByTense(vocab.verbConjugations);
		for (const tense of LADDER_TENSE_LIST) {
			const form = forms.get(tense);
			if (!form) continue;
			const target = LADDER_TENSES[tense];
			questions.push({
				id: `db-verb-tense-${vocab.id}-${tense}`,
				prompt: `${vocab.englishTranslation} · ${target.timeWord} (${target.label})`,
				correctGreek: form,
				vocabId: vocab.id,
				bucket: bucketMap.get(vocab.id),
				dimension: target.dimension,
			});
		}
	}

	return assertEnough(questions, limit);
};
