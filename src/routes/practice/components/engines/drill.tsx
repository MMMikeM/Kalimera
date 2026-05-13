import { getRouteApi } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { matchPhonetic } from "@/lib/greek-transliteration";

import { type DrillForm, type SessionSize } from "./deck";
import { useCountdown, useForwardKeyboard } from "./drill-hooks";
import { DrillProvider, useDrillContext, useDrillStore } from "./drill-provider";
import { type SpeedOption, type SessionStats } from "./drill-store";
import { type DimensionSpec, MultiSelectReverse } from "./reverse/multi-select";
import { SelfAssessReverse } from "./reverse/self-assess";
import { SingleSelectReverse } from "./reverse/single-select";
import { ConfigShell, DrillShell, FeedbackDisplay, ForwardInput, SummaryScreen } from "./shells";

const rootRoute = getRouteApi("__root__");

// ─── Theme ─────────────────────────────────────────────────────────────────────

const THEME = {
	honey: { bar: "bg-honey", selectorBg: "bg-honey-100", selectorText: "text-honey-text" },
	terracotta: {
		bar: "bg-terracotta",
		selectorBg: "bg-terracotta-100",
		selectorText: "text-terracotta-text",
	},
	olive: { bar: "bg-olive", selectorBg: "bg-olive-100", selectorText: "text-olive-text" },
	ocean: { bar: "bg-ocean", selectorBg: "bg-ocean-100", selectorText: "text-ocean-text" },
} as const;

type ColorTheme = keyof typeof THEME;

// ─── Reverse strategy ─────────────────────────────────────────────────────────

interface SelfAssessStrategy {
	kind: "self-assess";
}

interface SingleSelectStrategy {
	kind: "single-select";
	options: Array<{ id: string; label: string; selectorBg: string; selectorText: string }>;
	getCorrectId: (form: Record<string, unknown>) => string;
}

interface MultiSelectStrategy<K extends string> {
	kind: "multi-select";
	dimensions: DimensionSpec<K>[];
}

export type { DimensionSpec };

type ReverseStrategy<K extends string = string> =
	| SelfAssessStrategy
	| SingleSelectStrategy
	| MultiSelectStrategy<K>;

// ─── Props ─────────────────────────────────────────────────────────────────────

export interface DrillProps<K extends string = string> {
	drillId: string;
	items: DrillForm[];
	title: string;
	subtitle: string;
	colorTheme?: ColorTheme;
	forwardLabel?: string;
	forwardDesc?: string;
	reverseLabel?: string;
	reverseDesc?: string;
	referenceHref?: string;
	referenceLabel?: string;
	backTo?: string;
	categories?: Array<{ id: string; label: string }>;
	reverse?: ReverseStrategy<K>;
	forwardPrompt?: (form: DrillForm) => React.ReactNode;
	configExtras?: React.ReactNode;
	autoStart?: boolean;
	defaultSessionSize?: SessionSize;
	speeds?: ReadonlyArray<SpeedOption>;
	sessionType?: string;
	onComplete?: (stats: SessionStats<DrillForm>) => void;
}

// ─── Inner drill (reads from store) ───────────────────────────────────────────

