import type React from "react";
import { useReducer, useMemo, useEffect, useRef, useState } from "react";
import {
	CheckCircle,
	XCircle,
	RotateCcw,
	ChevronRight,
	Users,
	FileText,
	Zap,
	BookOpen,
	Clock,
	ChevronDown,
	type LucideIcon,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Card, MonoText, ParadigmHint } from "../../../components";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	type Question,
	initialDrillState,
	drillReducer,
	shuffleArray,
} from "../types";

export type DrillVariant =
	| "pronouns"
	| "articles"
	| "verbs"
	| "vocabulary"
	| "review";

interface VariantConfig {
	icon: LucideIcon;
	borderColor: string;
	bgGradient: string;
	iconBg: string;
	iconColor: string;
	accentColor: string;
	progressColor: string;
}

const VARIANT_CONFIG: Record<DrillVariant, VariantConfig> = {
	pronouns: {
		icon: Users,
		borderColor: "border-l-4 border-l-ocean border-ocean-300",
		bgGradient: "bg-ocean-50",
		iconBg: "bg-ocean-200",
		iconColor: "text-ocean",
		accentColor: "ocean",
		progressColor: "bg-ocean",
	},
	articles: {
		icon: FileText,
		borderColor: "border-l-4 border-l-olive border-olive-300",
		bgGradient: "bg-olive-50",
		iconBg: "bg-olive-200",
		iconColor: "text-olive",
		accentColor: "olive",
		progressColor: "bg-olive",
	},
	verbs: {
		icon: Zap,
		borderColor: "border-l-4 border-l-honey border-honey-300",
		bgGradient: "bg-honey-50",
		iconBg: "bg-honey-200",
		iconColor: "text-honey",
		accentColor: "honey",
		progressColor: "bg-honey",
	},
	vocabulary: {
		icon: BookOpen,
		borderColor: "border-l-4 border-l-ocean border-ocean-300",
		bgGradient: "bg-ocean-50",
		iconBg: "bg-ocean-200",
		iconColor: "text-ocean",
		accentColor: "ocean",
		progressColor: "bg-ocean",
	},
	review: {
		icon: Clock,
		borderColor: "border-l-4 border-l-terracotta border-terracotta-300",
		bgGradient: "bg-red-500",
		iconBg: "bg-terracotta-200",
		iconColor: "text-terracotta",
		accentColor: "terracotta",
		progressColor: "bg-terracotta",
	},
};

export interface AttemptResult {
	questionId: string;
	questionText: string;
	correctAnswer: string;
	userAnswer: string;
	isCorrect: boolean;
	timeTaken: number; // milliseconds
}

const DEFAULT_SESSION_SIZE = 15;

interface DrillCardProps {
	title: string;
	description: string;
	questions: Question[];
	variant: DrillVariant;
	maxQuestionsPerSession?: number;
	onAttempt?: (result: AttemptResult) => void;
	onComplete?: (score: { correct: number; total: number }) => void;
}

