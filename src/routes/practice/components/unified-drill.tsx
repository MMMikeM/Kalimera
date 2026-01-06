import type React from "react";
import { useReducer, useEffect, useRef, useCallback, useState } from "react";
import { CheckCircle, XCircle, ChevronRight, Keyboard } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CountdownTimer from "@/components/CountdownTimer";
import {
	matchPhonetic,
	greekToPhonetic,
} from "@/lib/greek-transliteration";
import DrillSummary from "./drill-summary";

export interface UnifiedQuestion {
	id: string;
	prompt: string; // English text: "I want coffee"
	correctGreek: string; // Greek answer: "Θέλω καφέ"
	timeLimit?: number; // ms (default 5000)
	hint?: string; // Shown after incorrect answer
}

export interface UnifiedAttemptResult {
	questionId: string;
	prompt: string;
	correctGreek: string;
	userAnswer: string; // phonetic
	isCorrect: boolean;
	timeTaken: number;
	timedOut: boolean;
}

type QuestionPhase = "ready" | "active" | "feedback";

interface UnifiedDrillState {
	questions: UnifiedQuestion[];
	currentIndex: number;
	userInput: string;
	phase: QuestionPhase;
	lastResult: {
		isCorrect: boolean;
		userAnswer: string;
		correctPhonetic: string;
		timeTaken: number;
		timedOut: boolean;
	} | null;
	score: { correct: number; total: number };
	totalResponseTime: number; // For avg calculation
	isComplete: boolean;
	attempts: UnifiedAttemptResult[]; // Track all attempts for summary
}

type UnifiedDrillAction =
	| { type: "SET_INPUT"; value: string }
	| { type: "START_QUESTION" }
	| {
			type: "SUBMIT_ANSWER";
			attempt: UnifiedAttemptResult;
			correctPhonetic: string;
	  }
	| { type: "NEXT_QUESTION" }
	| { type: "RESTART" };

const initialUnifiedState = (
	questions: UnifiedQuestion[],
): UnifiedDrillState => {
	return {
		questions,
		currentIndex: 0,
		userInput: "",
		phase: "ready",
		lastResult: null,
		score: { correct: 0, total: 0 },
		totalResponseTime: 0,
		isComplete: false,
		attempts: [],
	};
};

const unifiedReducer = (
	state: UnifiedDrillState,
	action: UnifiedDrillAction,
): UnifiedDrillState => {
	switch (action.type) {
		case "SET_INPUT":
			if (state.phase !== "active") return state;
			return { ...state, userInput: action.value };

		case "START_QUESTION":
			return { ...state, phase: "active" };

		case "SUBMIT_ANSWER": {
			const { attempt, correctPhonetic } = action;

			return {
				...state,
				phase: "feedback",
				lastResult: {
					isCorrect: attempt.isCorrect,
					userAnswer: attempt.userAnswer,
					correctPhonetic,
					timeTaken: attempt.timeTaken,
					timedOut: attempt.timedOut,
				},
				score: {
					correct: state.score.correct + (attempt.isCorrect ? 1 : 0),
					total: state.score.total + 1,
				},
				totalResponseTime: state.totalResponseTime + attempt.timeTaken,
				attempts: [...state.attempts, attempt],
			};
		}

		case "NEXT_QUESTION": {
			const nextIndex = state.currentIndex + 1;
			if (nextIndex >= state.questions.length) {
				return { ...state, isComplete: true };
			}

			return {
				...state,
				currentIndex: nextIndex,
				userInput: "",
				phase: "ready",
				lastResult: null,
			};
		}

		case "RESTART":
			return initialUnifiedState(state.questions);

		default:
			return state;
	}
};

const DEFAULT_TIME_LIMIT = 5000; // 5 seconds
const AUTO_ADVANCE_DELAY = 1500; // 1.5 seconds

export interface SessionStats {
	correct: number;
	total: number;
	avgResponseTime: number;
	attempts: UnifiedAttemptResult[];
}

interface UnifiedDrillProps {
	title: string;
	questions: UnifiedQuestion[];
	onAttempt?: (result: UnifiedAttemptResult) => void;
	onComplete?: (stats: SessionStats) => void;
}

