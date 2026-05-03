import { useCallback, useEffect, useRef, useState } from "react";

import { matchPhonetic } from "@/lib/greek-transliteration";

import { SPEEDS } from "../drill-speeds";
import {
	ConfigShell,
	type DrillForm,
	DrillShell,
	FeedbackDisplay,
	ForwardInput,
	ReverseFeedback,
	SelectorButton,
	type SessionSize,
	SummaryScreen,
	useCountdown,
	useForwardKeyboard,
} from "./drill-engine";
import { type SpeedOption, useDrillEngine } from "./use-drill-engine";

type DimValues<K extends string> = Record<K, string>;
type Selected<K extends string> = Partial<Record<K, string>>;

export interface DimensionSpec<K extends string> {
	key: K;
	values: readonly string[];
	label?: (v: string) => string;
	selectorStyle: (v: string) => { bg: string; text: string };
	shown?: (selected: Selected<K>) => boolean;
	required?: (selected: Selected<K>) => boolean;
}

interface DimensionalDrillProps<K extends string> {
	title: string;
	subtitle: string;
	drillId: string;
	paradigm: React.ReactNode;
	note?: React.ReactNode;
	forwardLabel?: string;
	forwardDesc: string;
	reverseLabel?: string;
	reverseDesc: string;
	forms: (DrillForm & DimValues<K>)[];
	dimensions: DimensionSpec<K>[];
	barColorBase: string | ((form: DrillForm & DimValues<K>) => string);
	renderForwardPrompt: (form: DrillForm & DimValues<K>) => React.ReactNode;
	defaultSessionSize?: SessionSize;
	speeds?: ReadonlyArray<SpeedOption>;
}

