import { Clock, RotateCcw, Zap } from "lucide-react";
import type React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFetcher, useOutletContext, useSearchParams } from "react-router";
import { Card } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	CATEGORY_CONFIG,
	generateQuestions,
	type QuestionCategory,
	GRAMMAR_EXERCISE_CONFIG,
	generateGrammarQuestions,
	type GrammarExerciseType,
} from "@/lib/drill/generate-questions";
import UnifiedDrill, {
	type SessionStats,
	type UnifiedAttemptResult,
	type UnifiedQuestion,
} from "./components/unified-drill";
import type { PracticeLoaderData } from "./layout";

export type FocusType = QuestionCategory | "all";
export type DrillMode = "category" | "grammar";

const FOCUS_OPTIONS: { value: FocusType; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "pronouns", label: "Pronouns" },
	{ value: "articles", label: "Articles" },
	{ value: "verbs", label: "Verbs" },
	{ value: "nouns", label: "Nouns" },
];

const GRAMMAR_EXERCISES = Object.entries(GRAMMAR_EXERCISE_CONFIG) as [
	GrammarExerciseType,
	(typeof GRAMMAR_EXERCISE_CONFIG)[GrammarExerciseType],
][];

const formatTimeLimit = (ms: number): string => {
	const seconds = ms / 1000;
	return seconds % 1 === 0 ? `${seconds}s` : `${seconds.toFixed(1)}s`;
};

