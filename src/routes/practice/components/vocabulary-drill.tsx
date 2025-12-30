import type React from "react";
import { useMemo, useCallback } from "react";
import { useFetcher } from "react-router";
import UnifiedDrill, {
	type UnifiedQuestion,
	type UnifiedAttemptResult,
} from "./unified-drill";
import { useCurrentUserId } from "../hooks";
import type { VocabItemWithSkill } from "../data.server";

interface VocabularyDrillProps {
	items: VocabItemWithSkill[];
}

const generateQuestions = (items: VocabItemWithSkill[]): UnifiedQuestion[] =>
	items.map((item) => ({
		id: `vocab-${item.id}`,
		prompt: item.englishTranslation,
		correctGreek: item.greekText,
		timeLimit: 6000, // 6 seconds for vocabulary
	}));

const VocabularyDrill: React.FC<VocabularyDrillProps> = ({ items }) => {
	const questions = useMemo(() => generateQuestions(items), [items]);
	const userId = useCurrentUserId();
	const fetcher = useFetcher();

	const handleAttempt = useCallback(
		(result: UnifiedAttemptResult) => {
			if (!userId) return;

			const match = result.questionId.match(/vocab-(\d+)/);
			const vocabularyId = match?.[1] ? parseInt(match[1], 10) : undefined;

			fetcher.submit(
				{
					intent: "recordAttempt",
					userId: userId.toString(),
					vocabularyId: vocabularyId?.toString() || "",
					questionText: result.prompt,
					correctAnswer: result.correctGreek,
					userAnswer: result.userAnswer,
					isCorrect: result.isCorrect ? "on" : "",
					timeTaken: result.timeTaken.toString(),
					skillType: "production",
				},
				{ method: "post", action: "/practice" },
			);
		},
		[userId, fetcher],
	);

	if (items.length === 0) {
		return (
			<div className="text-center py-12 bg-olive-100 rounded-xl border border-olive-300">
				<div className="text-5xl mb-4">🎉</div>
				<h3 className="text-xl font-semibold text-olive-text mb-2">
					All caught up!
				</h3>
				<p className="text-olive-text">
					No new vocabulary items to practice.
				</p>
				<p className="text-sm text-stone-600 mt-2">
					Check the Review tab for items due for review.
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-xl mx-auto">
			<UnifiedDrill
				title={`New Vocabulary (${items.length} words)`}
				questions={questions}
				onAttempt={handleAttempt}
			/>
		</div>
	);
};

export default VocabularyDrill;
