import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireAuth } from "@/server/auth/session";

import { getVerbConjugationQuestions } from "./verbs.server";

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
