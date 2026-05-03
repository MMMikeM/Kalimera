import type { CefrLevel } from "@/db.server/enums";
import { getDrillVocabPoolWithFallback } from "@/db.server/queries/drill-pool";
import { getVocabularyWithNominalForms } from "@/db.server/queries/nominal-forms";
import { ensureUserProgress } from "@/db.server/queries/user-progress";
import type { DrillQuestion } from "@/lib/drill/generate-questions";

const NEXT_LEVEL: Partial<Record<CefrLevel, CefrLevel>> = {
	A1: "A2",
	A2: "B1",
	B1: "B2",
	B2: "C1",
	C1: "C2",
};

const CASE_LABEL: Record<string, string> = {
	nominative: "Doer",
	accusative: "Target",
	genitive: "Owner",
};

const NUMBER_LABEL: Record<string, string> = {
	singular: "sg",
	plural: "pl",
};

const shuffle = <T>(arr: T[]): T[] => {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j] as T, a[i] as T];
	}
	return a;
};

/** Build mixed-case review questions from nominal_forms.
 * Forward direction: English (with case + gender hint) → type the Greek phrase.
 * Vocab pool is rolling: top-N unmastered lemmas at the user's CEFR band. */
export const getNominalReviewQuestions = async (
	userId: number,
	wordType: "noun" | "adjective",
	drillId: string,
	limit: number,
): Promise<DrillQuestion[]> => {
	const progress = await ensureUserProgress(userId);
	const currentCefrLevel = progress.currentCefrLevel as CefrLevel;
	const nextLevel = NEXT_LEVEL[currentCefrLevel];
	const cefrPool: CefrLevel[] = nextLevel ? [currentCefrLevel, nextLevel] : [currentCefrLevel];

	const pool = await getDrillVocabPoolWithFallback({
		userId,
		drillId,
		wordType,
		cefrPool,
	});

	if (pool.vocabularyIds.length === 0) return [];

	const rows = await getVocabularyWithNominalForms(wordType, pool.vocabularyIds);

	const questions: DrillQuestion[] = [];
	for (const vocab of rows) {
		for (const form of vocab.nominalForms) {
			const caseHint = CASE_LABEL[form.grammaticalCase] ?? form.grammaticalCase;
			const numberHint = NUMBER_LABEL[form.number] ?? form.number;
			const genderHint = form.gender ? `, ${form.gender.charAt(0)}` : "";
			const greekFull = form.article ? `${form.article} ${form.form}` : form.form;
			questions.push({
				id: `nominal-${wordType}-${vocab.id}-${caseHint}-${numberHint}-${form.gender ?? "x"}`,
				prompt: `${vocab.englishTranslation} (${caseHint}, ${numberHint}${genderHint})`,
				correctGreek: greekFull,
				timeLimit: 5000,
				vocabularyId: vocab.id,
			});
		}
	}

	return shuffle(questions).slice(0, limit);
};
