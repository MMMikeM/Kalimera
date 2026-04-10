import { useCallback, useEffect, useRef, useState } from "react";
import { matchPhonetic } from "@/lib/greek-transliteration";
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
} from "../drill-engine";

type Gender = "masculine" | "feminine" | "neuter";
type Num = "singular" | "plural";

interface Contraction extends DrillForm {
	gender: Gender;
	number: Num;
}

const CONTRACTIONS: Contraction[] = [
	{
		id: "m-sg",
		gender: "masculine",
		number: "singular",
		greek: "στον",
		greeklish: "ston",
		label: "masculine \u00b7 singular",
	},
	{
		id: "f-sg",
		gender: "feminine",
		number: "singular",
		greek: "στην",
		greeklish: "stin",
		label: "feminine \u00b7 singular",
	},
	{
		id: "n-sg",
		gender: "neuter",
		number: "singular",
		greek: "στο",
		greeklish: "sto",
		label: "neuter \u00b7 singular",
	},
	{
		id: "m-pl",
		gender: "masculine",
		number: "plural",
		greek: "στους",
		greeklish: "stous",
		label: "masculine \u00b7 plural",
	},
	{
		id: "f-pl",
		gender: "feminine",
		number: "plural",
		greek: "στις",
		greeklish: "stis",
		label: "feminine \u00b7 plural",
	},
	{
		id: "n-pl",
		gender: "neuter",
		number: "plural",
		greek: "στα",
		greeklish: "sta",
		label: "neuter \u00b7 plural",
	},
];

const GENDER_STYLE: Record<
	Gender,
	{ label: string; selectorBg: string; selectorText: string }
> = {
	masculine: {
		label: "text-navy-text",
		selectorBg: "bg-navy-100",
		selectorText: "text-navy-text",
	},
	feminine: {
		label: "text-sunset-text",
		selectorBg: "bg-sunset-100",
		selectorText: "text-sunset-text",
	},
	neuter: {
		label: "text-slate-text",
		selectorBg: "bg-slate-100",
		selectorText: "text-slate-text",
	},
};

const PARADIGM_ROWS: { label: string; forms: [string, string] }[] = [
	{ label: "Masculine", forms: ["στον", "στους"] },
	{ label: "Feminine", forms: ["στην", "στις"] },
	{ label: "Neuter", forms: ["στο", "στα"] },
];

