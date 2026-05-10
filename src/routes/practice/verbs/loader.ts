import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { CefrLevel } from "@/db.server/enums";
import { getDrillVocabPoolWithFallback } from "@/db.server/queries/drill-pool";
import { ensureUserProgress } from "@/db.server/queries/user-progress";
import { getVerbsWithConjugationsForTense } from "@/db.server/queries/vocabulary";
import { adjacentCefrPool } from "@/lib/cefr";
import type { DrillQuestion } from "@/lib/drill/generate-questions";
import { shuffle } from "@/lib/shuffle";
import { requireAuth } from "@/lib/auth-session.server";

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

const getVerbConjugationQuestions = async (
	userId: number,
	limit: number,
	tense: "present" | "aorist" | "future",
	idPrefix: string,
	timeLimit: number,
	drillId: string,
): Promise<DrillQuestion[]> => {
	const progress = await ensureUserProgress(userId);
	const currentCefrLevel = progress.currentCefrLevel as CefrLevel;

	const pool = await getDrillVocabPoolWithFallback({
		userId,
		drillId,
		wordType: "verb",
		cefrPool: adjacentCefrPool(currentCefrLevel),
	});

	if (pool.vocabularyIds.length === 0) return [];

	const vocabRows = await getVerbsWithConjugationsForTense(pool.vocabularyIds, tense);

	const labels = tense === "future" ? FUTURE_LABELS : PERSON_LABELS;
	const questions: DrillQuestion[] = [];
	for (const vocab of vocabRows) {
		const stem = vocab.englishTranslation.replace(/^I /, "");
		for (const conj of vocab.verbConjugations) {
			const personLabel = labels[conj.person] ?? conj.person;
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
				vocabularyId: vocab.id,
				weakAreaIdentifier: String(vocab.id),
			});
		}
	}

	return shuffle(questions).slice(0, limit);
};

async function getVerbDrillQuestionsImpl(userId: number, limit: number) {
	return getVerbConjugationQuestions(userId, limit, "present", "db-verb-", 3500, "verbs-present");
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

export const getAoristDrillQuestionsFn = createServerFn({ method: "GET" })
	.inputValidator(z.object({ limit: z.number() }))
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		return getAoristDrillQuestionsImpl(userId, data.limit);
	});

export const getFutureDrillQuestionsFn = createServerFn({ method: "GET" })
	.inputValidator(z.object({ limit: z.number() }))
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		return getFutureDrillQuestionsImpl(userId, data.limit);
	});