const SpeedDrill: React.FC = () => {
	const { userId, stats } = useOutletContext<PracticeLoaderData>();
	const fetcher = useFetcher();
	const sessionIdRef = useRef<number | null>(null);

	const [drillMode, setDrillMode] = useState<DrillMode>("category");
	const [focus, setFocus] = useState<FocusType>("all");
	const [grammarExercise, setGrammarExercise] = useState<GrammarExerciseType | null>(null);

	const [sessionCount, setSessionCount] = useState(0);
	const [lastStats, setLastStats] = useState<SessionStats | null>(null);
	const [searchParams] = useSearchParams();
	const initialDrillSize = searchParams.get("size") === "quick" ? 10 : 15;
	const [drillSize, setDrillSize] = useState(initialDrillSize);
	const [reDrillQuestions, setReDrillQuestions] = useState<UnifiedQuestion[] | null>(null);
	const isReDrillRef = useRef(false);

	const questions = useMemo(() => {
		if (reDrillQuestions) return reDrillQuestions;
		if (drillMode === "grammar" && grammarExercise) {
			const allQuestions = generateGrammarQuestions(grammarExercise);
			const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
			return shuffled.slice(0, drillSize);
		}
		return generateQuestions(focus === "all" ? "all" : [focus], drillSize);
	}, [reDrillQuestions, drillMode, grammarExercise, focus, drillSize]);

	const startDbSession = useCallback(() => {
		if (!userId) return;

		const category =
			drillMode === "grammar" && grammarExercise ? `grammar_${grammarExercise}` : "speed_drill";

		fetcher.submit(
			{
				intent: "startSession",
				userId: userId.toString(),
				sessionType: "case_drill",
				category,
			},
			{ method: "post", action: "/practice" },
		);
	}, [userId, fetcher, drillMode, grammarExercise]);

	const handleAttempt = useCallback(
		(attempt: UnifiedAttemptResult) => {
			if (!userId || isReDrillRef.current) return;

			let weakAreaType: "case" | "gender" | "verb_family" | undefined;
			let weakAreaIdentifier: string | undefined;

			if (attempt.questionId.startsWith("grammar-")) {
				if (attempt.questionId.includes("-art-") || attempt.questionId.includes("-fill-")) {
					weakAreaType = "case";
					weakAreaIdentifier = "articles";
				} else if (attempt.questionId.includes("-case-")) {
					weakAreaType = "case";
					weakAreaIdentifier = "case_transformation";
				} else if (attempt.questionId.includes("-verb-")) {
					weakAreaType = "verb_family";
					weakAreaIdentifier = "verb_conjugation";
				} else if (attempt.questionId.includes("-fix-")) {
					weakAreaType = "case";
					weakAreaIdentifier = "error_correction";
				}
			} else if (attempt.questionId.includes("obj-") || attempt.questionId.includes("poss-")) {
				weakAreaType = "case";
				weakAreaIdentifier = attempt.questionId.includes("obj-")
					? "object_pronouns"
					: "possessive_pronouns";
			} else if (attempt.questionId.includes("verb-")) {
				weakAreaType = "verb_family";
				weakAreaIdentifier = attempt.questionId.split("-")[2];
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

	const handleComplete = useCallback(
		(stats: SessionStats) => {
			setLastStats(stats);

			if (!userId || !sessionIdRef.current || isReDrillRef.current) return;

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

	const handleDrillMistakes = useCallback((missedQuestions: UnifiedQuestion[]) => {
		isReDrillRef.current = true;
		setReDrillQuestions(missedQuestions);
		setSessionCount((c) => c + 1);
		setLastStats(null);
		sessionIdRef.current = null;
	}, []);

	const handleNewSession = () => {
		setReDrillQuestions(null);
		isReDrillRef.current = false;
		setSessionCount((c) => c + 1);
		setLastStats(null);
		sessionIdRef.current = null;
	};

	if (fetcher.data?.success && fetcher.data?.session?.id && !sessionIdRef.current) {
		sessionIdRef.current = fetcher.data.session.id;
	}

	const focusConfig = focus !== "all" ? CATEGORY_CONFIG[focus] : null;
	const grammarConfig = grammarExercise ? GRAMMAR_EXERCISE_CONFIG[grammarExercise] : null;

	const drillTitle = (() => {
		if (drillMode === "grammar" && grammarConfig) {
			return grammarConfig.label;
		}
		return focus !== "all" ? `${focusConfig?.label} Drill` : "Speed Drill";
	})();

	const canStart = drillMode === "category" || (drillMode === "grammar" && grammarExercise);

	if (sessionCount === 0 && !lastStats) {
		return (
			<div className="mx-auto max-w-xl">
				<Card variant="bordered" padding="lg" className="text-center">
					<div className="py-8">
						<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-100">
							<Zap size={32} className="text-terracotta" />
						</div>
						<h2 className="mb-2 text-2xl font-bold">{drillTitle}</h2>
						<p className="mb-6 text-stone-600">
							Rapid-fire production practice. Type fast, build automaticity.
						</p>

						{/* Mode Toggle */}
						<div className="mb-6">
							<span className="mb-2 block text-sm text-stone-500">Mode</span>
							<div className="flex justify-center gap-2">
								<Button
									variant={drillMode === "category" ? "primary" : "outline"}
									size="sm"
									onClick={() => {
										setDrillMode("category");
										setGrammarExercise(null);
									}}
								>
									Vocab
								</Button>
								<Button
									variant={drillMode === "grammar" ? "primary" : "outline"}
									size="sm"
									onClick={() => setDrillMode("grammar")}
								>
									Grammar
								</Button>
							</div>
						</div>

						{/* Category Selection */}
						{drillMode === "category" && (
							<div className="mb-6">
								<span className="mb-2 block text-sm text-stone-500">Focus</span>
								<div className="flex flex-wrap justify-center gap-2">
									{FOCUS_OPTIONS.map((option) => (
										<Button
											key={option.value}
											variant={focus === option.value ? "primary" : "outline"}
											size="sm"
											onClick={() => setFocus(option.value)}
										>
											{option.label}
										</Button>
									))}
								</div>
							</div>
						)}

						{/* Grammar Exercise Selection */}
						{drillMode === "grammar" && (
							<div className="mb-6 text-left">
								<span className="mb-3 block text-center text-sm text-stone-500">Exercise Type</span>
								<div className="space-y-2">
									{GRAMMAR_EXERCISES.map(([type, config]) => (
										<button
											key={type}
											type="button"
											onClick={() => setGrammarExercise(type)}
											className={`w-full rounded-lg border-2 p-4 text-left transition-colors ${
												grammarExercise === type
													? "border-terracotta bg-terracotta-50"
													: "border-stone-200 bg-white hover:border-stone-300"
											}`}
										>
											<div className="mb-2 flex items-center justify-between">
												<span className="font-semibold text-stone-800">{config.label}</span>
												<Badge variant="outline" className="gap-1">
													<Clock size={12} />
													{formatTimeLimit(config.timeLimit)}
												</Badge>
											</div>
											<p className="mb-1 font-mono text-base text-terracotta-700">
												{config.greekExample}
											</p>
											<p className="text-sm text-stone-500">{config.description}</p>
										</button>
									))}
								</div>
							</div>
						)}

						<div className="mb-6">
							<span className="mb-2 block text-sm text-stone-500">Questions</span>
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
							disabled={!canStart}
						>
							<Zap size={20} />
							Start Training
						</Button>

						<div className="mt-6 space-y-1 text-xs text-stone-400">
							<p>
								<kbd className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-600">Space</kbd> to
								start each question
							</p>
							<p>
								<kbd className="rounded bg-stone-100 px-1.5 py-0.5 text-stone-600">Enter</kbd> to
								submit answer
							</p>
							<p>Auto-advance on correct answers</p>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	const sessionTitle = (() => {
		if (drillMode === "grammar" && grammarConfig) {
			return `${grammarConfig.label} #${sessionCount}`;
		}
		return focus !== "all"
			? `${focusConfig?.label} #${sessionCount}`
			: `Speed Drill #${sessionCount}`;
	})();

	return (
		<div className="mx-auto max-w-xl">
			<UnifiedDrill
				key={sessionCount}
				title={sessionTitle}
				questions={questions}
				onAttempt={handleAttempt}
				onComplete={handleComplete}
				userId={userId}
				sessionCount={sessionCount}
				streakDays={stats?.streak}
				onDrillMistakes={handleDrillMistakes}
			/>

			{lastStats && (
				<div className="mt-4 flex justify-center">
					<Button onClick={handleNewSession} className="gap-2">
						<RotateCcw size={16} />
						New Session
					</Button>
				</div>
			)}
		</div>
	);
};

export default SpeedDrill;
