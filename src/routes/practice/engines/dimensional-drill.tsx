import { useCallback, useEffect, useRef, useState } from "react";

import { matchPhonetic } from "@/lib/greek-transliteration";

import { useLogDrillAttempt } from "../hooks";
import {
	type Attempt,
	ConfigShell,
	type DrillForm,
	type DrillMode,
	DrillShell,
	FeedbackDisplay,
	ForwardInput,
	type Phase,
	ReverseFeedback,
	SelectorButton,
	type SessionSize,
	SummaryScreen,
	buildDeck,
	useAutoAdvance,
	useCountdown,
	useFocusOnActive,
	useForwardKeyboard,
} from "./drill-engine";

type DimValues<K extends string> = Record<K, string>;
type Selected<K extends string> = Partial<Record<K, string>>;

export interface DimensionSpec<K extends string> {
	key: K;
	values: readonly string[];
	label?: (v: string) => string;
	selectorStyle: (v: string) => { bg: string; text: string };
	/** Show this selector row conditionally on current selections. Default: always. */
	shown?: (selected: Selected<K>) => boolean;
	/** Required for correctness scoring. Default: true if `shown` returns true. */
	required?: (selected: Selected<K>) => boolean;
}

export interface DimensionalDrillProps<K extends string> {
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
	defaultSessionSize = 20,
}: DimensionalDrillProps<K>) {
	type Form = DrillForm & DimValues<K>;

	const logAttempt = useLogDrillAttempt(drillId);
	const [phase, setPhase] = useState<Phase>("config");
	const [mode, setMode] = useState<DrillMode>("forward");
	const [sessionSize, setSessionSize] = useState<SessionSize>(defaultSessionSize);
	const [deck, setDeck] = useState<Form[]>([]);
	const [cardIndex, setCardIndex] = useState(0);
	const [input, setInput] = useState("");
	const [attempts, setAttempts] = useState<Attempt<Form>[]>([]);
	const [lastAttempt, setLastAttempt] = useState<Attempt<Form> | null>(null);
	const [selected, setSelected] = useState<Selected<K>>({});

	const inputRef = useRef<HTMLInputElement>(null);
	const inputValueRef = useRef("");
	const isActive = phase === "active";
	const [timerMs, setTimerMs] = useState(mode === "forward" ? 4000 : 6000);
	const MAX_TIMER_MS = mode === "forward" ? 5000 : 8000;
	const currentForm = (deck[cardIndex] ?? forms[0]) as Form;

	const isRequired = useCallback(
		(spec: DimensionSpec<K>, sel: Selected<K>) => {
			if (spec.required) return spec.required(sel);
			if (spec.shown) return spec.shown(sel);
			return true;
		},
		[],
	);

	const allRequiredSelected = useCallback(
		(sel: Selected<K>) => {
			for (const d of dimensions) {
				if (isRequired(d, sel) && sel[d.key] === undefined) return false;
			}
			return true;
		},
		[dimensions, isRequired],
	);

	const recordAttempt = useCallback(
		(isCorrect: boolean, timeTaken: number, timedOut = false) => {
			const attempt: Attempt<Form> = {
				form: currentForm,
				isCorrect,
				timeTaken,
				timedOut,
			};
			setLastAttempt(attempt);
			setAttempts((prev) => [...prev, attempt]);
			setPhase("feedback");
			logAttempt({
				prompt: mode === "forward" ? (currentForm.label ?? currentForm.id) : currentForm.greek,
				correctAnswer: mode === "forward" ? currentForm.greek : (currentForm.label ?? currentForm.id),
				userAnswer: mode === "forward" ? inputValueRef.current : Object.values(selected).join(","),
				isCorrect,
				timeTaken,
				weakAreaIdentifier: currentForm.id,
			});
		},
		[currentForm, mode, selected, logAttempt],
	);

	const handleTimeout = useCallback(() => {
		if (phase !== "active") return;
		const currentInput = inputValueRef.current.trim();
		if (mode === "forward" && currentInput) {
			if (matchPhonetic(currentInput, currentForm.greek).isCorrect) {
				recordAttempt(true, timerMs, true);
				return;
			}
		}
		setTimerMs((prev) => Math.min(prev + 500, MAX_TIMER_MS));
		recordAttempt(false, timerMs, true);
	}, [phase, mode, currentForm, timerMs, MAX_TIMER_MS, recordAttempt]);

	const { progress, startedAt } = useCountdown(timerMs, isActive, handleTimeout);

	const handleForwardSubmit = useCallback(() => {
		if (phase !== "active") return;
		const timeTaken = Math.min(performance.now() - startedAt.current, timerMs);
		const isCorrect = matchPhonetic(input.trim(), currentForm.greek).isCorrect;
		recordAttempt(isCorrect, timeTaken);
	}, [phase, input, currentForm, startedAt, timerMs, recordAttempt]);

	const handleReverseSubmit = useCallback(() => {
		if (phase !== "active") return;
		if (!allRequiredSelected(selected)) return;
		const timeTaken = performance.now() - startedAt.current;
		let isCorrect = true;
		for (const d of dimensions) {
			if (!isRequired(d, selected)) continue;
			if (selected[d.key] !== currentForm[d.key]) {
				isCorrect = false;
				break;
			}
		}
		recordAttempt(isCorrect, timeTaken);
	}, [
		phase,
		selected,
		currentForm,
		startedAt,
		recordAttempt,
		allRequiredSelected,
		dimensions,
		isRequired,
	]);

	const resetSelectors = useCallback(() => {
		setSelected({});
	}, []);

	useEffect(() => {
		if (mode !== "reverse" || phase !== "active") return;
		if (!allRequiredSelected(selected)) return;
		handleReverseSubmit();
	}, [selected, mode, phase, handleReverseSubmit, allRequiredSelected]);

	useAutoAdvance({
		phase,
		lastAttempt,
		cardIndex,
		sessionSize,
		mode,
		setPhase,
		setCardIndex,
		setInput,
		inputValueRef,
		resetSelectors,
		inputRef,
	});

	useFocusOnActive({ phase, mode, inputRef });
	useForwardKeyboard({ phase, mode, onSubmit: handleForwardSubmit });

	const startDrill = useCallback(() => {
		setDeck(buildDeck(forms, sessionSize));
		setCardIndex(0);
		setInput("");
		inputValueRef.current = "";
		setAttempts([]);
		setLastAttempt(null);
		resetSelectors();
		setTimerMs(mode === "forward" ? 4000 : 6000);
		setPhase("active");
		setTimeout(() => inputRef.current?.focus(), 30);
	}, [mode, sessionSize, forms, resetSelectors]);

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
			</ConfigShell>
		);
	}

	if (phase === "complete") {
		return (
			<SummaryScreen attempts={attempts} total={sessionSize} onAgain={() => setPhase("config")} />
		);
	}

	const resolvedBase =
		typeof barColorBase === "function" ? barColorBase(currentForm) : barColorBase;
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
					<div>{renderForwardPrompt(currentForm)}</div>

					<div>
						<ForwardInput
							input={input}
							setInput={setInput}
							inputValueRef={inputValueRef}
							inputRef={inputRef}
							phase={phase}
						/>
						{phase === "feedback" && lastAttempt && <FeedbackDisplay lastAttempt={lastAttempt} />}
					</div>
				</>
			) : (
				<>
					<div className="pt-2">
						<p lang="el" className="greek-text font-sans text-8xl leading-none text-foreground">
							{currentForm.greek}
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

						{phase === "feedback" && lastAttempt && <ReverseFeedback lastAttempt={lastAttempt} />}
					</div>
				</>
			)}
		</DrillShell>
	);
}