const DrillCard: React.FC<DrillCardProps> = ({
	title,
	description,
	questions,
	variant,
	maxQuestionsPerSession = DEFAULT_SESSION_SIZE,
	onAttempt,
	onComplete,
}) => {
	const config = VARIANT_CONFIG[variant];
	const IconComponent = config.icon;
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
		drillReducer,
		sessionQuestions,
		initialDrillState,
	);
	const [showParadigm, setShowParadigm] = useState(false);
	const questionStartTimeRef = useRef<number>(Date.now());

	// Track if we need to reset state when session changes
	useEffect(() => {
		dispatch({ type: "RESTART" });
	}, []);

	// Reset timer when question changes
	useEffect(() => {
		if (!state.showFeedback) {
			questionStartTimeRef.current = Date.now();
		}
	}, [state.showFeedback]);

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

	// Guard: if no questions, show empty state
	if (!currentQuestion) {
		return (
			<Card variant="bordered" padding="lg" className={config.bgGradient}>
				<p className="text-center text-stone-600">No questions available</p>
			</Card>
		);
	}

	const progressPercent = (state.currentIndex / state.questions.length) * 100;
	const isCorrect = state.selectedAnswer === currentQuestion.correctIndex;
	const hasMoreSessions = currentSession < totalSessions - 1;

	// Session complete screen (with continue/stop options)
	if (state.isComplete) {
		const percentage = Math.round(
			(state.score.correct / state.score.total) * 100,
		);

		return (
			<Card
				variant="bordered"
				padding="lg"
				className={`${config.bgGradient} ${config.borderColor}`}
			>
				<div className="text-center py-8">
					<div className="text-6xl mb-4">
						{percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "💪"}
					</div>

					{/* Session indicator */}
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
									onClick={() => {
										setCurrentSession(0);
									}}
									className="gap-2"
								>
									<RotateCcw size={16} />
									Start Over
								</Button>
								<Button
									onClick={() => {
										setCurrentSession((prev) => prev + 1);
									}}
									className="gap-2"
								>
									Continue
									<ChevronRight size={16} />
								</Button>
							</>
						) : (
							<Button
								onClick={() => {
									setCurrentSession(0);
								}}
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
			className={`${config.bgGradient} ${config.borderColor}`}
		>
			{/* Header */}
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-3">
						<div className={`p-2 rounded-lg ${config.iconBg}`}>
							<IconComponent size={20} className={config.iconColor} />
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
					indicatorClassName={config.progressColor}
				/>
				<p className="text-sm text-stone-600 mt-2">{description}</p>
			</div>

			{/* Paradigm Reference (for grammar drills only) */}
			{(variant === "pronouns" ||
				variant === "articles" ||
				variant === "verbs") && (
				<Collapsible
					open={showParadigm}
					onOpenChange={setShowParadigm}
					className="mb-4"
				>
					<CollapsibleTrigger className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors">
						<ChevronDown
							size={14}
							className={`transition-transform ${showParadigm ? "rotate-180" : ""}`}
						/>
						{showParadigm ? "Hide" : "Show"} pattern reference
					</CollapsibleTrigger>
					<CollapsibleContent>
						<div className="mt-3 p-3 bg-white/50 rounded-lg border border-stone-200">
							<ParadigmHint type={variant} />
						</div>
					</CollapsibleContent>
				</Collapsible>
			)}

			{/* Question */}
			<div className="bg-white rounded-lg p-6 mb-4 border">
				<div className="text-center mb-6">
					{currentQuestion.badge && (
						<span
							className={`case-badge-${currentQuestion.badge.variant} inline-block mb-3`}
						>
							{currentQuestion.badge.label}
						</span>
					)}
					<MonoText
						variant="highlighted"
						size="lg"
						className="text-2xl block mb-2"
					>
						{currentQuestion.prompt}
					</MonoText>
					{currentQuestion.promptSubtext && (
						<p className="text-stone-600 text-sm">
							{currentQuestion.promptSubtext}
						</p>
					)}
				</div>

				{/* Options */}
				<RadioGroup
					value={state.selectedAnswer?.toString() ?? ""}
					onValueChange={(value) =>
						dispatch({ type: "SELECT_ANSWER", index: parseInt(value, 10) })
					}
					className="space-y-3"
					disabled={state.showFeedback}
				>
					{currentQuestion.options.map((option, index) => {
						const isSelected = state.selectedAnswer === index;
						const isCorrectOption = index === currentQuestion.correctIndex;
						const optionId = `option-${currentQuestion.id}-${index}`;

						let optionClass = "border-stone-200 bg-stone-50";
						if (state.showFeedback) {
							if (isCorrectOption) {
								optionClass = "border-correct bg-correct-100";
							} else if (isSelected && !isCorrectOption) {
								optionClass = "border-incorrect bg-incorrect-100";
							}
						} else if (isSelected) {
							optionClass = "border-terracotta bg-terracotta-100";
						}

						return (
							<label
								key={optionId}
								htmlFor={optionId}
								className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${optionClass}`}
							>
								<RadioGroupItem value={index.toString()} id={optionId} />
								<MonoText size="lg" className="flex-1">
									{option}
								</MonoText>
								{state.showFeedback && isCorrectOption && (
									<CheckCircle className="text-correct" size={20} />
								)}
								{state.showFeedback && isSelected && !isCorrectOption && (
									<XCircle className="text-incorrect" size={20} />
								)}
							</label>
						);
					})}
				</RadioGroup>
			</div>

			{/* Feedback */}
			{state.showFeedback && (
				<div
					className={`p-4 rounded-lg mb-4 ${
						isCorrect
							? "bg-correct-100 border border-correct-300"
							: "bg-incorrect-100 border border-incorrect-300"
					}`}
				>
					<div className="flex items-center gap-2 mb-1">
						{isCorrect ? (
							<CheckCircle className="text-correct" size={18} />
						) : (
							<XCircle className="text-incorrect" size={18} />
						)}
						<span
							className={`font-semibold ${isCorrect ? "text-correct" : "text-incorrect"}`}
						>
							{isCorrect ? "Correct!" : "Not quite"}
						</span>
					</div>
					<p className="text-sm text-stone-700">
						{currentQuestion.explanation}
					</p>
					{!isCorrect && currentQuestion.hint && (
						<p className="text-sm text-stone-500 mt-2 italic">
							<span className="font-medium not-italic">Remember:</span>{" "}
							{currentQuestion.hint}
						</p>
					)}
				</div>
			)}

			{/* Actions */}
			<div className="flex justify-end">
				{!state.showFeedback ? (
					<Button
						onClick={() => {
							const timeTaken = Date.now() - questionStartTimeRef.current;
							dispatch({ type: "CHECK_ANSWER" });

							// Report attempt if callback provided
							if (onAttempt && state.selectedAnswer !== null) {
								const selectedOption =
									currentQuestion.options[state.selectedAnswer] ?? "";
								const correctOption =
									currentQuestion.options[currentQuestion.correctIndex] ?? "";
								onAttempt({
									questionId: currentQuestion.id,
									questionText: currentQuestion.prompt,
									correctAnswer: correctOption,
									userAnswer: selectedOption,
									isCorrect:
										state.selectedAnswer === currentQuestion.correctIndex,
									timeTaken,
								});
							}
						}}
						disabled={state.selectedAnswer === null}
					>
						Check Answer
					</Button>
				) : (
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

export default DrillCard;
