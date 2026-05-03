import type { CefrLevel } from "@/db.server/enums";
import { getDrillVocabPoolWithFallback } from "@/db.server/queries/drill-pool";
import { getNominalFormsForDrill } from "@/db.server/queries/nominal-forms";
import { ensureUserProgress } from "@/db.server/queries/user-progress";
import type { DrillQuestion } from "@/lib/drill/generate-questions";

const NEXT_LEVEL: Partial<Record<CefrLevel, CefrLevel>> = {
	A1: "A2",
	A2: "B1",
	B1: "B2",
	B2: "C1",
	C1: "C2",
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

	const forms = await getNominalFormsForDrill(wordType, pool.vocabularyIds);

	const questions: DrillQuestion[] = forms.map((f) => {
		const genderHint = f.gender ? `, ${f.gender.charAt(0)}` : "";
		const promptHint = `(${f.caseHint}, ${f.numberHint}${genderHint})`;
		return {
			id: `nominal-${wordType}-${f.vocabId}-${f.caseHint}-${f.numberHint}-${f.gender ?? "x"}`,
			prompt: `${f.english} ${promptHint}`,
			correctGreek: f.greekFull,
			timeLimit: 5000,
			vocabularyId: f.vocabId,
		};
	});

	return shuffle(questions).slice(0, limit);
};
