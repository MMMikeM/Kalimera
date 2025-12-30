import type React from "react";
import { useMemo, useState, useRef, useCallback } from "react";
import { Zap, RotateCcw, Settings } from "lucide-react";
import { Link, useOutletContext, useFetcher } from "react-router";
import UnifiedDrill, {
	type UnifiedQuestion,
	type UnifiedAttemptResult,
	type SessionStats,
} from "./components/unified-drill";
import { shuffleArray } from "./types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components";
import {
	OBJECT_PRONOUNS,
	POSSESSIVE_PRONOUNS,
} from "../../constants/pronouns";
import { VERB_CONJUGATIONS } from "../../constants/verbs";
import type { PracticeLoaderData } from "./layout";

// Speed Drill: Mix all content types for rapid production practice
// Single entry point - no category selection needed

// Generate pronoun questions
const generatePronounQuestions = (): UnifiedQuestion[] => {
	const questions: UnifiedQuestion[] = [];

	for (const paradigm of OBJECT_PRONOUNS) {
		questions.push({
			id: `speed-obj-${paradigm.person}-sg`,
			prompt: paradigm.singular.english,
			correctGreek: paradigm.singular.greek,
			timeLimit: 4000, // Aggressive 4s timer
		});
		questions.push({
			id: `speed-obj-${paradigm.person}-pl`,
			prompt: paradigm.plural.english,
			correctGreek: paradigm.plural.greek,
			timeLimit: 4000,
		});
	}

	for (const paradigm of POSSESSIVE_PRONOUNS) {
		questions.push({
			id: `speed-poss-${paradigm.person}-sg`,
			prompt: paradigm.singular.english,
			correctGreek: paradigm.singular.greek,
			timeLimit: 4000,
		});
		questions.push({
			id: `speed-poss-${paradigm.person}-pl`,
			prompt: paradigm.plural.english,
			correctGreek: paradigm.plural.greek,
			timeLimit: 4000,
		});
	}

	// Add common sentences
	const sentences = [
		{ english: "Do you see me?", greek: "Με βλέπεις" },
		{ english: "I'm waiting for you", greek: "Σε περιμένω" },
		{ english: "I know him", greek: "Τον ξέρω" },
		{ english: "I see her", greek: "Την βλέπω" },
		{ english: "my house", greek: "το σπίτι μου" },
		{ english: "your name", greek: "το όνομά σου" },
		{ english: "our family", greek: "η οικογένειά μας" },
	];

	for (const [i, sent] of sentences.entries()) {
		questions.push({
			id: `speed-sent-${i}`,
			prompt: sent.english,
			correctGreek: sent.greek,
			timeLimit: 5000, // Slightly longer for sentences
		});
	}

	return questions;
};

// Generate verb questions
const generateVerbQuestions = (): UnifiedQuestion[] => {
	const questions: UnifiedQuestion[] = [];

	const PRIORITY_VERBS = [
		{ key: "echo", english: "have" },
		{ key: "thelo", english: "want" },
		{ key: "boro", english: "can" },
		{ key: "eimai", english: "be" },
	] as const;

	for (const verb of PRIORITY_VERBS) {
		const conjugations = VERB_CONJUGATIONS[verb.key];
		if (!conjugations) continue;

		for (const conj of conjugations) {
			questions.push({
				id: `speed-verb-${verb.key}-${conj.person}`,
				prompt: conj.english,
				correctGreek: conj.form,
				timeLimit: 3500, // Fast for single words
			});
		}
	}

	// Common verb phrases
	const phrases = [
		{ english: "I want coffee", greek: "Θέλω καφέ" },
		{ english: "I have time", greek: "Έχω χρόνο" },
		{ english: "I am here", greek: "Είμαι εδώ" },
		{ english: "we want water", greek: "Θέλουμε νερό" },
		{ english: "they have", greek: "έχουν" },
		{ english: "you can", greek: "μπορείς" },
	];

	for (const [i, phrase] of phrases.entries()) {
		questions.push({
			id: `speed-vphrase-${i}`,
			prompt: phrase.english,
			correctGreek: phrase.greek,
			timeLimit: 4500,
		});
	}

	return questions;
};

// Generate article questions
const generateArticleQuestions = (): UnifiedQuestion[] => {
	const questions: UnifiedQuestion[] = [];

	const articles = [
		// Nominative
		{ english: "the father", greek: "ο πατέρας" },
		{ english: "the mother", greek: "η μητέρα" },
		{ english: "the child", greek: "το παιδί" },
		{ english: "the friends", greek: "οι φίλοι" },
		{ english: "the sisters", greek: "οι αδελφές" },
		{ english: "the children", greek: "τα παιδιά" },
		// Accusative
		{ english: "I see the father", greek: "Βλέπω τον πατέρα" },
		{ english: "I see the mother", greek: "Βλέπω την μητέρα" },
		{ english: "I see the child", greek: "Βλέπω το παιδί" },
		{ english: "I want the coffee", greek: "Θέλω τον καφέ" },
		{ english: "I open the door", greek: "Ανοίγω την πόρτα" },
		{ english: "I read the book", greek: "Διαβάζω το βιβλίο" },
	];

	for (const [i, art] of articles.entries()) {
		questions.push({
			id: `speed-art-${i}`,
			prompt: art.english,
			correctGreek: art.greek,
			timeLimit: 4500,
		});
	}

	return questions;
};

// Combine all questions and shuffle
const generateSpeedDrillQuestions = (count = 20): UnifiedQuestion[] => {
	const allQuestions = [
		...generatePronounQuestions(),
		...generateVerbQuestions(),
		...generateArticleQuestions(),
	];

	return shuffleArray(allQuestions).slice(0, count);
};

