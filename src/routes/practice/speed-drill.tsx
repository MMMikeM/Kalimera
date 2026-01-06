import type React from "react";
import { useMemo, useState, useRef, useCallback } from "react";
import { Zap, RotateCcw, Filter, X } from "lucide-react";
import { Link, useOutletContext, useFetcher, useSearchParams } from "react-router";
import UnifiedDrill, {
	type UnifiedAttemptResult,
	type SessionStats,
} from "./components/unified-drill";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components";
import {
	generateQuestions,
	CATEGORY_CONFIG,
	type QuestionCategory,
} from "@/lib/drill/generate-questions";
import type { PracticeLoaderData } from "./layout";

export type FocusType = QuestionCategory;

const isValidFocus = (value: string | null): value is FocusType =>
	value !== null && value in CATEGORY_CONFIG;

const SpeedDrill: React.FC = () => {
	const { userId } = useOutletContext<PracticeLoaderData>();
	const [searchParams] = useSearchParams();
	const fetcher = useFetcher();
	const sessionIdRef = useRef<number | null>(null);

	const focusParam = searchParams.get("focus");
	const focus = isValidFocus(focusParam) ? focusParam : null;

	const [sessionCount, setSessionCount] = useState(0);
	const [lastStats, setLastStats] = useState<SessionStats | null>(null);
	const [drillSize, setDrillSize] = useState(15);

	const questions = useMemo(
		() => generateQuestions(focus ? [focus] : "all", drillSize),
		[drillSize, focus]
	);

	const startDbSession = useCallback(() => {
		if (!userId) return;

		fetcher.submit(
			{
				intent: "startSession",
				userId: userId.toString(),
				sessionType: "case_drill",
				category: "speed_drill",
			},
			{ method: "post", action: "/practice" }
		);
	}, [userId, fetcher]);

	const handleAttempt = useCallback(
		(attempt: UnifiedAttemptResult) => {
			if (!userId) return;

			let weakAreaType: "case" | "gender" | "verb_family" | undefined;
			let weakAreaIdentifier: string | undefined;

			if (
				attempt.questionId.includes("obj-") ||
				attempt.questionId.includes("poss-")
			) {
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
				{ method: "post", action: "/practice" }
			);
		},
		[userId, fetcher]
	);

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
				{ method: "post", action: "/practice" }
			);
		},
		[userId, fetcher]
	);

	const handleNewSession = () => {
		setSessionCount((c) => c + 1);
		setLastStats(null);
		sessionIdRef.current = null;
	};

	if (
		fetcher.data?.success &&
		fetcher.data?.session?.id &&
		!sessionIdRef.current
	) {
		sessionIdRef.current = fetcher.data.session.id;
	}

	const buildUrl = (path: string, newFocus?: FocusType | null) => {
		const userIdParam = searchParams.get("userId");
		const params = new URLSearchParams();
		if (userIdParam) params.set("userId", userIdParam);
		if (newFocus) params.set("focus", newFocus);
		const query = params.toString();
		return query ? `${path}?${query}` : path;
	};

	const focusConfig = focus ? CATEGORY_CONFIG[focus] : null;
	const drillTitle = focus ? `${focusConfig?.label} Drill` : "Speed Drill";
	const drillDescription = focus
		? focusConfig?.description
		: "Rapid-fire production practice. Mix of pronouns, verbs, articles, and nouns.";

	if (sessionCount === 0 && !lastStats) {
		return (
			<div className="max-w-xl mx-auto">
				<Card variant="bordered" padding="lg" className="text-center">
					<div className="py-8">
						<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta-100 mb-4">
							<Zap size={32} className="text-terracotta" />
						</div>
						<h2 className="text-2xl font-bold mb-2">{drillTitle}</h2>
						{focus && (
							<Link
								to={buildUrl("/practice/speed")}
								className="inline-flex items-center gap-1 mb-3"
							>
								<Badge color="ocean" className="gap-1">
									<Filter size={12} />
									{focusConfig?.label}
									<X size={12} />
								</Badge>
							</Link>
						)}
						<p className="text-stone-600 mb-6">
							{drillDescription} Type fast, build automaticity.
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

				{!focus && (
					<div className="mt-4 text-center">
						<span className="text-sm text-stone-500">Focus on: </span>
						{(Object.keys(CATEGORY_CONFIG) as FocusType[]).map((f, i) => (
							<span key={f}>
								{i > 0 && <span className="text-stone-400"> | </span>}
								<Link
									to={buildUrl("/practice/speed", f)}
									className="text-sm text-ocean hover:text-ocean-700"
								>
									{CATEGORY_CONFIG[f].label}
								</Link>
							</span>
						))}
					</div>
				)}
			</div>
		);
	}

	return (
		<div className="max-w-xl mx-auto">
			<UnifiedDrill
				title={
					focus
						? `${focusConfig?.label} #${sessionCount}`
						: `Speed Drill #${sessionCount}`
				}
				questions={questions}
				onAttempt={handleAttempt}
				onComplete={handleComplete}
			/>

			{lastStats && (
				<div className="mt-4 flex flex-col items-center gap-3">
					<div className="flex gap-3">
						<Button onClick={handleNewSession} className="gap-2">
							<RotateCcw size={16} />
							New Session
						</Button>
						{focus && (
							<Link to={buildUrl("/practice/speed")}>
								<Button variant="outline" className="gap-2">
									<X size={16} />
									Clear Focus
								</Button>
							</Link>
						)}
					</div>
					{!focus && (
						<div className="text-sm text-stone-500">
							Focus on:{" "}
							{(Object.keys(CATEGORY_CONFIG) as FocusType[]).map((f, i) => (
								<span key={f}>
									{i > 0 && " | "}
									<Link
										to={buildUrl("/practice/speed", f)}
										className="text-ocean hover:text-ocean-700"
									>
										{CATEGORY_CONFIG[f].label}
									</Link>
								</span>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SpeedDrill;
