import { getRouteApi } from "@tanstack/react-router";
import { RotateCcw, Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
	CATEGORY_CONFIG,
	type DrillQuestion,
	generateQuestions,
} from "@/lib/drill/generate-questions";
import { greekToPhonetic } from "@/lib/greek-transliteration";
import { shuffle } from "@/lib/shuffle";

import { SPEEDS, type SpeedId } from "../drill-speeds";
import type { LogAttemptInput } from "../hooks";
import type { Attempt } from "./drill-engine";
import { SimpleListDrill, type SimpleListItem } from "./simple-list-drill";
import { useDrillSession } from "./use-drill-session";

const practiceRoute = getRouteApi("/practice/_layout");

interface VocabDrillPageProps {
	category: keyof typeof CATEGORY_CONFIG;
	drillId: string;
	initialQuestions?: DrillQuestion[];
	wordTypeFilter?: string;
	weakAreaType?: string;
}

const toSimpleListItem = (q: DrillQuestion): SimpleListItem => ({
	id: q.id,
	greek: q.correctGreek,
	greeklish: greekToPhonetic(q.correctGreek),
	label: q.prompt,
	english: q.prompt,
	vocabularyId: q.vocabularyId,
	weakAreaIdentifier: q.weakAreaIdentifier,
});

export function VocabDrillPage({
	category,
	drillId,
	initialQuestions,
	wordTypeFilter,
	weakAreaType,
}: VocabDrillPageProps) {
	const { userId, stats } = practiceRoute.useLoaderData();
	const session = useDrillSession({
		userId,
		drillId,
		sessionType: "case_drill",
		category: "speed_drill",
		wordTypeFilter,
	});

	const [sessionCount, setSessionCount] = useState(0);
	const [lastStats, setLastStats] = useState<{ total: number; correct: number } | null>(null);
	const [drillSize, setDrillSize] = useState(15);
	const [activeSpeedId, setActiveSpeedId] = useState<SpeedId>(SPEEDS[1].id);
	const activeSpeed = SPEEDS.find((s) => s.id === activeSpeedId) ?? SPEEDS[1];
	const [reDrillItems, setReDrillItems] = useState<SimpleListItem[] | null>(null);

	const [shuffledInitial, setShuffledInitial] = useState<SimpleListItem[] | null>(null);
	useEffect(() => {
		if (!initialQuestions) {
			setShuffledInitial(null);
			return;
		}
		setShuffledInitial(shuffle(initialQuestions.map(toSimpleListItem)));
	}, [initialQuestions]);

	const baseItems = reDrillItems
		? reDrillItems
		: shuffledInitial
			? shuffledInitial.slice(0, drillSize)
			: generateQuestions([category], drillSize).map(toSimpleListItem);

	const wrappedLog = (input: LogAttemptInput) => {
		session.recordAttempt({ ...input, weakAreaType });
	};

	const handleComplete = ({ total, correct }: { total: number; correct: number }) => {
		setLastStats({ total, correct });
		session.completeSession({ totalQuestions: total, correctAnswers: correct });
	};

	const handleRetryMistakes = (mistakes: Attempt<SimpleListItem>[]) => {
		session.markReDrill();
		setReDrillItems(mistakes.map((m) => m.form));
		setSessionCount((c) => c + 1);
		setLastStats(null);
	};

	const handleNewSession = () => {
		setReDrillItems(null);
		session.resetSession();
		setSessionCount((c) => c + 1);
		setLastStats(null);
	};

	const categoryConfig = CATEGORY_CONFIG[category];

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

					<fieldset className="mb-8">
						<legend className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
							Speed
						</legend>
						<div className="flex gap-2">
							{SPEEDS.map((spd) => (
								<Button
									key={spd.id}
									variant={activeSpeedId === spd.id ? "primary" : "outline"}
									size="sm"
									onClick={() => setActiveSpeedId(spd.id)}
								>
									{spd.label}
								</Button>
							))}
						</div>
					</fieldset>

					<Button
						size="lg"
						onClick={() => {
							setSessionCount(1);
							session.startDbSession();
						}}
						className="w-full"
					>
						Start Training
					</Button>

					<div className="mt-6 space-y-1 text-xs text-muted-foreground">
						<p>
							<kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-muted-foreground">
								Enter
							</kbd>{" "}
							to submit answer
						</p>
						<p>
							<kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-muted-foreground">
								Enter
							</kbd>{" "}
							or tap to advance after a wrong answer
						</p>
						<p>Auto-advance on correct answers</p>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-xl">
			<SimpleListDrill
				key={sessionCount}
				items={baseItems}
				title={`${categoryConfig.label} Drill #${sessionCount}`}
				subtitle={`${stats?.streak ? `${stats.streak}-day streak` : "Rapid-fire production"}`}
				drillId={drillId}
				colorTheme="terracotta"
				speeds={[activeSpeed]}
				autoStart
				logAttemptFn={wrappedLog}
				onComplete={handleComplete}
				onRetryMistakes={handleRetryMistakes}
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
