import type React from "react";
import { useReducer, useEffect, useRef, useCallback, useState } from "react";
import {
	CheckCircle,
	XCircle,
	RotateCcw,
	ChevronRight,
	Keyboard,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, MonoText } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CountdownTimer from "@/components/CountdownTimer";
import {
	matchPhonetic,
	greekToPhonetic,
} from "@/lib/greek-transliteration";

// Unified question type supporting both production and MC modes
export interface UnifiedQuestion {
	id: string;
	prompt: string; // English text: "I want coffee"
	correctGreek: string; // Greek answer: "Θέλω καφέ"
	options?: string[]; // MC options (Greek) - only used in MC fallback mode
	timeLimit?: number; // ms (default 5000)
	hint?: string; // Shown after incorrect answer
}

export interface UnifiedAttemptResult {
	questionId: string;
	prompt: string;
	correctGreek: string;
	userAnswer: string; // phonetic for production, Greek for MC
	isCorrect: boolean;
	timeTaken: number;
	timedOut: boolean;
	mode: "production" | "mc";
}

type QuestionPhase = "ready" | "active" | "feedback";
type DrillMode = "production" | "mc";

interface UnifiedDrillState {
	questions: UnifiedQuestion[];
	currentIndex: number;
	userInput: string;
	selectedMcIndex: number | null;
	phase: QuestionPhase;
	mode: DrillMode;
	consecutiveFailures: number; // Track failures for MC fallback
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
	| { type: "SELECT_MC"; index: number }
	| { type: "START_QUESTION" }
	| {
			type: "SUBMIT_ANSWER";
			attempt: UnifiedAttemptResult;
			correctPhonetic: string;
	  }
	| { type: "NEXT_QUESTION" }
	| { type: "RESTART" }
	| { type: "SWITCH_TO_MC" };

const MC_FAILURE_THRESHOLD = 3; // Switch to MC after 3 consecutive failures

const initialUnifiedState = (
	questions: UnifiedQuestion[],
	startInMcMode = false,
): UnifiedDrillState => {
	// Only start in MC mode if first question has options
	const firstQuestion = questions[0];
	const canUseMc = firstQuestion?.options && firstQuestion.options.length > 0;

	return {
		questions,
		currentIndex: 0,
		userInput: "",
		selectedMcIndex: null,
		phase: "ready",
		mode: startInMcMode && canUseMc ? "mc" : "production",
		consecutiveFailures: 0,
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

		case "SELECT_MC":
			if (state.phase !== "active" || state.mode !== "mc") return state;
			return { ...state, selectedMcIndex: action.index };

		case "START_QUESTION":
			return { ...state, phase: "active" };

		case "SUBMIT_ANSWER": {
			const { attempt, correctPhonetic } = action;
			const newConsecutiveFailures = attempt.isCorrect
				? 0
				: state.consecutiveFailures + 1;

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
				consecutiveFailures: newConsecutiveFailures,
				attempts: [...state.attempts, attempt],
			};
		}

		case "NEXT_QUESTION": {
			const nextIndex = state.currentIndex + 1;
			if (nextIndex >= state.questions.length) {
				return { ...state, isComplete: true };
			}

			// Check if we should switch to MC mode due to consecutive failures
			// Only switch if the next question actually has MC options
			const nextQuestion = state.questions[nextIndex];
			const shouldSwitchToMc =
				state.mode === "production" &&
				state.consecutiveFailures >= MC_FAILURE_THRESHOLD &&
				nextQuestion?.options &&
				nextQuestion.options.length > 0;

			return {
				...state,
				currentIndex: nextIndex,
				userInput: "",
				selectedMcIndex: null,
				phase: "ready",
				lastResult: null,
				mode: shouldSwitchToMc ? "mc" : "production", // Reset to production if no MC options
			};
		}

		case "SWITCH_TO_MC":
			return { ...state, mode: "mc", consecutiveFailures: 0 };

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
	startInMcMode?: boolean;
	onAttempt?: (result: UnifiedAttemptResult) => void;
	onComplete?: (stats: SessionStats) => void;
}

const UnifiedDrill: React.FC<UnifiedDrillProps> = ({
	title,
	questions,
	startInMcMode = false,
	onAttempt,
	onComplete,
}) => {
	const [state, dispatch] = useReducer(
		unifiedReducer,
		{ questions, startInMcMode },
		({ questions, startInMcMode }) =>
			initialUnifiedState(questions, startInMcMode),
	);

	const questionStartTimeRef = useRef<number>(Date.now());
	const inputRef = useRef<HTMLInputElement>(null);
	const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
	const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);

