import type React from "react";
import { useMemo, useCallback } from "react";
import { useFetcher } from "react-router";
import UnifiedDrill, {
	type UnifiedQuestion,
	type UnifiedAttemptResult,
} from "./unified-drill";
import { useCurrentUserId } from "../hooks";
import type { VocabItemWithSkill } from "../data.server";

export type SrsDrillVariant = "vocabulary" | "review";

interface SrsDrillProps {
	variant: SrsDrillVariant;
	items: VocabItemWithSkill[];
}

const VARIANT_CONFIG: Record<
	SrsDrillVariant,
	{
		idPrefix: string;
		title: (count: number) => string;
		emptyTitle: string;
		emptyMessage: string;
		emptyHint: string;
	}
> = {
	vocabulary: {
		idPrefix: "vocab",
		title: (count) => `New Vocabulary (${count} words)`,
		emptyTitle: "All caught up!",
		emptyMessage: "No new vocabulary items to practice.",
		emptyHint: "Check the Review tab for items due for review.",
	},
	review: {
		idPrefix: "review",
		title: (count) => `Review (${count} due)`,
		emptyTitle: "All caught up!",
		emptyMessage: "No items due for review right now. Great work!",
		emptyHint: "Check back later for new reviews.",
	},
};

const SrsDrill: React.FC<SrsDrillProps> = ({ variant, items }) => {
	const config = VARIANT_CONFIG[variant];
	const userId = useCurrentUserId();
	const fetcher = useFetcher();

	const questions = useMemo(
		(): UnifiedQuestion[] =>
			items.map((item) => ({
				id: `${config.idPrefix}-${item.id}`,
				prompt: item.englishTranslation,
				correctGreek: item.greekText,
				timeLimit: 6000,
			})),
		[items, config.idPrefix]
	);

	const handleAttempt = useCallback(
		(result: UnifiedAttemptResult) => {
			if (!userId) return;

			const match = result.questionId.match(
				new RegExp(`${config.idPrefix}-(\\d+)`)
			);
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
				{ method: "post", action: "/practice" }
			);
		},
		[userId, fetcher, config.idPrefix]
	);

	if (items.length === 0) {
		return (
			<div className="text-center py-12 bg-olive-100 rounded-xl border border-olive-300">
				<div className="text-5xl mb-4">?</div>
				<h3 className="text-xl font-semibold text-olive-text mb-2">
					{config.emptyTitle}
				</h3>
				<p className="text-olive-text">{config.emptyMessage}</p>
				<p className="text-sm text-stone-600 mt-2">{config.emptyHint}</p>
			</div>
		);
	}

	return (
		<div className="max-w-xl mx-auto">
			<UnifiedDrill
				title={config.title(items.length)}
				questions={questions}
				onAttempt={handleAttempt}
			/>
		</div>
	);
};

export default SrsDrill;