export function DimensionalDrill<K extends string>({
	title,
	subtitle,
	drillId,
	paradigm,
	note,
	forwardLabel = "Attributes → Greek",
	forwardDesc,
	reverseLabel = "Greek → Attributes",
	reverseDesc,
	forms,
	dimensions,
	barColorBase,
	renderForwardPrompt,
	defaultSessionSize = 10,
	speeds: speedsProp,
}: DimensionalDrillProps<K>) {
	type Form = DrillForm & DimValues<K>;

	const speeds = speedsProp ?? SPEEDS;

	const engine = useDrillEngine({
		items: forms,
		drillId,
		speeds,
		defaultSessionSize,
	});
	const {
		phase,
		setPhase,
		mode,
		setMode,
		sessionSize,
		setSessionSize,
		activeSpeedId,
		setActiveSpeedId,
		effectiveTimeLimit,
		cardIndex,
		currentForm,
		attempts,
		lastAttempt,
		input,
		setInput,
		inputRef,
		inputValueRef,
		startDrill,
		recordAttempt,
		advance,
	} = engine;

	const activeForm = currentForm as Form | undefined;

	// Per-card state
	const [selected, setSelected] = useState<Selected<K>>({});
	const activeStartedAt = useRef(0);

	useEffect(() => {
		if (phase === "active") {
			setSelected({});
			activeStartedAt.current = performance.now();
		}
	}, [phase, cardIndex]);

	// ── Helpers ────────────────────────────────────────────────────────────────

	const isRequired = (spec: DimensionSpec<K>, sel: Selected<K>) => {
		if (spec.required) return spec.required(sel);
		if (spec.shown) return spec.shown(sel);
		return true;
	};

	const allRequiredSelected = useCallback(
		(sel: Selected<K>) => {
			for (const d of dimensions) {
				if (isRequired(d, sel) && sel[d.key] === undefined) return false;
			}
			return true;
		},
		[dimensions],
	);

	// ── Callbacks ──────────────────────────────────────────────────────────────

	const handleTimeout = () => {
		if (phase !== "active" || !activeForm) return;
		const logData =
			mode === "forward"
				? {
						prompt: activeForm.label ?? activeForm.id,
						correctAnswer: activeForm.greek,
						userAnswer: inputValueRef.current,
						weakAreaIdentifier: activeForm.weakAreaIdentifier ?? activeForm.id,
					}
				: {
						prompt: activeForm.greek,
						correctAnswer: activeForm.label ?? activeForm.id,
						userAnswer: "",
						weakAreaIdentifier: activeForm.weakAreaIdentifier ?? activeForm.id,
					};
		recordAttempt(false, effectiveTimeLimit, logData, true);
	};

	const handleForwardSubmit = () => {
		if (phase !== "active" || !activeForm) return;
		const timeTaken = performance.now() - activeStartedAt.current;
		const isCorrect = matchPhonetic(input.trim(), activeForm.greek).isCorrect;
		recordAttempt(isCorrect, timeTaken, {
			prompt: activeForm.label ?? activeForm.id,
			correctAnswer: activeForm.greek,
			userAnswer: input.trim(),
			weakAreaIdentifier: activeForm.weakAreaIdentifier ?? activeForm.id,
		});
	};

	const handleReverseSubmit = useCallback(() => {
		if (phase !== "active" || !activeForm) return;
		if (!allRequiredSelected(selected)) return;
		const timeTaken = performance.now() - activeStartedAt.current;
		let isCorrect = true;
		for (const d of dimensions) {
			if (!isRequired(d, selected)) continue;
			if (selected[d.key] !== activeForm[d.key]) {
				isCorrect = false;
				break;
			}
		}
		recordAttempt(isCorrect, timeTaken, {
			prompt: activeForm.greek,
			correctAnswer: activeForm.label ?? activeForm.id,
			userAnswer: Object.values(selected).join(","),
			weakAreaIdentifier: activeForm.weakAreaIdentifier ?? activeForm.id,
		});
	}, [phase, activeForm, allRequiredSelected, selected, dimensions, recordAttempt]);

	// ── Hooks ──────────────────────────────────────────────────────────────────

	const { progress } = useCountdown(effectiveTimeLimit, phase === "active", handleTimeout);

	useForwardKeyboard({ phase, mode, onSubmit: handleForwardSubmit });

	// Auto-submit reverse when all dimensions selected
	useEffect(() => {
		if (mode !== "reverse" || phase !== "active") return;
		if (!allRequiredSelected(selected)) return;
		handleReverseSubmit();
	}, [selected, mode, phase, handleReverseSubmit, allRequiredSelected]);

	// ── Render ─────────────────────────────────────────────────────────────────

	if (phase === "config") {
		return (
			<ConfigShell
				title={title}
				subtitle={subtitle}
				mode={mode}
				onModeChange={setMode}
				sessionSize={sessionSize}
				onSizeChange={setSessionSize}
				onStart={startDrill}
				forwardLabel={forwardLabel}
				forwardDesc={forwardDesc}
				reverseLabel={reverseLabel}
				reverseDesc={reverseDesc}
			>
				<div className="mb-8">{paradigm}</div>
				{note ? <div className="mb-8 text-xs text-muted-foreground">{note}</div> : null}

				<fieldset className="mb-8">
					<legend className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
						Speed
					</legend>
					<div className="flex flex-wrap gap-2">
						{speeds.map((spd) => (
							<SelectorButton
								key={spd.id}
								label={spd.label}
								selected={activeSpeedId === spd.id}
								disabled={false}
								onClick={() => setActiveSpeedId(spd.id)}
								selectedBg="bg-terracotta-100"
								selectedText="text-terracotta-text"
							/>
						))}
					</div>
				</fieldset>
			</ConfigShell>
		);
	}

	if (phase === "complete") {
		return (
			<SummaryScreen attempts={attempts} total={sessionSize} onAgain={() => setPhase("config")} />
		);
	}

	const resolvedBase =
		typeof barColorBase === "function" && activeForm
			? barColorBase(activeForm)
			: (barColorBase as string);
	const barColor =
		phase === "feedback" ? (lastAttempt?.isCorrect ? "bg-correct" : "bg-incorrect") : resolvedBase;

	return (
		<DrillShell
			progress={progress}
			barColor={barColor}
			cardIndex={cardIndex}
			sessionSize={sessionSize}
		>
			{mode === "forward" ? (
				<>
					<div>{activeForm && renderForwardPrompt(activeForm)}</div>
					<div>
						<ForwardInput
							input={input}
							setInput={setInput}
							inputValueRef={inputValueRef}
							inputRef={inputRef}
							phase={phase}
						/>
						{phase === "feedback" && lastAttempt && (
							<FeedbackDisplay lastAttempt={lastAttempt} onContinue={advance} />
						)}
					</div>
				</>
			) : (
				<>
					<div className="pt-2">
						<p lang="el" className="greek-text font-sans text-8xl leading-none text-foreground">
							{activeForm?.greek}
						</p>
					</div>

					<div className="space-y-3">
						{dimensions.map((dim) => {
							if (dim.shown && !dim.shown(selected)) return null;
							return (
								<div key={dim.key} className="flex flex-wrap gap-2">
									{dim.values.map((v) => {
										const style = dim.selectorStyle(v);
										const label = dim.label ? dim.label(v) : v;
										return (
											<SelectorButton
												key={v}
												label={label}
												selected={selected[dim.key] === v}
												disabled={phase !== "active"}
												onClick={() =>
													setSelected((prev) => ({ ...prev, [dim.key]: v }) as Selected<K>)
												}
												selectedBg={style.bg}
												selectedText={style.text}
											/>
										);
									})}
								</div>
							);
						})}

						{phase === "feedback" && lastAttempt && (
							<ReverseFeedback lastAttempt={lastAttempt} onContinue={advance} />
						)}
					</div>
				</>
			)}
		</DrillShell>
	);
}
