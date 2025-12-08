import type React from "react";
import { useMemo, useCallback } from "react";
import { useFetcher } from "react-router";
import DrillCard, { type AttemptResult } from "./drill-card";
import type { Question } from "./types";
import { useCurrentUserId } from "./hooks";
import type { VocabItemWithSkill } from "./queries.server";

interface ReviewDrillProps {
	items: VocabItemWithSkill[];
}

const generateQuestionsFromItems = (
	items: VocabItemWithSkill[],
): Question[] => {
	const questions: Question[] = [];

	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		if (!item) continue;

		// Generate wrong answers from other items
		const otherItems = items.filter((_, idx) => idx !== i);
		const shuffledOthers = otherItems
			.sort(() => Math.random() - 0.5)
			.slice(0, 3);

		// Greek → English question
		const englishOptions = [
			item.englishTranslation,
			...shuffledOthers.map((o) => o.englishTranslation),
		].sort(() => Math.random() - 0.5);
		const englishCorrectIndex = englishOptions.indexOf(item.englishTranslation);

		questions.push({
			id: `review-gr-${item.id}`,
			prompt: item.greekText,
			promptSubtext: item.pronunciation
				? `(${item.pronunciation})`
				: "What does this word mean?",
			options: englishOptions,
			correctIndex: englishCorrectIndex,
			explanation: `${item.greekText} means "${item.englishTranslation}"`,
		});

		// English → Greek question (if we have enough items)
		if (otherItems.length >= 3) {
			const greekOptions = [
				item.greekText,
				...shuffledOthers.map((o) => o.greekText),
			].sort(() => Math.random() - 0.5);
			const greekCorrectIndex = greekOptions.indexOf(item.greekText);

			questions.push({
				id: `review-en-${item.id}`,
				prompt: `How do you say "${item.englishTranslation}" in Greek?`,
				options: greekOptions,
				correctIndex: greekCorrectIndex,
				explanation: `"${item.englishTranslation}" is "${item.greekText}" in Greek`,
			});
		}
	}

	// Shuffle all questions
	return questions.sort(() => Math.random() - 0.5);
};

const ReviewDrill: React.FC<ReviewDrillProps> = ({ items }) => {
	const questions = useMemo(() => generateQuestionsFromItems(items), [items]);
	const userId = useCurrentUserId();
	const fetcher = useFetcher();

	const handleAttempt = useCallback(
		(result: AttemptResult) => {
			if (!userId) return;

			// Extract vocabularyId from the question id
			const match = result.questionId.match(/review-(?:gr|en)-(\d+)/);
			const vocabularyId = match?.[1] ? parseInt(match[1], 10) : undefined;

			fetcher.submit(
				{
					intent: "recordAttempt",
					userId: userId.toString(),
					vocabularyId: vocabularyId?.toString() || "",
					questionText: result.questionText,
					correctAnswer: result.correctAnswer,
					userAnswer: result.userAnswer,
					isCorrect: result.isCorrect.toString(),
					timeTaken: result.timeTaken.toString(),
					skillType: "recognition",
				},
				{ method: "post" },
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
					No items due for review right now. Great work!
				</p>
				<p className="text-sm text-stone-600 mt-2">
					Check back later for new reviews.
				</p>
			</div>
		);
	}

	if (items.length < 4) {
		return (
			<div className="text-center py-12 bg-honey-100 rounded-xl border border-honey-300">
				<div className="text-5xl mb-4">📚</div>
				<h3 className="text-xl font-semibold text-honey-text mb-2">
					Not enough items yet
				</h3>
				<p className="text-honey-text">
					You need at least 4 vocabulary items to start reviewing.
				</p>
				<p className="text-sm text-stone-600 mt-2">
					Practice more vocabulary to build your review queue!
				</p>
			</div>
		);
	}

	return (
		<DrillCard
			title="Spaced Review"
			description={`${items.length} items due for review`}
			questions={questions}
			variant="review"
			onAttempt={handleAttempt}
		/>
	);
};

export default ReviewDrill;
