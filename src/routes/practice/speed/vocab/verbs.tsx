import { RotateCcw, Zap } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFetcher, useOutletContext, useSearchParams } from "react-router";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
	generateQuestions,
	CATEGORY_CONFIG,
} from "@/lib/drill/generate-questions";
import UnifiedDrill, {
	type SessionStats,
	type UnifiedAttemptResult,
	type UnifiedQuestion,
} from "../../components/unified-drill";
import type { PracticeLoaderData } from "../../layout";

export default function VerbsDrill() {
	const { userId, stats } = useOutletContext<PracticeLoaderData>();
	const fetcher = useFetcher();
	const sessionIdRef = useRef<number | null>(null);

	const [sessionCount, setSessionCount] = useState(0);
	const [lastStats, setLastStats] = useState<SessionStats | null>(null);
	const [searchParams] = useSearchParams();
	const initialDrillSize = searchParams.get("size") === "quick" ? 10 : 15;
	const [drillSize, setDrillSize] = useState(initialDrillSize);
	const [reDrillQuestions, setReDrillQuestions] = useState<UnifiedQuestion[] | null>(null);
	const isReDrillRef = useRef(false);

	const questions = useMemo(() => {
		if (reDrillQuestions) return reDrillQuestions;
		return generateQuestions(["verbs"], drillSize);
	}, [reDrillQuestions, drillSize]);

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

	const handleAttempt = useCallback(
		(attempt: UnifiedAttemptResult) => {
			if (!userId || isReDrillRef.current) return;

			let weakAreaIdentifier: string | undefined;
			if (attempt.questionId.includes("verb-")) {
				weakAreaIdentifier = attempt.questionId.split("-")[2];
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
					weakAreaType: "verb_family",
					...(weakAreaIdentifier && { weakAreaIdentifier }),
				},
				{ method: "post", action: "/practice" },
			);
		},
		[userId, fetcher],
	);

	const handleComplete = useCallback(
		(statsData: SessionStats) => {
			setLastStats(statsData);

			if (!userId || !sessionIdRef.current || isReDrillRef.current) return;

			fetcher.submit(
				{
					intent: "completeSession",
					sessionId: sessionIdRef.current.toString(),
					totalQuestions: statsData.total.toString(),
					correctAnswers: statsData.correct.toString(),
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

	const categoryConfig = CATEGORY_CONFIG.verbs;

	if (sessionCount === 0 && !lastStats) {
		return (
			<div className="mx-auto max-w-xl">
				<Card variant="bordered" padding="lg">
					<div className="mb-8">
						<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-terracotta-100">
							<Zap size={32} className="text-terracotta" />
						</div>
						<h2 className="mb-2 font-serif text-xl font-semibold text-navy-text">
							{categoryConfig.label} Drill
						</h2>
						<p className="text-sm text-muted-foreground">
							Rapid-fire production practice. Type fast, build automaticity.
						</p>
					</div>

					<fieldset className="mb-8">
						<legend className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
							Questions
						</legend>
						<div className="flex gap-2">
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
					</fieldset>

					<Button
						size="lg"
						onClick={() => {
							setSessionCount(1);
							startDbSession();
						}}
						className="w-full"
					>
						Start Training
					</Button>

					<div className="mt-6 space-y-1 text-xs text-muted-foreground">
						<p>
							<kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-muted-foreground">
								Space
							</kbd>{" "}
							to start each question
						</p>
						<p>
							<kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-muted-foreground">
								Enter
							</kbd>{" "}
							to submit answer
						</p>
						<p>Auto-advance on correct answers</p>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-xl">
			<UnifiedDrill
				key={sessionCount}
				title={`${categoryConfig.label} Drill #${sessionCount}`}
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
}
