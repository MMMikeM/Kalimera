import type React from "react";
import { useReducer, useMemo, useEffect, useRef, useState } from "react";
import {
	CheckCircle,
	XCircle,
	RotateCcw,
	ChevronRight,
	Keyboard,
	Play,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, MonoText } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CountdownTimer from "@/components/CountdownTimer";
import {
	matchPhonetic,
	greekToPhonetic,
} from "@/lib/greek-transliteration";
import { shuffleArray } from "../types";

export interface ProductionQuestion {
	id: string;
	prompt: string; // English: "I want coffee"
	correctGreek: string; // Greek: "Θέλω καφέ"
	timeLimit?: number; // ms (default 5000)
}

export interface ProductionAttemptResult {
	questionId: string;
	prompt: string;
	correctGreek: string;
	correctPhonetic: string;
	userPhonetic: string;
	isCorrect: boolean;
	timeTaken: number;
	timedOut: boolean;
}

type QuestionPhase = "ready" | "active" | "feedback";

interface ProductionDrillState {
	questions: ProductionQuestion[];
	currentIndex: number;
	userInput: string;
	phase: QuestionPhase;
	lastResult: {
		isCorrect: boolean;
		userPhonetic: string;
		correctPhonetic: string;
		timeTaken: number;
		timedOut: boolean;
	} | null;
	score: { correct: number; total: number };
	isComplete: boolean;
}

type ProductionDrillAction =
	| { type: "SET_INPUT"; value: string }
	| { type: "START_QUESTION" }
	| {
			type: "SUBMIT_ANSWER";
			timeTaken: number;
			isCorrect: boolean;
			userPhonetic: string;
			correctPhonetic: string;
			timedOut: boolean;
	  }
	| { type: "NEXT_QUESTION" }
	| { type: "RESTART" };

const initialProductionState = (
	questions: ProductionQuestion[],
): ProductionDrillState => ({
	questions,
	currentIndex: 0,
	userInput: "",
	phase: "ready",
	lastResult: null,
	score: { correct: 0, total: 0 },
	isComplete: false,
});

const productionReducer = (
	state: ProductionDrillState,
	action: ProductionDrillAction,
): ProductionDrillState => {
	switch (action.type) {
		case "SET_INPUT":
			if (state.phase !== "active") return state;
			return { ...state, userInput: action.value };

		case "START_QUESTION":
			return { ...state, phase: "active" };

		case "SUBMIT_ANSWER":
			return {
				...state,
				phase: "feedback",
				lastResult: {
					isCorrect: action.isCorrect,
					userPhonetic: action.userPhonetic,
					correctPhonetic: action.correctPhonetic,
					timeTaken: action.timeTaken,
					timedOut: action.timedOut,
				},
				score: {
					correct: state.score.correct + (action.isCorrect ? 1 : 0),
					total: state.score.total + 1,
				},
			};

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
			return initialProductionState(state.questions);

		default:
			return state;
	}
};

const DEFAULT_TIME_LIMIT = 5000; // 5 seconds
const DEFAULT_SESSION_SIZE = 10;

interface ProductionDrillCardProps {
	title: string;
	description: string;
	questions: ProductionQuestion[];
	maxQuestionsPerSession?: number;
	onAttempt?: (result: ProductionAttemptResult) => void;
	onComplete?: (score: { correct: number; total: number }) => void;
}