const SpeedDrill: React.FC = () => {
	const { userId } = useOutletContext<PracticeLoaderData>();
	const fetcher = useFetcher();
	const sessionIdRef = useRef<number | null>(null);

	const [sessionCount, setSessionCount] = useState(0);
	const [lastStats, setLastStats] = useState<SessionStats | null>(null);
	const [drillSize, setDrillSize] = useState(15);

	const questions = useMemo(
		() => generateSpeedDrillQuestions(drillSize),
		[drillSize],
	);

	// Start a new session in the database
	const startDbSession = useCallback(() => {
		if (!userId) return;

		fetcher.submit(
			{
				intent: "startSession",
				userId: userId.toString(),
				sessionType: "case_drill",
				category: "speed_drill",
			},
			{ method: "post", action: "/practice" },
		);
	}, [userId, fetcher]);

	// Record an attempt to the database
	const handleAttempt = useCallback(
		(attempt: UnifiedAttemptResult) => {
			if (!userId) return;

			// Determine weak area type based on question ID
			let weakAreaType: "case" | "gender" | "verb_family" | undefined;
			let weakAreaIdentifier: string | undefined;

			if (attempt.questionId.includes("obj-") || attempt.questionId.includes("poss-")) {
				weakAreaType = "case";
				weakAreaIdentifier = attempt.questionId.includes("obj-")
					? "object_pronouns"
					: "possessive_pronouns";
			} else if (attempt.questionId.includes("verb-")) {
				weakAreaType = "verb_family";
				weakAreaIdentifier = attempt.questionId.split("-")[2]; // e.g., "echo", "thelo"
			} else if (attempt.questionId.includes("art-")) {
				weakAreaType = "case";
				weakAreaIdentifier = "articles";
			}

			fetcher.submit(
				{
					intent: "recordAttempt",
					userId: userId.toString(),
					sessionId: sessionIdRef.current?.toString() ?? "",
					questionText: attempt.prompt,
					correctAnswer: attempt.correctGreek,
					userAnswer: attempt.userAnswer,
					isCorrect: attempt.isCorrect ? "on" : "",
					timeTaken: attempt.timeTaken.toString(),
					skillType: "production",
					...(weakAreaType && { weakAreaType }),
					...(weakAreaIdentifier && { weakAreaIdentifier }),
				},
				{ method: "post", action: "/practice" },
			);
		},
		[userId, fetcher],
	);

	// Complete the session in the database
	const handleComplete = useCallback(
		(stats: SessionStats) => {
			setLastStats(stats);

			if (!userId || !sessionIdRef.current) return;

			fetcher.submit(
				{
					intent: "completeSession",
					sessionId: sessionIdRef.current.toString(),
					totalQuestions: stats.total.toString(),
					correctAnswers: stats.correct.toString(),
				},
				{ method: "post", action: "/practice" },
			);
		},
		[userId, fetcher],
	);

	const handleNewSession = () => {
		setSessionCount((c) => c + 1);
		setLastStats(null);
		sessionIdRef.current = null;
	};

	// Handle session creation response
	if (fetcher.data?.success && fetcher.data?.session?.id && !sessionIdRef.current) {
		sessionIdRef.current = fetcher.data.session.id;
	}

	// Show start screen before first session
	if (sessionCount === 0 && !lastStats) {
		return (
			<div className="max-w-xl mx-auto">
				<Card variant="bordered" padding="lg" className="text-center">
					<div className="py-8">
						<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta-100 mb-4">
							<Zap size={32} className="text-terracotta" />
						</div>
						<h2 className="text-2xl font-bold mb-2">Speed Drill</h2>
						<p className="text-stone-600 mb-6">
							Rapid-fire production practice. Mix of pronouns, verbs, and
							articles. Type fast, build automaticity.
						</p>

						<div className="mb-6">
							<span className="text-sm text-stone-500 block mb-2">
								Questions per session
							</span>
							<div className="flex justify-center gap-2">
								{[10, 15, 20, 30].map((size) => (
									<Button
										key={size}
										variant={drillSize === size ? "primary" : "outline"}
										size="sm"
										onClick={() => setDrillSize(size)}
									>
										{size}
									</Button>
								))}
							</div>
						</div>

						<Button
							size="lg"
							onClick={() => {
								setSessionCount(1);
								startDbSession();
							}}
							className="gap-2"
						>
							<Zap size={20} />
							Start Training
						</Button>

						<div className="mt-6 text-xs text-stone-400 space-y-1">
							<p>
								<kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600">
									Space
								</kbd>{" "}
								to start each question
							</p>
							<p>
								<kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600">
									Enter
								</kbd>{" "}
								to submit answer
							</p>
							<p>Auto-advance on correct answers</p>
						</div>
					</div>
				</Card>

				<div className="mt-4 text-center">
					<Link
						to="/practice/pronouns"
						className="text-sm text-stone-500 hover:text-stone-700"
					>
						Or practice a specific category →
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-xl mx-auto">
			<UnifiedDrill
				title={`Speed Drill #${sessionCount}`}
				questions={questions}
				onAttempt={handleAttempt}
				onComplete={handleComplete}
			/>

			{lastStats && (
				<div className="mt-4 flex justify-center gap-3">
					<Button onClick={handleNewSession} className="gap-2">
						<RotateCcw size={16} />
						New Session
					</Button>
					<Link to="/practice/pronouns">
						<Button variant="outline" className="gap-2">
							<Settings size={16} />
							Practice Specific Category
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default SpeedDrill;