function DrillInner<K extends string>({
	title,
	subtitle,
	colorTheme = "terracotta",
	forwardLabel,
	forwardDesc = "English meaning → Greek form",
	reverseLabel,
	reverseDesc = "Greek form → recall meaning",
	referenceHref,
	referenceLabel,
	backTo,
	categories,
	reverse = { kind: "self-assess" },
	forwardPrompt,
	configExtras,
	autoStart,
}: Omit<
	DrillProps<K>,
	"drillId" | "items" | "defaultSessionSize" | "speeds" | "sessionType" | "onComplete"
>) {
	const store = useDrillContext();
	const theme = THEME[colorTheme];

	const phase = useDrillStore((s) => s.phase);
	const mode = useDrillStore((s) => s.mode);
	const cardIndex = useDrillStore((s) => s.cardIndex);
	const deck = useDrillStore((s) => s.deck);
	const lastAttempt = useDrillStore((s) => s.lastAttempt);
	const advance = useDrillStore((s) => s.advance);
	const startDrill = useDrillStore((s) => s.startDrill);

	const currentForm = deck[cardIndex];
	const inputRef = useRef<HTMLInputElement | null>(null);

	// Focus input on card activation
	useEffect(() => {
		if (phase === "active" && mode === "forward") inputRef.current?.focus();
	}, [phase, cardIndex, mode]);

	// Auto-start
	useEffect(() => {
		if (autoStart && deck.length === 0 && store.getState().allItems.length > 0) startDrill();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Auto-advance 1200ms after correct answer
	useEffect(() => {
		if (phase !== "feedback" || !lastAttempt?.isCorrect) return;
		const t = setTimeout(advance, 1200);
		return () => clearTimeout(t);
	}, [phase, lastAttempt, advance]);

	// Enter/Space to advance on wrong answer
	useEffect(() => {
		if (phase !== "feedback" || lastAttempt?.isCorrect) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				advance();
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [phase, lastAttempt, advance]);

	// Timing ref for forward submit
	const activeStartedAt = useRef(0);
	useEffect(() => {
		if (phase === "active") activeStartedAt.current = performance.now();
	}, [phase, cardIndex]);

	const handleForwardSubmit = () => {
		const { deck, cardIndex, input, recordAttempt } = store.getState();
		const form = deck[cardIndex];
		if (!form || store.getState().phase !== "active") return;
		const timeTaken = performance.now() - activeStartedAt.current;
		const primary = matchPhonetic(input.trim(), form.greek).isCorrect;
		const alternate =
			!primary && form.acceptAlso ? matchPhonetic(input.trim(), form.acceptAlso).isCorrect : false;
		recordAttempt(primary || alternate, timeTaken, {
			prompt: form.label,
			correctAnswer: form.greek,
			userAnswer: input.trim(),
			weakAreaIdentifier: form.weakAreaIdentifier ?? form.id,
		});
	};

	const handleTimeout = () => {
		const { deck, cardIndex, mode, recordAttempt, getEffectiveTimeLimit } = store.getState();
		const form = deck[cardIndex];
		if (!form || store.getState().phase !== "active") return;
		const logData =
			mode === "forward"
				? { prompt: form.label, correctAnswer: form.greek, userAnswer: "" }
				: { prompt: form.greek, correctAnswer: form.label, userAnswer: "" };
		recordAttempt(
			false,
			getEffectiveTimeLimit(),
			{
				...logData,
				weakAreaIdentifier: form.weakAreaIdentifier ?? form.id,
			},
			true,
		);
	};

	useForwardKeyboard({ phase, mode, onSubmit: handleForwardSubmit });

	const effectiveTimeLimit = store.getState().getEffectiveTimeLimit();
	const { progress } = useCountdown(effectiveTimeLimit, phase === "active", handleTimeout);

	const barColor =
		phase === "feedback" ? (lastAttempt?.isCorrect ? "bg-correct" : "bg-incorrect") : theme.bar;

	// ── Config ────────────────────────────────────────────────────────────────

	if (phase === "config") {
		return (
			<ConfigShell
				title={title}
				subtitle={subtitle}
				forwardLabel={forwardLabel}
				forwardDesc={forwardDesc}
				reverseLabel={reverseLabel}
				reverseDesc={reverseDesc}
				referenceHref={referenceHref}
				referenceLabel={referenceLabel}
				backTo={backTo}
				categories={categories}
				selectorBg={theme.selectorBg}
				selectorText={theme.selectorText}
			>
				{configExtras}
			</ConfigShell>
		);
	}

	// ── Complete ──────────────────────────────────────────────────────────────

	if (phase === "complete") {
		return <SummaryScreen />;
	}

	// ── Active / Feedback ─────────────────────────────────────────────────────

	return (
		<DrillShell progress={progress} barColor={barColor} backTo={backTo}>
			{mode === "forward" ? (
				<>
					<div>
						{forwardPrompt && currentForm ? (
							forwardPrompt(currentForm)
						) : (
							<>
								<p className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
									{title}
								</p>
								{currentForm && (
									<>
										{"context" in currentForm && (
											<p
												lang="el"
												className="greek-text mb-4 text-3xl font-semibold text-stone-800"
											>
												{(currentForm as DrillForm & { context?: string }).context}
											</p>
										)}
										<p className="text-3xl font-medium text-foreground">{currentForm.label}</p>
										{"detail" in currentForm && (
											<p className="mt-1 text-xl text-stone-600">
												{(currentForm as DrillForm & { detail?: string }).detail}
											</p>
										)}
									</>
								)}
							</>
						)}
					</div>
					<ForwardInput inputRef={inputRef} onSubmit={handleForwardSubmit} />
					<FeedbackDisplay />
				</>
			) : (
				<>
					{reverse.kind === "self-assess" && <SelfAssessReverse />}
					{reverse.kind === "single-select" && (
						<SingleSelectReverse options={reverse.options} getCorrectId={reverse.getCorrectId} />
					)}
					{reverse.kind === "multi-select" && (
						<MultiSelectReverse dimensions={reverse.dimensions} />
					)}
				</>
			)}
		</DrillShell>
	);
}

// ─── Public <Drill> ────────────────────────────────────────────────────────────

export function Drill<K extends string = string>(props: DrillProps<K>) {
	const { auth } = rootRoute.useRouteContext();

	return (
		<DrillProvider
			config={{
				drillId: props.drillId,
				items: props.items,
				speeds: props.speeds,
				sessionType: props.sessionType,
				userId: auth?.userId ?? 0,
				defaultSessionSize: props.defaultSessionSize,
				onComplete: props.onComplete,
			}}
		>
			<DrillInner {...props} />
		</DrillProvider>
	);
}
