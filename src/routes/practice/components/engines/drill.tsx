import { getRouteApi } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { matchPhonetic } from "@/lib/greek-transliteration";
import { startSessionFn, recordAttemptFn, completeSessionFn } from "@/server/fns";

import { type DrillForm, type SessionSize } from "./deck";
import { useCountdown, useForwardKeyboard } from "./drill-hooks";
import {
	type DrillSessionCallbacks,
	type DrillStoreConfig,
	type SessionStats,
	drillActions,
	useDrillStore,
} from "./drill-store";
import { type DimensionSpec, MultiSelectReverse } from "./reverse/multi-select";
import { SelfAssessReverse } from "./reverse/self-assess";
import { SingleSelectReverse } from "./reverse/single-select";
import {
	ConfigShell,
	DrillShell,
	FeedbackDisplay,
	ForwardInput,
	SummaryScreen,
	type ConfigShellProps,
} from "./shells";

const rootRoute = getRouteApi("__root__");

// ─── Session callbacks ──────────────────────────────────────────────────────────

const SESSION_CALLBACKS: DrillSessionCallbacks = {
	startSession: async () => {
		const json = await startSessionFn();
		return json?.session?.id ?? null;
	},
	// oxlint-disable-next-line no-unused-vars
	recordAttempt: ({ userId, ...params }) => {
		recordAttemptFn({
			data: {
				questionText: params.prompt,
				...params,
			},
		}).catch(() => {});
	},
	completeSession: (params) => {
		completeSessionFn({ data: params }).catch(() => {});
	},
};

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

export interface DrillProps<K extends string = string> extends Omit<
	ConfigShellProps,
	"selectorBg" | "selectorText" | "children"
> {
	drillId: string;
	items: DrillForm[];
	colorTheme?: ColorTheme;
	reverse?: ReverseStrategy<K>;
	forwardPrompt?: (form: DrillForm) => React.ReactNode;
	configExtras?: React.ReactNode;
	autoStart?: boolean;
	sessionSize?: SessionSize;
	onComplete?: (stats: SessionStats<DrillForm>) => void;
}

// ─── Inner drill (reads from store) ───────────────────────────────────────────

function DrillInner<K extends string>(
	props: Omit<DrillProps<K>, "drillId" | "items" | "sessionSize" | "onComplete">,
) {
	const {
		colorTheme = "terracotta",
		reverse = { kind: "self-assess" },
		forwardPrompt,
		configExtras,
		autoStart,
		...rest
	} = props;
	const theme = THEME[colorTheme];

	const phase = useDrillStore((s) => s.phase);
	const mode = useDrillStore((s) => s.mode);
	const cardIndex = useDrillStore((s) => s.cardIndex);
	const deck = useDrillStore((s) => s.deck);
	const lastAttempt = useDrillStore((s) => s.lastAttempt);
	const { advance, startDrill } = drillActions;

	const currentForm = deck[cardIndex];
	const inputRef = useRef<HTMLInputElement | null>(null);

	// Focus input on card activation
	useEffect(() => {
		if (phase === "active" && mode === "forward") inputRef.current?.focus();
	}, [phase, cardIndex, mode]);

	// Auto-start
	useEffect(() => {
		if (autoStart && deck.length === 0 && useDrillStore.getState().items.length > 0) startDrill();
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
		const { deck, cardIndex, input, phase } = useDrillStore.getState();
		const form = deck[cardIndex];
		if (!form || phase !== "active") return;
		const timeTaken = performance.now() - activeStartedAt.current;
		const primary = matchPhonetic(input.trim(), form.greek).isCorrect;
		const alternate =
			!primary && form.acceptAlso ? matchPhonetic(input.trim(), form.acceptAlso).isCorrect : false;
		drillActions.recordAttempt(primary || alternate, timeTaken, {
			prompt: form.label,
			correctAnswer: form.greek,
			userAnswer: input.trim(),
		});
	};

	const handleTimeout = () => {
		const { deck, cardIndex, mode, phase } = useDrillStore.getState();
		const form = deck[cardIndex];
		if (!form || phase !== "active") return;
		const logData =
			mode === "forward"
				? { prompt: form.label, correctAnswer: form.greek, userAnswer: "" }
				: { prompt: form.greek, correctAnswer: form.label, userAnswer: "" };
		drillActions.recordAttempt(false, drillActions.getEffectiveTimeLimit(), logData, true);
	};

	useForwardKeyboard({ phase, mode, onSubmit: handleForwardSubmit });

	const effectiveTimeLimit = drillActions.getEffectiveTimeLimit();
	const { progress } = useCountdown(effectiveTimeLimit, phase === "active", handleTimeout);

	const barColor =
		phase === "feedback" ? (lastAttempt?.isCorrect ? "bg-correct" : "bg-incorrect") : theme.bar;

	// ── Config ────────────────────────────────────────────────────────────────

	if (phase === "config") {
		return (
			<ConfigShell {...rest} selectorBg={theme.selectorBg} selectorText={theme.selectorText}>
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
		<DrillShell progress={progress} barColor={barColor} backTo={props.backTo}>
			{mode === "forward" ? (
				<>
					<div>
						{forwardPrompt && currentForm ? (
							forwardPrompt(currentForm)
						) : (
							<>
								<p className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
									{props.title}
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

	// Initialize store once per mount with this drill's config
	useState(() => {
		const config: DrillStoreConfig = {
			drillId: props.drillId,
			items: props.items,
			userId: auth?.userId ?? 0,
			sessionSize: props.sessionSize,
			onComplete: props.onComplete,
			sessionCallbacks: SESSION_CALLBACKS,
		};
		drillActions.initialize(config);
	});

	return <DrillInner {...props} />;
}
