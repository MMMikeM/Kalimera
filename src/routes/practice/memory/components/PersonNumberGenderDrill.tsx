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
} from "../../drill-engine";

type Person = "first" | "second" | "third";
type Gender = "masculine" | "feminine" | "neuter";
type Num = "singular" | "plural";

interface PersonNumberGenderDrillProps<T extends DrillForm & { person: Person; number: Num; gender?: Gender }> {
	forms: T[];
	englishMap: Record<string, string>;
	paradigmRows: { label: string; forms: [string, string] }[];
	paradigmRowLabelColor: string;
	genderStyle: Record<Gender, { selectorBg: string; selectorText: string }>;
	personLabels: Record<Person, string>;
	colorTheme: "terracotta" | "olive";
	barColorBase: string;
	selectorBg: string;
	selectorText: string;
	showGenderRow: (selPerson: Person | null, selNumber: Num | null) => boolean;
	needsGender: (selPerson: Person | null, selNumber: Num | null) => boolean;
	configTitle: string;
	configSubtitle: string;
	configForwardDesc: string;
	configReverseDesc: string;
}

const ConfigScreen = ({
	mode,
	onModeChange,
	sessionSize,
	onSizeChange,
	onStart,
	title,
	subtitle,
	forwardDesc,
	reverseDesc,
	paradigmRows,
	paradigmRowLabelColor,
}: {
	mode: DrillMode;
	onModeChange: (m: DrillMode) => void;
	sessionSize: SessionSize;
	onSizeChange: (s: SessionSize) => void;
	onStart: () => void;
	title: string;
	subtitle: string;
	forwardDesc: string;
	reverseDesc: string;
	paradigmRows: { label: string; forms: [string, string] }[];
	paradigmRowLabelColor: string;
}) => (
	<ConfigShell
		title={title}
		subtitle={subtitle}
		mode={mode}
		onModeChange={onModeChange}
		sessionSize={sessionSize}
		onSizeChange={onSizeChange}
		onStart={onStart}
		forwardLabel="Translate / Produce"
		forwardDesc={forwardDesc}
		reverseLabel="Form / Identify"
		reverseDesc={reverseDesc}
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
					{paradigmRows.map((row) => (
						<tr key={row.label} className="border-t border-stone-100">
							<td className={`py-1.5 pr-4 text-xs font-medium ${paradigmRowLabelColor}`}>
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
		</div>
	</ConfigShell>
);

export function PersonNumberGenderDrill<
	T extends DrillForm & { person: Person; number: Num; gender?: Gender }
>({
	forms,
	englishMap,
	paradigmRows,
	paradigmRowLabelColor,
	genderStyle,
	personLabels,
	colorTheme,
	barColorBase,
	selectorBg,
	selectorText,
	showGenderRow: computeShowGenderRow,
	needsGender: computeNeedsGender,
	configTitle,
	configSubtitle,
	configForwardDesc,
	configReverseDesc,
}: PersonNumberGenderDrillProps<T>) {
	const [phase, setPhase] = useState<Phase>("config");
	const [mode, setMode] = useState<DrillMode>("forward");
	const [sessionSize, setSessionSize] = useState<SessionSize>(10);
	const [deck, setDeck] = useState<T[]>([]);
	const [cardIndex, setCardIndex] = useState(0);
	const [input, setInput] = useState("");
	const [attempts, setAttempts] = useState<Attempt<T>[]>([]);
	const [lastAttempt, setLastAttempt] = useState<Attempt<T> | null>(null);
	const [selPerson, setSelPerson] = useState<Person | null>(null);
	const [selNumber, setSelNumber] = useState<Num | null>(null);
	const [selGender, setSelGender] = useState<Gender | null>(null);

	const inputRef = useRef<HTMLInputElement>(null);
	const inputValueRef = useRef("");
	const isActive = phase === "active";
	const [timerMs, setTimerMs] = useState(mode === "forward" ? 4000 : 6000);
	const MAX_TIMER_MS = mode === "forward" ? 5000 : 8000;
	const currentForm = (deck[cardIndex] ?? forms[0]) as T;

	const showGenderRow = computeShowGenderRow(selPerson, selNumber);
	const needsGender = computeNeedsGender(selPerson, selNumber);

	const recordAttempt = useCallback(
		(isCorrect: boolean, timeTaken: number, timedOut = false) => {
			const attempt: Attempt<T> = {
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

	const { progress, startedAt } = useCountdown(timerMs, isActive, handleTimeout);

	const handleForwardSubmit = useCallback(() => {
		if (phase !== "active") return;
		const timeTaken = Math.min(performance.now() - startedAt.current, timerMs);
		const isCorrect = matchPhonetic(input.trim(), currentForm.greek).isCorrect;
		recordAttempt(isCorrect, timeTaken);
	}, [phase, input, currentForm, startedAt, timerMs, recordAttempt]);

	const handleReverseSubmit = useCallback(() => {
		if (phase !== "active" || !selPerson || !selNumber) return;
		if (needsGender && !selGender) return;
		const timeTaken = performance.now() - startedAt.current;
		const isCorrect =
			selPerson === currentForm.person &&
			selNumber === currentForm.number &&
			(!needsGender || selGender === currentForm.gender);
		recordAttempt(isCorrect, timeTaken);
	}, [phase, selPerson, selNumber, selGender, needsGender, currentForm, startedAt, recordAttempt]);

	const resetSelectors = useCallback(() => {
		setSelPerson(null);
		setSelNumber(null);
		setSelGender(null);
	}, []);

	// Auto-submit reverse mode
	useEffect(() => {
		if (mode !== "reverse" || phase !== "active") return;
		if (!selPerson || !selNumber) return;
		if (needsGender && !selGender) return;
		handleReverseSubmit();
	}, [selPerson, selNumber, selGender, mode, phase, handleReverseSubmit, needsGender]);

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
			<ConfigScreen
				mode={mode}
				onModeChange={setMode}
				sessionSize={sessionSize}
				onSizeChange={setSessionSize}
				onStart={startDrill}
				title={configTitle}
				subtitle={configSubtitle}
				forwardDesc={configForwardDesc}
				reverseDesc={configReverseDesc}
				paradigmRows={paradigmRows}
				paradigmRowLabelColor={paradigmRowLabelColor}
			/>
		);
	}
	if (phase === "complete") {
		return (
			<SummaryScreen attempts={attempts} total={sessionSize} onAgain={() => setPhase("config")} />
		);
	}

	const barColor =
		phase === "feedback" ? (lastAttempt?.isCorrect ? "bg-correct" : "bg-incorrect") : barColorBase;

	const englishWord = englishMap[currentForm.id] ?? "";
	const personLabel = `${personLabels[currentForm.person]} person`;
	const subtitleParts: string[] = [currentForm.number];
	if (currentForm.gender) subtitleParts.push(currentForm.gender);
	const subtitle = subtitleParts.join(" / ");

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
						<p className={`mb-4 text-xs font-medium tracking-[0.18em] ${selectorText} uppercase`}>
							{personLabel}
						</p>
						<p className="font-serif text-5xl leading-tight text-foreground">{englishWord}</p>
						<p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
					</div>

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
						<div className="flex flex-wrap gap-2">
							{(["first", "second", "third"] as const).map((p) => (
								<SelectorButton
									key={p}
									label={personLabels[p]}
									selected={selPerson === p}
									disabled={phase !== "active"}
									onClick={() => setSelPerson(p)}
									selectedBg={selectorBg}
									selectedText={selectorText}
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
									selectedBg={selectorBg}
									selectedText={selectorText}
								/>
							))}
						</div>

						{showGenderRow && (
							<div className="flex flex-wrap gap-2">
								{(["masculine", "feminine", "neuter"] as const).map((g) => (
									<SelectorButton
										key={g}
										label={g}
										selected={selGender === g}
										disabled={phase !== "active"}
										onClick={() => setSelGender(g)}
										selectedBg={genderStyle[g].selectorBg}
										selectedText={genderStyle[g].selectorText}
									/>
								))}
							</div>
						)}

						{phase === "feedback" && lastAttempt && <ReverseFeedback lastAttempt={lastAttempt} />}
					</div>
				</>
			)}
		</DrillShell>
	);
}