	// Focus input when question becomes active in production mode
	useEffect(() => {
		if (state.phase === "active" && state.mode === "production") {
			questionStartTimeRef.current = Date.now();
			inputRef.current?.focus();
		} else if (state.phase === "active" && state.mode === "mc") {
			questionStartTimeRef.current = Date.now();
		}
	}, [state.phase, state.mode]);

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
				mode: "production",
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

	const handleMcSubmit = useCallback(() => {
		if (
			!currentQuestion ||
			state.phase !== "active" ||
			state.selectedMcIndex === null
		)
			return;

		const timeTaken = Date.now() - questionStartTimeRef.current;
		const selectedOption = currentQuestion.options?.[state.selectedMcIndex];
		const isCorrect = selectedOption === currentQuestion.correctGreek;

		const attempt: UnifiedAttemptResult = {
			questionId: currentQuestion.id,
			prompt: currentQuestion.prompt,
			correctGreek: currentQuestion.correctGreek,
			userAnswer: selectedOption ?? "",
			isCorrect,
			timeTaken,
			timedOut: false,
			mode: "mc",
		};

		dispatch({
			type: "SUBMIT_ANSWER",
			attempt,
			correctPhonetic: greekToPhonetic(currentQuestion.correctGreek),
		});

		onAttempt?.(attempt);
	}, [currentQuestion, state.phase, state.selectedMcIndex, onAttempt]);