const ConfigScreen = ({
	mode,
	onModeChange,
	sessionSize,
	onSizeChange,
	onStart,
}: {
	mode: DrillMode;
	onModeChange: (m: DrillMode) => void;
	sessionSize: SessionSize;
	onSizeChange: (s: SessionSize) => void;
	onStart: () => void;
}) => (
	<ConfigShell
		title="Contractions (\u03c3\u03b5)"
		subtitle="6 forms \u00b7 timed"
		mode={mode}
		onModeChange={onModeChange}
		sessionSize={sessionSize}
		onSizeChange={onSizeChange}
		onStart={onStart}
		forwardLabel="Description \u2192 Form"
		forwardDesc='feminine \u00b7 singular \u2192 type "stin"'
		reverseLabel="Form \u2192 Description"
		reverseDesc="see \u03c3\u03c4\u03b7\u03bd \u2192 identify gender, number"
	>
		<div className="mb-8 overflow-x-auto">
			<table className="w-full border-collapse text-sm">
				<thead>
					<tr>
						<th className="py-1 pr-4 text-left text-xs font-normal text-muted-foreground" />
						<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">
							Singular
						</th>
						<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">
							Plural
						</th>
					</tr>
				</thead>
				<tbody>
					{PARADIGM_ROWS.map((row) => (
						<tr key={row.label} className="border-t border-stone-100">
							<td className="py-1.5 pr-4 text-xs font-medium text-terracotta-text">
								{row.label}
							</td>
							{row.forms.map((form) => (
								<td
									key={form}
									lang="el"
									className="greek-text px-3 py-1.5 text-center text-base text-foreground"
								>
									{form}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<p className="mt-2 text-xs text-muted-foreground">
				<span lang="el" className="greek-text">
					σε
				</span>{" "}
				+ definite article (always accusative)
			</p>
		</div>
	</ConfigShell>
);

export default function ContractionsDrill() {
	const [phase, setPhase] = useState<Phase>("config");
	const [mode, setMode] = useState<DrillMode>("forward");
	const [sessionSize, setSessionSize] = useState<SessionSize>(10);
	const [deck, setDeck] = useState<Contraction[]>([]);
	const [cardIndex, setCardIndex] = useState(0);
	const [input, setInput] = useState("");
	const [attempts, setAttempts] = useState<Attempt<Contraction>[]>([]);
	const [lastAttempt, setLastAttempt] = useState<Attempt<Contraction> | null>(
		null,
	);
	const [selGender, setSelGender] = useState<Gender | null>(null);
	const [selNumber, setSelNumber] = useState<Num | null>(null);

	const inputRef = useRef<HTMLInputElement>(null);
	const inputValueRef = useRef("");
	const isActive = phase === "active";
	const [timerMs, setTimerMs] = useState(mode === "forward" ? 4000 : 6000);
	const MAX_TIMER_MS = mode === "forward" ? 5000 : 8000;
	const currentForm = (deck[cardIndex] ?? CONTRACTIONS[0]) as Contraction;

	const recordAttempt = useCallback(
		(isCorrect: boolean, timeTaken: number, timedOut = false) => {
			const attempt: Attempt<Contraction> = {
				form: currentForm,
				isCorrect,
				timeTaken,
				timedOut,
			};
			setLastAttempt(attempt);
			setAttempts((prev) => [...prev, attempt]);
			setPhase("feedback");
		},
		[currentForm],
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

	const { progress, startedAt } = useCountdown(
		timerMs,
		isActive,
		handleTimeout,
	);

	const handleForwardSubmit = useCallback(() => {
		if (phase !== "active") return;
		const timeTaken = Math.min(performance.now() - startedAt.current, timerMs);
		const isCorrect = matchPhonetic(input.trim(), currentForm.greek).isCorrect;
		recordAttempt(isCorrect, timeTaken);
	}, [phase, input, currentForm, startedAt, timerMs, recordAttempt]);

	const handleReverseSubmit = useCallback(() => {
		if (phase !== "active" || !selGender || !selNumber) return;
		const timeTaken = performance.now() - startedAt.current;
		const isCorrect =
			selGender === currentForm.gender && selNumber === currentForm.number;
		recordAttempt(isCorrect, timeTaken);
	}, [phase, selGender, selNumber, currentForm, startedAt, recordAttempt]);

	const resetSelectors = useCallback(() => {
		setSelGender(null);
		setSelNumber(null);
	}, []);

	// Auto-submit reverse mode when both selected
	useEffect(() => {
		if (mode !== "reverse" || phase !== "active") return;
		if (!selGender || !selNumber) return;
		handleReverseSubmit();
	}, [selGender, selNumber, mode, phase, handleReverseSubmit]);

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
		setDeck(buildDeck(CONTRACTIONS, sessionSize));
		setCardIndex(0);
		setInput("");
		inputValueRef.current = "";
		setAttempts([]);
		setLastAttempt(null);
		resetSelectors();
		setTimerMs(mode === "forward" ? 4000 : 6000);
		setPhase("active");
		setTimeout(() => inputRef.current?.focus(), 30);
	}, [mode, sessionSize, resetSelectors]);

	if (phase === "config") {
		return (
			<ConfigScreen
				mode={mode}
				onModeChange={setMode}
				sessionSize={sessionSize}
				onSizeChange={setSessionSize}
				onStart={startDrill}
			/>
		);
	}
	if (phase === "complete") {
		return (
			<SummaryScreen
				attempts={attempts}
				total={sessionSize}
				onAgain={() => setPhase("config")}
			/>
		);
	}

	const barColor =
		phase === "feedback"
			? lastAttempt?.isCorrect
				? "bg-correct"
				: "bg-incorrect"
			: "bg-terracotta";

	const gs = GENDER_STYLE[currentForm.gender];

	return (
		<DrillShell
			progress={progress}
			barColor={barColor}
			cardIndex={cardIndex}
			sessionSize={sessionSize}
		>
			{mode === "forward" ? (
				<>
					<div>
						<p className="mb-4 text-xs font-medium tracking-[0.18em] text-ocean-text uppercase">
							to the / at the
						</p>
						<p className={`font-serif text-5xl leading-tight ${gs.label}`}>
							{currentForm.gender}
						</p>
						<p className="mt-2 text-sm text-muted-foreground">
							{currentForm.number}
						</p>
					</div>

					<div>
						<ForwardInput
							input={input}
							setInput={setInput}
							inputValueRef={inputValueRef}
							inputRef={inputRef}
							phase={phase}
						/>
						{phase === "feedback" && lastAttempt && (
							<FeedbackDisplay lastAttempt={lastAttempt} />
						)}
					</div>
				</>
			) : (
				<>
					<div className="pt-2">
						<p
							lang="el"
							className="greek-text font-sans text-8xl leading-none text-foreground"
						>
							{currentForm.greek}
						</p>
					</div>

					<div className="space-y-3">
						<div className="flex flex-wrap gap-2">
							{(["masculine", "feminine", "neuter"] as const).map((g) => (
								<SelectorButton
									key={g}
									label={g}
									selected={selGender === g}
									disabled={phase !== "active"}
									onClick={() => setSelGender(g)}
									selectedBg={GENDER_STYLE[g].selectorBg}
									selectedText={GENDER_STYLE[g].selectorText}
								/>
							))}
						</div>

						<div className="flex flex-wrap gap-2">
							{(["singular", "plural"] as const).map((n) => (
								<SelectorButton
									key={n}
									label={n}
									selected={selNumber === n}
									disabled={phase !== "active"}
									onClick={() => setSelNumber(n)}
									selectedBg="bg-terracotta-100"
									selectedText="text-terracotta-text"
								/>
							))}
						</div>

						{phase === "feedback" && lastAttempt && (
							<ReverseFeedback lastAttempt={lastAttempt} />
						)}
					</div>
				</>
			)}
		</DrillShell>
	);
}
