import { db } from "@/db.server/index";
import type { CefrLevel } from "@/db.server/enums";
import { ensureUserProgress } from "@/db.server/queries/user-progress";
import type { DrillQuestion } from "@/lib/drill/generate-questions";

const NEXT_LEVEL: Partial<Record<CefrLevel, CefrLevel>> = {
	A1: "A2",
	A2: "B1",
	B1: "B2",
	B2: "C1",
	C1: "C2",
};

const PERSON_LABELS: Record<string, string> = {
	sg1: "I",
	sg2: "you",
	sg3: "he/she",
	pl1: "we",
	pl2: "you all",
	pl3: "they",
};

const shuffle = <T>(arr: T[]): T[] => {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j] as T, a[i] as T];
	}
	return a;
};

export const getVerbDrillQuestions = async (
	userId: number,
	limit: number,
): Promise<DrillQuestion[]> => {
	const progress = await ensureUserProgress(userId);
	const currentCefrLevel = progress.currentCefrLevel as CefrLevel;
	const nextLevel = NEXT_LEVEL[currentCefrLevel];
	const cefrPool: CefrLevel[] = nextLevel ? [currentCefrLevel, nextLevel] : [currentCefrLevel];

	const vocabRows = await db.query.vocabulary.findMany({
		where: {
			cefrLevel: { in: cefrPool },
			wordType: { in: ["verb"] },
		},
		with: {
			verbConjugations: {
				where: { tense: "present" },
			},
		},
		orderBy: {
			cefrLevel: "asc",
			frequencyRank: "asc",
		},
		limit: limit * 3,
	});

	const questions: DrillQuestion[] = [];
	for (const vocab of vocabRows) {
		const stem = vocab.englishTranslation.replace(/^I /, "");
		for (const conj of vocab.verbConjugations) {
			const personLabel = PERSON_LABELS[conj.person] ?? conj.person;
			const prompt =
				conj.person === "sg1" ? vocab.englishTranslation : `${personLabel} ${stem}`;
			questions.push({
				id: `db-verb-${vocab.id}-${conj.person}`,
				prompt,
				correctGreek: conj.form,
				timeLimit: 3500,
				vocabularyId: vocab.id,
			});
		}
	}

	return shuffle(questions).slice(0, limit);
};