	const handleTimeout = useCallback(() => {
		if (state.mode === "production") {
			handleProductionSubmit(true);
		}
	}, [state.mode, handleProductionSubmit]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && state.phase === "active") {
			e.preventDefault();
			if (state.mode === "production") {
				handleProductionSubmit(false);
			} else if (state.selectedMcIndex !== null) {
				handleMcSubmit();
			}
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

	// Session complete screen with enhanced summary
	if (state.isComplete) {
		const percentage = Math.round(
			(state.score.correct / state.score.total) * 100,
		);
		const finalAvgTime = (
			state.totalResponseTime /
			state.score.total /
			1000
		).toFixed(1);

		// Get missed items (incorrect attempts)
		const missedAttempts = state.attempts.filter((a) => !a.isCorrect);

		// Group by question to find items missed multiple times
		const missedByQuestion = missedAttempts.reduce(
			(acc, attempt) => {
				const key = attempt.questionId;
				if (!acc[key]) {
					acc[key] = {
						prompt: attempt.prompt,
						correctGreek: attempt.correctGreek,
						count: 0,
					};
				}
				acc[key].count++;
				return acc;
			},
			{} as Record<
				string,
				{ prompt: string; correctGreek: string; count: number }
			>,
		);

		const sortedMissed = Object.values(missedByQuestion).sort(
			(a, b) => b.count - a.count,
		);

		return (
			<Card variant="bordered" padding="lg" className="bg-stone-50">
				<div className="py-6">
					{/* Score Header */}
					<div className="text-center mb-6">
						<h3 className="text-2xl font-bold mb-2">
							{state.score.correct} / {state.score.total} correct
						</h3>

						<div className="flex justify-center gap-6 text-sm text-stone-600">
							<div>
								<span className="font-semibold">{percentage}%</span> accuracy
							</div>
							<div>
								<span className="font-semibold">{finalAvgTime}s</span> avg
							</div>
						</div>
					</div>

					{/* Missed Items Section */}
					{sortedMissed.length > 0 && (
						<div className="mb-6">
							<h4 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
								<XCircle size={16} className="text-incorrect" />
								Items to Review ({sortedMissed.length})
							</h4>
							<div className="space-y-2 max-h-48 overflow-y-auto">
								{sortedMissed.slice(0, 5).map((item) => (
									<div
										key={item.correctGreek}
										className="flex items-center justify-between bg-white p-3 rounded-lg border text-sm"
									>
										<div className="flex-1 min-w-0">
											<p className="text-stone-600 truncate">{item.prompt}</p>
											<div className="flex items-center gap-2">
												<MonoText className="text-stone-900 font-medium">
													{item.correctGreek}
												</MonoText>
												<span className="text-xs text-stone-400 font-mono">
													/{greekToPhonetic(item.correctGreek)}/
												</span>
											</div>
										</div>
										{item.count > 1 && (
											<span className="text-xs bg-incorrect-100 text-incorrect px-2 py-0.5 rounded-full ml-2">
												{item.count}x
											</span>
										)}
									</div>
								))}
								{sortedMissed.length > 5 && (
									<p className="text-xs text-stone-400 text-center py-1">
										+{sortedMissed.length - 5} more items
									</p>
								)}
							</div>
							<p className="text-xs text-stone-500 mt-3 text-center italic">
								These items will appear more often in future sessions
							</p>
						</div>
					)}

					{/* All Correct Message */}
					{sortedMissed.length === 0 && (
						<div className="text-center mb-6 py-4 bg-correct-100 rounded-lg">
							<CheckCircle size={32} className="text-correct mx-auto mb-2" />
							<p className="text-correct font-medium">Perfect session!</p>
						</div>
					)}

					{/* Restart Button */}
					<div className="text-center">
						<Button
							onClick={() => dispatch({ type: "RESTART" })}
							className="gap-2"
						>
							<RotateCcw size={16} />
							Practice Again
						</Button>
					</div>
				</div>
			</Card>
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

			{/* Timer - only show when active in production mode */}
			{state.phase === "active" && state.mode === "production" && (
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

				{/* Active state - Production Input */}
				{state.phase === "active" && state.mode === "production" && (
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

				{/* Active state - Multiple Choice */}
				{state.phase === "active" &&
					state.mode === "mc" &&
					currentQuestion.options && (
						<div className="space-y-3">
							<RadioGroup
								value={state.selectedMcIndex?.toString() ?? ""}
								onValueChange={(value) =>
									dispatch({ type: "SELECT_MC", index: parseInt(value, 10) })
								}
								className="space-y-3"
							>
								{currentQuestion.options.map((option, index) => {
									const optionId = `option-${currentQuestion.id}-${index}`;
									const isSelected = state.selectedMcIndex === index;

									return (
										<label
											key={optionId}
											htmlFor={optionId}
											className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
												isSelected
													? "border-terracotta bg-terracotta-100"
													: "border-stone-200 bg-stone-50 hover:bg-stone-100"
											}`}
										>
											<RadioGroupItem value={index.toString()} id={optionId} />
											<MonoText size="lg" className="flex-1">
												{option}
											</MonoText>
										</label>
									);
								})}
							</RadioGroup>
							<p className="text-xs text-stone-400 text-center">
								Select an option • Press Enter to submit
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

						{/* Show what user typed/selected if incorrect */}
						{state.lastResult &&
							!state.lastResult.isCorrect &&
							state.lastResult.userAnswer && (
								<p className="text-sm text-stone-500 text-center">
									You {state.mode === "production" ? "typed" : "selected"}:{" "}
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
				{/* MC mode indicator */}
				{state.mode === "mc" && state.phase !== "feedback" && (
					<p className="text-xs text-stone-400">
						Multiple choice mode (struggling items)
					</p>
				)}
				{state.mode === "production" && state.phase !== "feedback" && (
					<div />
				)}

				{state.phase === "active" && (
					<Button
						onClick={() => {
							if (state.mode === "production") {
								handleProductionSubmit(false);
							} else {
								handleMcSubmit();
							}
						}}
						disabled={
							state.mode === "mc" && state.selectedMcIndex === null
						}
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
