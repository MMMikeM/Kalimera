import { getRouteApi } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { GreekText } from "@/components/GreekText";
import { ROLE_SCHEME, SCHEME } from "@/constants/grammar-palette";
import { matchPhonetic } from "@/lib/greek-transliteration";
import { DRILL_REGISTRY, drillTitle } from "@/routes/practice/drill-catalogue.data";
import { startSessionFn, recordAttemptFn, completeSessionFn } from "@/server/fns/srs";

import type { SpeedId } from "../drill-speeds";
import { type DrillForm, type DrillMode, type SessionSize } from "./deck";
import { useContinueKeyboard, useCountdown, useForwardKeyboard } from "./drill-hooks";
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

/** For drills that assert nothing grammatical: verb tense, question words, blocks. */
const BASE_THEME = {
	honey: { bar: "bg-honey", selectorBg: "bg-honey-100", selectorText: "text-honey-text" },
	terracotta: {
		bar: "bg-terracotta",
		selectorBg: "bg-terracotta-100",
		selectorText: "text-terracotta-text",
	},
	olive: { bar: "bg-olive", selectorBg: "bg-olive-100", selectorText: "text-olive-text" },
	ocean: { bar: "bg-ocean", selectorBg: "bg-ocean-100", selectorText: "text-ocean-text" },
} as const;

type ColorTheme = keyof typeof BASE_THEME;

/** A declared case role takes the reserved tokens; `mixed` and `null` claim nothing. */
const themeFor = (drillId: string, colorTheme: ColorTheme) => {
	const role = DRILL_REGISTRY[drillId]?.caseRole;
	const key = role && role !== "mixed" ? ROLE_SCHEME[role] : undefined;
	if (!key) return BASE_THEME[colorTheme];
	const scheme = SCHEME[key];
	return { bar: scheme.bar, selectorBg: scheme.bg, selectorText: scheme.text };
};

// ─── Reverse strategy ─────────────────────────────────────────────────────────

interface SelfAssessStrategy {
	kind: "self-assess";
}

