import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { adjacentCefrPool } from "@/lib/cefr";
import type { DrillQuestion } from "@/lib/drill/generate-questions";
import type { DrillBucket } from "@/lib/drill/types";
import { typedEntries } from "@/lib/object";
import { requireAuth } from "@/server/auth/session";
import type { PersonNumber } from "@/server/db/enums";
import { getDrillVocabPool } from "@/server/db/queries/drill-pool";
import { ensureUserProgress } from "@/server/db/queries/user-progress";
import { getVerbsWithConjugationsForTense } from "@/server/db/queries/vocabulary";

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

export const getVerbConjugationQuestions = async (
	userId: number,
	limit: number,
	tense: "present" | "aorist" | "past_continuous" | "future",
	idPrefix: string,
	timeLimit: number,
	drillId: string,
	persons?: PersonNumber[],
): Promise<DrillQuestion[]> => {
	const { currentCefrLevel } = await ensureUserProgress(userId);

	const pool = await getDrillVocabPool({
		userId,
		drillId,
		wordTypes: ["verb"],
		cefrPool: adjacentCefrPool(currentCefrLevel),
		limit,
	});

	const entries = typedEntries(pool);
	const allIds = entries.flatMap(([, ids]) => ids);

	const bucketMap = new Map<number, DrillBucket>();
	for (const [bucket, ids] of entries) {
		for (const id of ids) bucketMap.set(id, bucket);
	}

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
			// English stem for non-first-person. Normalise to "are" / "is".
			const stem =
				rawStem === "am" || rawStem.startsWith("am ")
					? conj.person === "sg3"
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

	if (questions.length < limit) {
		throw new Error(
			`Insufficient questions: got ${questions.length}, need ${limit}. Pool may be exhausted or conjugations unseeded.`,
		);
	}

	return questions;
};

async function getVerbDrillQuestionsImpl(userId: number, limit: number) {
	return getVerbConjugationQuestions(userId, limit, "present", "db-verb-", 3500, "verbs-present");
}

async function getPresentSg1QuestionsImpl(userId: number, limit: number) {
	return getVerbConjugationQuestions(
		userId,
		limit,
		"present",
		"db-verb-sg1-",
		3000,
		"verbs-vocabulary-sg1",
		["sg1"],
	);
}

async function getAoristDrillQuestionsImpl(userId: number, limit: number) {
	return getVerbConjugationQuestions(
		userId,
		limit,
		"aorist",
		"db-verb-aorist-",
		4500,
		"verbs-aorist-conjugation",
	);
}

async function getAoristSg1QuestionsImpl(userId: number, limit: number) {
	return getVerbConjugationQuestions(
		userId,
		limit,
		"aorist",
		"db-verb-aor-sg1-",
		4000,
		"verbs-aorist-sg1",
		["sg1"],
	);
}

async function getFutureDrillQuestionsImpl(userId: number, limit: number) {
	return getVerbConjugationQuestions(
		userId,
		limit,
		"future",
		"db-verb-future-",
		4500,
		"verbs-future-conjugation",
	);
}

export const getVerbDrillQuestionsFn = createServerFn({ method: "GET" })
	.inputValidator(z.object({ limit: z.number() }))
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		return getVerbDrillQuestionsImpl(userId, data.limit);
	});

export const getPresentSg1QuestionsFn = createServerFn({ method: "GET" })
	.inputValidator(z.object({ limit: z.number() }))
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		return getPresentSg1QuestionsImpl(userId, data.limit);
	});

export const getAoristDrillQuestionsFn = createServerFn({ method: "GET" })
	.inputValidator(z.object({ limit: z.number() }))
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		return getAoristDrillQuestionsImpl(userId, data.limit);
	});

export const getAoristSg1QuestionsFn = createServerFn({ method: "GET" })
	.inputValidator(z.object({ limit: z.number() }))
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		return getAoristSg1QuestionsImpl(userId, data.limit);
	});

export const getFutureDrillQuestionsFn = createServerFn({ method: "GET" })
	.inputValidator(z.object({ limit: z.number() }))
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		return getFutureDrillQuestionsImpl(userId, data.limit);
	});
