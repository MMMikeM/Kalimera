import { and, eq } from "drizzle-orm";
import {
	practiceSessions,
	practiceAttempts,
	vocabularySkills,
	weakAreas,
	type SessionType,
	type SkillType,
	type AreaType,
} from "../../db/schema";
import { calculateSRS, qualityFromAttempt, getInitialSRSValues } from "./srs";

// biome-ignore lint/suspicious/noExplicitAny: DB type varies between libsql (local) and D1 (production)
type DB = any;

export interface StartSessionInput {
	userId: number;
	sessionType: SessionType;
	category?: string;
	wordTypeFilter?: string;
	focusArea?: string;
}

export const startSession = async (db: DB, input: StartSessionInput) => {
	const [session] = await db
		.insert(practiceSessions)
		.values({
			userId: input.userId,
			sessionType: input.sessionType,
			category: input.category || null,
			wordTypeFilter: input.wordTypeFilter || null,
			focusArea: input.focusArea || null,
		})
		.returning();

	return session;
};

export interface RecordAttemptInput {
	userId: number;
	sessionId?: number;
	vocabularyId?: number;
	questionText: string;
	correctAnswer: string;
	userAnswer: string;
	isCorrect: boolean;
	timeTaken: number; // milliseconds
	skillType: SkillType;
	weakAreaType?: AreaType;
	weakAreaIdentifier?: string;
}

export const recordAttempt = async (db: DB, input: RecordAttemptInput) => {
	// Record the attempt
	const [attempt] = await db
		.insert(practiceAttempts)
		.values({
			userId: input.userId,
			sessionId: input.sessionId || null,
			vocabularyId: input.vocabularyId || null,
			questionText: input.questionText,
			correctAnswer: input.correctAnswer,
			userAnswer: input.userAnswer,
			isCorrect: input.isCorrect,
			timeTaken: input.timeTaken,
		})
		.returning();

	// Update vocabulary skill if this is vocabulary practice
	if (input.vocabularyId) {
		await updateVocabularySkill(db, {
			userId: input.userId,
			vocabularyId: input.vocabularyId,
			skillType: input.skillType,
			isCorrect: input.isCorrect,
			timeTaken: input.timeTaken,
		});
	}

	// Update weak areas if this is a pattern-based drill
	if (input.weakAreaType && input.weakAreaIdentifier) {
		await updateWeakArea(db, {
			userId: input.userId,
			areaType: input.weakAreaType,
			areaIdentifier: input.weakAreaIdentifier,
			isCorrect: input.isCorrect,
		});
	}

	return attempt;
};

interface UpdateVocabularySkillInput {
	userId: number;
	vocabularyId: number;
	skillType: SkillType;
	isCorrect: boolean;
	timeTaken: number;
}

const updateVocabularySkill = async (db: DB, input: UpdateVocabularySkillInput) => {
	const { userId, vocabularyId, skillType, isCorrect, timeTaken } = input;

	// Get existing skill or create new one
	const [existingSkill] = await db
		.select()
		.from(vocabularySkills)
		.where(
			and(
				eq(vocabularySkills.userId, userId),
				eq(vocabularySkills.vocabularyId, vocabularyId),
				eq(vocabularySkills.skillType, skillType)
			)
		);

	const quality = qualityFromAttempt(isCorrect, timeTaken);

	if (existingSkill) {
		// Update existing skill with SM-2
		const srsResult = calculateSRS({
			quality,
			easeFactor: existingSkill.easeFactor || 2.3,
			intervalDays: existingSkill.intervalDays || 1,
			reviewCount: existingSkill.reviewCount || 0,
		});

		await db
			.update(vocabularySkills)
			.set({
				easeFactor: srsResult.nextEaseFactor,
				intervalDays: srsResult.nextIntervalDays,
				nextReviewAt: srsResult.nextReviewAt,
				reviewCount: (existingSkill.reviewCount || 0) + 1,
				lastReviewedAt: new Date(),
			})
			.where(
				and(
					eq(vocabularySkills.userId, userId),
					eq(vocabularySkills.vocabularyId, vocabularyId),
					eq(vocabularySkills.skillType, skillType)
				)
			);
	} else {
		// Create new skill with initial SRS values
		const initial = getInitialSRSValues();
		const srsResult = calculateSRS({
			quality,
			easeFactor: initial.easeFactor,
			intervalDays: initial.intervalDays,
			reviewCount: initial.reviewCount,
		});

		await db.insert(vocabularySkills).values({
			userId,
			vocabularyId,
			skillType,
			easeFactor: srsResult.nextEaseFactor,
			intervalDays: srsResult.nextIntervalDays,
			nextReviewAt: srsResult.nextReviewAt,
			reviewCount: 1,
			lastReviewedAt: new Date(),
		});
	}
};

interface UpdateWeakAreaInput {
	userId: number;
	areaType: AreaType;
	areaIdentifier: string;
	isCorrect: boolean;
}

const updateWeakArea = async (db: DB, input: UpdateWeakAreaInput) => {
	const { userId, areaType, areaIdentifier, isCorrect } = input;

	const [existingArea] = await db
		.select()
		.from(weakAreas)
		.where(
			and(
				eq(weakAreas.userId, userId),
				eq(weakAreas.areaType, areaType),
				eq(weakAreas.areaIdentifier, areaIdentifier)
			)
		);

	if (isCorrect) {
		// Correct answer: reduce mistake count or remove if mastered
		if (existingArea) {
			if (existingArea.mistakeCount <= 1) {
				// Remove from weak areas if this was the last mistake
				await db
					.delete(weakAreas)
					.where(eq(weakAreas.id, existingArea.id));
			} else {
				// Reduce mistake count
				await db
					.update(weakAreas)
					.set({
						mistakeCount: existingArea.mistakeCount - 1,
						needsFocus: existingArea.mistakeCount - 1 >= 3,
					})
					.where(eq(weakAreas.id, existingArea.id));
			}
		}
	} else {
		// Wrong answer: increment mistake count
		if (existingArea) {
			await db
				.update(weakAreas)
				.set({
					mistakeCount: existingArea.mistakeCount + 1,
					lastMistakeAt: new Date(),
					needsFocus: true,
				})
				.where(eq(weakAreas.id, existingArea.id));
		} else {
			await db.insert(weakAreas).values({
				userId,
				areaType,
				areaIdentifier,
				mistakeCount: 1,
				needsFocus: false, // Don't flag as needing focus until 3+ mistakes
			});
		}
	}
};

export interface CompleteSessionInput {
	sessionId: number;
	totalQuestions: number;
	correctAnswers: number;
}

export const completeSession = async (db: DB, input: CompleteSessionInput) => {
	const [session] = await db
		.update(practiceSessions)
		.set({
			totalQuestions: input.totalQuestions,
			correctAnswers: input.correctAnswers,
			completedAt: new Date(),
		})
		.where(eq(practiceSessions.id, input.sessionId))
		.returning();

	return session;
};