const ProductionDrillCard: React.FC<ProductionDrillCardProps> = ({
	title,
	description,
	questions,
	maxQuestionsPerSession = DEFAULT_SESSION_SIZE,
	onAttempt,
	onComplete,
}) => {
	const shuffledQuestions = useMemo(() => shuffleArray(questions), [questions]);

	// Session management
	const [currentSession, setCurrentSession] = useState(0);
	const totalSessions = Math.ceil(
		shuffledQuestions.length / maxQuestionsPerSession,
	);
	const sessionStart = currentSession * maxQuestionsPerSession;
	const sessionEnd = Math.min(
		sessionStart + maxQuestionsPerSession,
		shuffledQuestions.length,
	);
	const sessionQuestions = useMemo(
		() => shuffledQuestions.slice(sessionStart, sessionEnd),
		[shuffledQuestions, sessionStart, sessionEnd],
	);

	const [state, dispatch] = useReducer(
		productionReducer,
		sessionQuestions,
		initialProductionState,
	);

	const questionStartTimeRef = useRef<number>(Date.now());
	const inputRef = useRef<HTMLInputElement>(null);

	// Focus input when question becomes active
	useEffect(() => {
		if (state.phase === "active") {
			questionStartTimeRef.current = Date.now();
			inputRef.current?.focus();
		}
	}, [state.phase, state.currentIndex]);

	// Call onComplete when all sessions are done
	useEffect(() => {
		if (
			state.isComplete &&
			onComplete &&
			currentSession === totalSessions - 1
		) {
			onComplete(state.score);
		}
	}, [
		state.isComplete,
		state.score,
		onComplete,
		currentSession,
		totalSessions,
	]);

	const currentQuestion = state.questions[state.currentIndex];

	const handleStart = () => {
		dispatch({ type: "START_QUESTION" });
	};

	const handleSubmit = (timedOut = false) => {
		if (!currentQuestion || state.phase !== "active") return;

		const timeTaken = Date.now() - questionStartTimeRef.current;
		const result = matchPhonetic(state.userInput, currentQuestion.correctGreek);

		dispatch({
			type: "SUBMIT_ANSWER",
			timeTaken,
			isCorrect: result.isCorrect && !timedOut,
			userPhonetic: result.userPhonetic,
			correctPhonetic: result.correctPhonetic,
			timedOut,
		});

		if (onAttempt) {
			onAttempt({
				questionId: currentQuestion.id,
				prompt: currentQuestion.prompt,
				correctGreek: currentQuestion.correctGreek,
				correctPhonetic: result.correctPhonetic,
				userPhonetic: result.userPhonetic,
				isCorrect: result.isCorrect && !timedOut,
				timeTaken,
				timedOut,
			});
		}
	};

	const handleTimeout = () => {
		handleSubmit(true);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && state.phase === "active") {
			e.preventDefault();
			handleSubmit(false);
		}
	};

	// Guard: if no questions
	if (!currentQuestion) {
		return (
			<Card variant="bordered" padding="lg" className="bg-terracotta-50">
				<p className="text-center text-stone-600">No questions available</p>
			</Card>
		);
	}

	const timeLimit = currentQuestion.timeLimit ?? DEFAULT_TIME_LIMIT;
	const progressPercent = (state.currentIndex / state.questions.length) * 100;
	const hasMoreSessions = currentSession < totalSessions - 1;

	// Session complete screen
	if (state.isComplete) {
		const percentage = Math.round(
			(state.score.correct / state.score.total) * 100,
		);

		return (
			<Card
				variant="bordered"
				padding="lg"
				className="bg-terracotta-50 border-l-4 border-l-terracotta"
			>
				<div className="text-center py-8">
					<div className="text-6xl mb-4">
						{percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "💪"}
					</div>

					{totalSessions > 1 && (
						<p className="text-sm text-stone-500 mb-2">
							Session {currentSession + 1} of {totalSessions} complete
						</p>
					)}

					<h3 className="text-2xl font-bold mb-2">
						{state.score.correct} / {state.score.total} correct
					</h3>
					<p className="text-stone-600 mb-6">
						{percentage >= 80
							? "Excellent work!"
							: percentage >= 60
								? "Good progress, keep practicing!"
								: "Keep going, you'll get there!"}
					</p>

					<div className="flex gap-3 justify-center">
						{hasMoreSessions ? (
							<>
								<Button
									variant="outline"
									onClick={() => setCurrentSession(0)}
									className="gap-2"
								>
									<RotateCcw size={16} />
									Start Over
								</Button>
								<Button
									onClick={() => setCurrentSession((prev) => prev + 1)}
									className="gap-2"
								>
									Continue
									<ChevronRight size={16} />
								</Button>
							</>
						) : (
							<Button
								onClick={() => setCurrentSession(0)}
								className="gap-2"
							>
								<RotateCcw size={16} />
								Practice Again
							</Button>
						)}
					</div>

					{hasMoreSessions && (
						<p className="text-xs text-stone-400 mt-4">
							{shuffledQuestions.length - sessionEnd} questions remaining
						</p>
					)}
				</div>
			</Card>
		);
	}

	return (
		<Card
			variant="bordered"
			padding="lg"
			className="bg-terracotta-50 border-l-4 border-l-terracotta"
		>
			{/* Header */}
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-terracotta-200">
							<Keyboard size={20} className="text-terracotta" />
						</div>
						<div>
							<h3 className="text-lg font-bold">{title}</h3>
							{totalSessions > 1 && (
								<span className="text-xs text-stone-500">
									Session {currentSession + 1} of {totalSessions}
								</span>
							)}
						</div>
					</div>
					<span className="text-sm text-stone-600">
						{state.currentIndex + 1} / {state.questions.length}
					</span>
				</div>
				<Progress
					value={progressPercent}
					className="h-2"
					indicatorClassName="bg-terracotta"
				/>
				<p className="text-sm text-stone-600 mt-2">{description}</p>
			</div>

			{/* Timer - only show when active */}
			{state.phase === "active" && (
				<div className="mb-4">
					<CountdownTimer
						durationMs={timeLimit}
						isRunning={true}
						onTimeout={handleTimeout}
					/>
				</div>
			)}

			{/* Question */}
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
							<Play size={20} />
							Start
						</Button>
						<p className="text-xs text-stone-400 mt-3">
							Press Start when you're ready • Timer will begin
						</p>
					</div>
				)}

				{/* Active state - Input */}
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

						{/* Show what user typed if different */}
						{state.lastResult &&
							!state.lastResult.isCorrect &&
							state.lastResult.userPhonetic && (
								<p className="text-sm text-stone-500 text-center">
									You typed:{" "}
									<span className="font-mono">
										{state.lastResult.userPhonetic || "(nothing)"}
									</span>
								</p>
							)}
					</div>
				)}
			</div>

			{/* Actions */}
			<div className="flex justify-end">
				{state.phase === "active" && (
					<Button onClick={() => handleSubmit(false)}>Check Answer</Button>
				)}
				{state.phase === "feedback" && (
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

export default ProductionDrillCard;
