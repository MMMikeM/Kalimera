import type React from "react";
import { useMemo, useCallback } from "react";
import { useFetcher } from "react-router";
import DrillCard, { type AttemptResult } from "./drill-card";
import type { Question } from "./types";
import { useCurrentUserId } from "./hooks";
import type { VocabItemWithSkill } from "./queries.server";

interface VocabularyDrillProps {
	items: VocabItemWithSkill[];
}

const generateQuestionsFromItems = (items: VocabItemWithSkill[]): Question[] => {
	const questions: Question[] = [];

	for (let i = 0; i < items.length; i++) {
		const item = items[i];

		const otherItems = items.filter((_, idx) => idx !== i);
		const shuffledOthers = otherItems.sort(() => Math.random() - 0.5).slice(0, 3);

		const englishOptions = [
			item.englishTranslation,
			...shuffledOthers.map((o) => o.englishTranslation),
		].sort(() => Math.random() - 0.5);
		const englishCorrectIndex = englishOptions.indexOf(item.englishTranslation);

		questions.push({
			id: `vocab-gr-${item.id}`,
			prompt: item.greekText,
			promptSubtext: item.pronunciation ? `(${item.pronunciation})` : "What does this word mean?",
			options: englishOptions,
			correctIndex: englishCorrectIndex,
			explanation: `${item.greekText} means "${item.englishTranslation}"`,
		});

		if (otherItems.length >= 3) {
			const greekOptions = [item.greekText, ...shuffledOthers.map((o) => o.greekText)].sort(
				() => Math.random() - 0.5
			);
			const greekCorrectIndex = greekOptions.indexOf(item.greekText);

			questions.push({
				id: `vocab-en-${item.id}`,
				prompt: `How do you say "${item.englishTranslation}" in Greek?`,
				options: greekOptions,
				correctIndex: greekCorrectIndex,
				explanation: `"${item.englishTranslation}" is "${item.greekText}" in Greek`,
			});
		}
	}

	return questions.sort(() => Math.random() - 0.5);
};

const VocabularyDrill: React.FC<VocabularyDrillProps> = ({ items }) => {
	const questions = useMemo(() => generateQuestionsFromItems(items), [items]);
	const userId = useCurrentUserId();
	const fetcher = useFetcher();

	const handleAttempt = useCallback(
		(result: AttemptResult) => {
			if (!userId) return;

			const match = result.questionId.match(/vocab-(?:gr|en)-(\d+)/);
			const vocabularyId = match ? parseInt(match[1], 10) : undefined;

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
				{ method: "post" }
			);
		},
		[userId, fetcher]
	);

	if (items.length === 0) {
		return (
			<div className="text-center py-12 bg-olive/10 rounded-xl border border-olive/30">
				<div className="text-5xl mb-4">🎉</div>
				<h3 className="text-xl font-semibold text-olive-text mb-2">All words learned!</h3>
				<p className="text-olive-text">You've practiced all available vocabulary.</p>
				<p className="text-sm text-stone-600 mt-2">Check the Review tab for items due for review.</p>
			</div>
		);
	}

	if (items.length < 4) {
		return (
			<div className="text-center py-12 bg-honey/10 rounded-xl border border-honey/30">
				<div className="text-5xl mb-4">📚</div>
				<h3 className="text-xl font-semibold text-honey-text mb-2">Almost there!</h3>
				<p className="text-honey-text">
					Only {items.length} new words available. Need at least 4 for multiple choice.
				</p>
			</div>
		);
	}

	return (
		<DrillCard
			title="Learn New Words"
			description={`${items.length} new words to learn`}
			questions={questions}
			variant="vocabulary"
			onAttempt={handleAttempt}
		/>
	);
};

export default VocabularyDrill;