const UnifiedDrill: React.FC<UnifiedDrillProps> = ({
	title,
	questions,
	onAttempt,
	onComplete,
}) => {
	const [state, dispatch] = useReducer(
		unifiedReducer,
		questions,
		(questions) => initialUnifiedState(questions),
	);

	const questionStartTimeRef = useRef<number>(Date.now());
	const inputRef = useRef<HTMLInputElement>(null);
	const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
	const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);

	// Focus input when question becomes active
	useEffect(() => {
		if (state.phase === "active") {
			questionStartTimeRef.current = Date.now();
			inputRef.current?.focus();
		}
	}, [state.phase]);

	// Auto-advance on correct answer
	useEffect(() => {
		if (state.phase === "feedback" && state.lastResult?.isCorrect) {
			setIsAutoAdvancing(true);
			autoAdvanceTimerRef.current = setTimeout(() => {
				dispatch({ type: "NEXT_QUESTION" });
				setIsAutoAdvancing(false);
			}, AUTO_ADVANCE_DELAY);
		}

		return () => {
			if (autoAdvanceTimerRef.current) {
				clearTimeout(autoAdvanceTimerRef.current);
			}
		};
	}, [state.phase, state.lastResult?.isCorrect]);

	// Call onComplete when drill is done
	useEffect(() => {
		if (state.isComplete && onComplete) {
			const avgResponseTime =
				state.score.total > 0
					? Math.round(state.totalResponseTime / state.score.total)
					: 0;
			onComplete({
				correct: state.score.correct,
				total: state.score.total,
				avgResponseTime,
				attempts: state.attempts,
			});
		}
	}, [state.isComplete, state.score, state.totalResponseTime, state.attempts, onComplete]);

	// Keyboard handler for advancing
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Space or Enter to advance when in feedback mode (and not auto-advancing)
			if (
				state.phase === "feedback" &&
				!state.lastResult?.isCorrect &&
				(e.key === " " || e.key === "Enter")
			) {
				e.preventDefault();
				dispatch({ type: "NEXT_QUESTION" });
			}
			// Space to start when in ready mode
			if (state.phase === "ready" && e.key === " ") {
				e.preventDefault();
				dispatch({ type: "START_QUESTION" });
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [state.phase, state.lastResult?.isCorrect]);

	const currentQuestion = state.questions[state.currentIndex];

	const handleStart = () => {
		dispatch({ type: "START_QUESTION" });
	};

	const handleProductionSubmit = useCallback(
		(timedOut = false) => {
			if (!currentQuestion || state.phase !== "active") return;

			const timeTaken = Date.now() - questionStartTimeRef.current;
			const result = matchPhonetic(
				state.userInput,
				currentQuestion.correctGreek,
			);

			const attempt: UnifiedAttemptResult = {
				questionId: currentQuestion.id,
				prompt: currentQuestion.prompt,
				correctGreek: currentQuestion.correctGreek,
				userAnswer: result.userPhonetic,
				isCorrect: result.isCorrect && !timedOut,
				timeTaken,
				timedOut,
			};

			dispatch({
				type: "SUBMIT_ANSWER",
				attempt,
				correctPhonetic: result.correctPhonetic,
			});

			onAttempt?.(attempt);
		},
		[currentQuestion, state.phase, state.userInput, onAttempt],
	);

	const handleTimeout = useCallback(() => {
		handleProductionSubmit(true);
	}, [handleProductionSubmit]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && state.phase === "active") {
			e.preventDefault();
			handleProductionSubmit(false);
		}
	};

	// Guard: if no questions
	if (!currentQuestion) {
		return (
			<Card variant="bordered" padding="lg" className="bg-stone-50">
				<p className="text-center text-stone-600">No questions available</p>
			</Card>
		);
	}

	const timeLimit = currentQuestion.timeLimit ?? DEFAULT_TIME_LIMIT;
	const progressPercent =
		((state.currentIndex + (state.phase === "feedback" ? 1 : 0)) /
			state.questions.length) *
		100;
	const avgResponseTime =
		state.score.total > 0
			? (state.totalResponseTime / state.score.total / 1000).toFixed(1)
			: "0.0";

	if (state.isComplete) {
		const avgResponseTime =
			state.score.total > 0
				? Math.round(state.totalResponseTime / state.score.total)
				: 0;

		return (
			<DrillSummary
				stats={{
					correct: state.score.correct,
					total: state.score.total,
					avgResponseTime,
					attempts: state.attempts,
				}}
				onRestart={() => dispatch({ type: "RESTART" })}
			/>
		);
	}

	return (
		<Card variant="bordered" padding="lg" className="bg-stone-50">
			{/* Compact Header */}
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-2">
						<Keyboard size={18} className="text-stone-500" />
						<span className="text-sm font-medium text-stone-700">{title}</span>
					</div>
					<div className="flex items-center gap-4 text-sm text-stone-500">
						<span>
							{state.currentIndex + 1} / {state.questions.length}
						</span>
						<span>{avgResponseTime}s avg</span>
					</div>
				</div>
				<Progress value={progressPercent} className="h-1.5" />
			</div>

			{/* Timer */}
			{state.phase === "active" && (
				<div className="mb-4">
					<CountdownTimer
						durationMs={timeLimit}
						isRunning={true}
						onTimeout={handleTimeout}
					/>
				</div>
			)}

			{/* Question Area */}
			<div className="bg-white rounded-lg p-6 mb-4 border">
				<div className="text-center mb-6">
					<p className="text-sm text-stone-500 mb-2">Translate to Greek:</p>
					<p
						className={`text-2xl font-semibold text-stone-800 transition-all duration-200 ${
							state.phase === "ready" ? "blur-md select-none" : ""
						}`}
					>
						"{currentQuestion.prompt}"
					</p>
				</div>

				{/* Ready state - show Start button */}
				{state.phase === "ready" && (
					<div className="text-center py-4">
						<Button onClick={handleStart} size="lg" className="gap-2">
							Start
						</Button>
						<p className="text-xs text-stone-400 mt-3">
							Press Space or click to start • Timer will begin
						</p>
					</div>
				)}

				{/* Active state - Text Input */}
				{state.phase === "active" && (
					<div className="space-y-3">
						<Input
							ref={inputRef}
							type="text"
							value={state.userInput}
							onChange={(e) =>
								dispatch({ type: "SET_INPUT", value: e.target.value })
							}
							onKeyDown={handleKeyDown}
							placeholder="Type phonetically (e.g., thelo kafe)"
							className="text-lg text-center py-6"
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck={false}
						/>
						<p className="text-xs text-stone-400 text-center">
							Type using Latin letters • Press Enter to submit
						</p>
					</div>
				)}


				{/* Feedback state - Result */}
				{state.phase === "feedback" && (
					<div className="space-y-4">
						{/* Result indicator */}
						<div
							className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
								state.lastResult?.isCorrect
									? "bg-correct-100 text-correct"
									: "bg-incorrect-100 text-incorrect"
							}`}
						>
							{state.lastResult?.isCorrect ? (
								<CheckCircle size={24} />
							) : (
								<XCircle size={24} />
							)}
							<span className="font-bold text-lg">
								{state.lastResult?.timedOut
									? "Time's up!"
									: state.lastResult?.isCorrect
										? "Correct!"
										: "Not quite"}
							</span>
							{!state.lastResult?.timedOut && state.lastResult && (
								<span className="text-sm opacity-75">
									({(state.lastResult.timeTaken / 1000).toFixed(1)}s)
								</span>
							)}
						</div>

						{/* Show correct Greek prominently */}
						<div className="text-center py-4 bg-stone-50 rounded-lg">
							<MonoText size="lg" className="text-3xl block mb-2">
								{currentQuestion.correctGreek}
							</MonoText>
							<p className="text-stone-500 font-mono">
								/{greekToPhonetic(currentQuestion.correctGreek)}/
							</p>
						</div>

						{/* Show what user typed if incorrect */}
						{state.lastResult &&
							!state.lastResult.isCorrect &&
							state.lastResult.userAnswer && (
								<p className="text-sm text-stone-500 text-center">
									You typed:{" "}
									<span className="font-mono">
										{state.lastResult.userAnswer || "(nothing)"}
									</span>
								</p>
							)}

						{/* Hint on incorrect */}
						{state.lastResult &&
							!state.lastResult.isCorrect &&
							currentQuestion.hint && (
								<p className="text-sm text-stone-500 text-center italic">
									<span className="font-medium not-italic">Remember:</span>{" "}
									{currentQuestion.hint}
								</p>
							)}

						{/* Auto-advance indicator or manual next */}
						{state.lastResult?.isCorrect && isAutoAdvancing ? (
							<p className="text-xs text-stone-400 text-center animate-pulse">
								Next question...
							</p>
						) : null}
					</div>
				)}
			</div>

			{/* Actions */}
			<div className="flex justify-between items-center">
				{state.phase === "active" && (
					<Button
						onClick={() => {
							handleProductionSubmit(false);
						}}
					>
						Check Answer
					</Button>
				)}

				{state.phase === "feedback" && !state.lastResult?.isCorrect && (
					<Button
						onClick={() => dispatch({ type: "NEXT_QUESTION" })}
						className="gap-2"
					>
						{state.currentIndex < state.questions.length - 1 ? (
							<>
								Next <ChevronRight size={16} />
							</>
						) : (
							"See Results"
						)}
					</Button>
				)}
			</div>
		</Card>
	);
};

export default UnifiedDrill;
