import { adjacentCefrPool } from "@/lib/cefr";
import type { DrillQuestion } from "@/lib/drill/generate-questions";
import type { DrillBucket } from "@/lib/drill/types";
import { typedEntries } from "@/lib/object";
import type { PersonNumber } from "@/server/db/enums";
import { getDrillVocabPool } from "@/server/db/queries/drill-pool";
import { ensureUserProgress } from "@/server/db/queries/user-progress";
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

const FUTURE_LABELS: Record<string, string> = {
	sg1: "I will",
	sg2: "you will",
	sg3: "he/she will",
	pl1: "we will",
	pl2: "you all will",
	pl3: "they will",
};

/** Time words anchor each tense the way the lesson sheets do (χθες / σήμερα / αύριο). */
const LADDER_TENSES = {
	present: { timeWord: "σήμερα", label: "present", dimension: "present" },
	aorist: { timeWord: "χθες", label: "past", dimension: "past" },
	future: { timeWord: "αύριο", label: "future", dimension: "future" },
} as const;

type LadderTense = keyof typeof LADDER_TENSES;

const LADDER_TENSE_LIST = ["present", "aorist", "future"] as const;

const drawVerbPool = async (userId: number, drillId: string, limit: number) => {
	const { currentCefrLevel } = await ensureUserProgress(userId);

	const pool = await getDrillVocabPool({
		userId,
		drillId,
		wordTypes: ["verb"],
		cefrPool: adjacentCefrPool(currentCefrLevel),
		limit,
	});

	const entries = typedEntries(pool);
	const bucketMap = new Map<number, DrillBucket>();
	for (const [bucket, ids] of entries) {
		for (const id of ids) bucketMap.set(id, bucket);
	}

	return { allIds: entries.flatMap(([, ids]) => ids), bucketMap };
};

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

export const getVerbConjugationQuestions = async (
	userId: number,
	limit: number,
	tense: "present" | "aorist" | "past_continuous" | "future",
	idPrefix: string,
	timeLimit: number,
	drillId: string,
	persons?: PersonNumber[],
): Promise<DrillQuestion[]> => {
	const { allIds, bucketMap } = await drawVerbPool(userId, drillId, limit);
	const vocabRows = await getVerbsWithConjugationsForTense(allIds, tense);

	const labels = tense === "future" ? FUTURE_LABELS : PERSON_LABELS;
	const questions: DrillQuestion[] = [];
	for (const vocab of vocabRows) {
		const rawStem = vocab.englishTranslation.replace(/^I /, "");
		const conjForms = persons
			? vocab.verbConjugations.filter((c) => persons.includes(c.person))
			: vocab.verbConjugations;
		for (const conj of conjForms) {
			const personLabel = labels[conj.person] ?? conj.person;
			// "I am" / "I am X" verbs: stem starts with "am", which is not a valid
			// English stem elsewhere. Normalise to "are" / "is", or "be" after "will".
			const isAmStem = rawStem === "am" || rawStem.startsWith("am ");
			const stem = isAmStem
				? tense === "future"
					? rawStem.replace(/^am/, "be")
					: conj.person === "sg3"
						? rawStem.replace(/^am/, "is")
						: rawStem.replace(/^am/, "are")
				: rawStem;
			const prompt =
				tense === "future"
					? `${personLabel} ${stem}`
					: conj.person === "sg1"
						? vocab.englishTranslation
						: `${personLabel} ${stem}`;
			questions.push({
				id: `${idPrefix}${vocab.id}-${conj.person}`,
				prompt,
				correctGreek: conj.form,
				timeLimit,
				vocabId: vocab.id,
				bucket: bucketMap.get(vocab.id),
			});
		}
	}

	return assertEnough(questions, limit);
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
				timeLimit: 4500,
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
				timeLimit: 4000,
				vocabId: vocab.id,
				bucket: bucketMap.get(vocab.id),
				dimension: target.dimension,
			});
		}
	}

	return assertEnough(questions, limit);
};
