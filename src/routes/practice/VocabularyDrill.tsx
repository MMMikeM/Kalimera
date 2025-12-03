import type React from "react";
import { useMemo, useCallback } from "react";
import { useFetcher } from "react-router";
import DrillCard, { type AttemptResult } from "./DrillCard";
import type { Question } from "./types";
import { useCurrentUserId } from "./hooks";

interface VocabularyWord {
	greek: string;
	english: string;
}

const VOCABULARY: VocabularyWord[] = [
	// Family
	{ greek: "η μητέρα", english: "mother" },
	{ greek: "ο πατέρας", english: "father" },
	{ greek: "η αδερφή", english: "sister" },
	{ greek: "ο αδερφός", english: "brother" },
	{ greek: "τα παιδιά", english: "children" },
	{ greek: "η γιαγιά", english: "grandmother" },
	{ greek: "ο παππούς", english: "grandfather" },

	// Food
	{ greek: "ο καφές", english: "coffee" },
	{ greek: "το νερό", english: "water" },
	{ greek: "το φαγητό", english: "food" },
	{ greek: "το ψωμί", english: "bread" },

	// Common words
	{ greek: "το σπίτι", english: "house" },
	{ greek: "καλημέρα", english: "good morning" },
	{ greek: "ευχαριστώ", english: "thank you" },
	{ greek: "παρακαλώ", english: "please / you're welcome" },
	{ greek: "ναι", english: "yes" },
	{ greek: "όχι", english: "no" },

	// Time
	{ greek: "σήμερα", english: "today" },
	{ greek: "αύριο", english: "tomorrow" },
	{ greek: "χθες", english: "yesterday" },

	// Adjectives
	{ greek: "καλός/ή/ό", english: "good" },
	{ greek: "μεγάλος/η/ο", english: "big" },
	{ greek: "μικρός/ή/ό", english: "small" },
];

const getRandomWrongAnswers = (
	correctAnswer: string,
	count: number,
	pool: string[],
): string[] => {
	const filtered = pool.filter((word) => word !== correctAnswer);
	const shuffled = filtered.sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
};

const generateQuestions = (): Question[] => {
	const questions: Question[] = [];
	const englishWords = VOCABULARY.map((w) => w.english);
	const greekWords = VOCABULARY.map((w) => w.greek);

	for (let i = 0; i < VOCABULARY.length; i++) {
		const word = VOCABULARY[i];

		// Greek → English question
		const englishWrongAnswers = getRandomWrongAnswers(word.english, 3, englishWords);
		const englishOptions = [word.english, ...englishWrongAnswers].sort(
			() => Math.random() - 0.5,
		);
		const englishCorrectIndex = englishOptions.indexOf(word.english);

		questions.push({
			id: `vocab-gr-${i}`,
			prompt: word.greek,
			promptSubtext: "What does this word mean?",
			options: englishOptions,
			correctIndex: englishCorrectIndex,
			explanation: `${word.greek} means "${word.english}"`,
		});

		// English → Greek question
		const greekWrongAnswers = getRandomWrongAnswers(word.greek, 3, greekWords);
		const greekOptions = [word.greek, ...greekWrongAnswers].sort(
			() => Math.random() - 0.5,
		);
		const greekCorrectIndex = greekOptions.indexOf(word.greek);

		questions.push({
			id: `vocab-en-${i}`,
			prompt: `How do you say "${word.english}" in Greek?`,
			options: greekOptions,
			correctIndex: greekCorrectIndex,
			explanation: `"${word.english}" is "${word.greek}" in Greek`,
		});
	}

	return questions;
};

const VocabularyDrill: React.FC = () => {
	const questions = useMemo(() => generateQuestions(), []);
	const userId = useCurrentUserId();
	const fetcher = useFetcher();

	const handleAttempt = useCallback(
		(result: AttemptResult) => {
			if (!userId) return;

			fetcher.submit(
				{
					intent: "recordAttempt",
					userId: userId.toString(),
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

	const handleComplete = useCallback(
		(score: { correct: number; total: number }) => {
			console.log(`Drill complete: ${score.correct}/${score.total}`);
		},
		[]
	);

	return (
		<DrillCard
			title="Vocabulary Practice"
			description="Essential words for daily conversation"
			questions={questions}
			colorClass="border-orange-200"
			bgClass="bg-orange-50/50"
			onAttempt={handleAttempt}
			onComplete={handleComplete}
		/>
	);
};

export default VocabularyDrill;