interface SingleSelectStrategy {
	kind: "single-select";
	options: Array<{ id: string; label: string; selectorBg: string; selectorText: string }>;
	renderGreek?: (form: DrillForm) => React.ReactNode;
	getExplanation?: (form: DrillForm) => React.ReactNode;
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

type ShellProps = Omit<ConfigShellProps, "selectorBg" | "selectorText" | "children">;

export interface DrillProps<
	K extends string = string,
	T extends DrillForm = DrillForm,
> extends Omit<ShellProps, "title"> {
	drillId: string;
	/** Omit it — the name comes from the catalogue entry. Pass it only for a drill
	 *  with no entry, such as the anonymous /try drill. */
	title?: string;
	items: T[];
	colorTheme?: ColorTheme;
	defaultMode?: DrillMode;
	reverse?: ReverseStrategy<K>;
	forwardPrompt?: (form: T) => React.ReactNode;
	configExtras?: React.ReactNode;
	autoStart?: boolean;
	/** One of the picker's sizes, or the exact count for a fixed set such as /try. */
	sessionSize?: SessionSize | number;
	/** Preselects the speed; a drill that skips its config screen has no other way to set it. */
	speed?: SpeedId;
	onComplete?: (stats: SessionStats<DrillForm>) => void;
	summaryFooter?: React.ReactNode;
}

// ─── Inner drill (reads from store) ───────────────────────────────────────────

interface DrillInnerProps<K extends string, T extends DrillForm> extends Pick<
	DrillProps<K, T>,
	"reverse" | "forwardPrompt" | "configExtras" | "autoStart" | "summaryFooter"
> {
	/** Title and theme are already resolved by <Drill>, so the shells can rely on them. */
	shell: ShellProps;
	theme: { bar: string; selectorBg: string; selectorText: string };
}

function DrillInner<K extends string, T extends DrillForm>({
	shell,
	theme,
	reverse = { kind: "self-assess" },
	forwardPrompt,
	configExtras,
	autoStart,
	summaryFooter,
}: DrillInnerProps<K, T>) {
	const phase = useDrillStore((s) => s.phase);
	const mode = useDrillStore((s) => s.mode);
	const cardIndex = useDrillStore((s) => s.cardIndex);
	const deck = useDrillStore((s) => s.deck);
	const lastAttempt = useDrillStore((s) => s.attempts.at(-1));
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

	useContinueKeyboard({ enabled: phase === "feedback", inputRef, onContinue: advance });

	const handleForwardSubmit = () => {
		const { deck, cardIndex, input, phase } = useDrillStore.getState();
		const form = deck[cardIndex];
		// A stray Enter must not record a miss in the learner's history; the timer ends an unanswered card.
		if (!form || phase !== "active" || input.trim() === "") return;
		const primary = matchPhonetic(input.trim(), form.greek).isCorrect;
		const alternate =
			!primary && form.acceptAlso ? matchPhonetic(input.trim(), form.acceptAlso).isCorrect : false;
		drillActions.recordAttempt(primary || alternate, {
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
				: { prompt: form.reverseGreek ?? form.greek, correctAnswer: form.label, userAnswer: "" };
		drillActions.recordAttempt(false, logData, true);
	};

	useForwardKeyboard({ phase, mode, onSubmit: handleForwardSubmit });

	const effectiveTimeLimit = drillActions.getEffectiveTimeLimit();
	const { progress } = useCountdown(effectiveTimeLimit, phase === "active", handleTimeout);

	const barColor =
		phase === "feedback" ? (lastAttempt?.isCorrect ? "bg-correct" : "bg-incorrect") : theme.bar;

	// ── Config ────────────────────────────────────────────────────────────────

	if (phase === "config") {
		return (
			<ConfigShell {...shell} selectorBg={theme.selectorBg} selectorText={theme.selectorText}>
				{configExtras}
			</ConfigShell>
		);
	}

	// ── Complete ──────────────────────────────────────────────────────────────

	if (phase === "complete") {
		// A drill that skipped its config screen on the way in skips it on the way round again.
		return (
			<SummaryScreen
				backTo={shell.backTo}
				onRepeat={autoStart ? startDrill : drillActions.resetToConfig}
				footer={summaryFooter}
			/>
		);
	}

	// ── Error (should be unreachable — pool must be validated before startDrill) ─

	if (phase === "error") {
		return (
			<div className="mx-auto max-w-xs px-6 py-12 text-center">
				<p className="font-serif text-lg text-foreground">Not enough words available.</p>
				<p className="mt-2 text-sm text-muted-foreground">Try a smaller session size.</p>
			</div>
		);
	}

	// ── Active / Feedback ─────────────────────────────────────────────────────

	return (
		<DrillShell
			title={shell.title}
			progress={progress}
			barColor={barColor}
			backTo={shell.backTo}
		>
			{mode === "forward" ? (
				<>
					<div>
						{forwardPrompt && currentForm ? (
							// The store holds DrillForm; T is only known to the caller.
							forwardPrompt(currentForm as T)
						) : (
							currentForm && (
								<>
									{"context" in currentForm && (
										<GreekText
											as="p"
											size="3xl"
											weight="semibold"
											tone="inherit"
											className="mb-4 text-stone-800"
										>
											{(currentForm as DrillForm & { context?: string }).context}
										</GreekText>
									)}
									<p className="text-3xl font-medium text-foreground">{currentForm.label}</p>
									{"detail" in currentForm && (
										<p className="mt-1 text-xl text-stone-600">
											{(currentForm as DrillForm & { detail?: string }).detail}
										</p>
									)}
								</>
							)
						)}
					</div>
					<ForwardInput inputRef={inputRef} onSubmit={handleForwardSubmit} />
					<FeedbackDisplay />
				</>
			) : (
				<>
					{reverse.kind === "self-assess" && <SelfAssessReverse />}
					{reverse.kind === "single-select" && (
						<SingleSelectReverse
							options={reverse.options}
							renderGreek={reverse.renderGreek}
							getExplanation={reverse.getExplanation}
						/>
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

export function Drill<K extends string = string, T extends DrillForm = DrillForm>({
	drillId,
	items,
	colorTheme = "terracotta",
	defaultMode,
	sessionSize,
	speed,
	onComplete,
	reverse,
	forwardPrompt,
	configExtras,
	autoStart,
	summaryFooter,
	...shell
}: DrillProps<K, T>) {
	const { auth } = rootRoute.useRouteContext();
	const title = shell.title ?? drillTitle(drillId) ?? drillId;

	// Initialize store once per mount with this drill's config
	useState(() => {
		const config: DrillStoreConfig = {
			drillId,
			items,
			userId: auth?.userId ?? 0,
			sessionSize,
			defaultMode,
			speed,
			onComplete,
			sessionCallbacks: SESSION_CALLBACKS,
		};
		drillActions.initialize(config);
	});

	return (
		<DrillInner
			shell={{ ...shell, title }}
			theme={themeFor(drillId, colorTheme)}
			reverse={reverse}
			forwardPrompt={forwardPrompt}
			configExtras={configExtras}
			autoStart={autoStart}
			summaryFooter={summaryFooter}
		/>
	);
}
