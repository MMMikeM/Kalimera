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

type Person = "first" | "second" | "third";
type Gender = "masculine" | "feminine" | "neuter";
type Num = "singular" | "plural";

interface Possessive extends DrillForm {
	person: Person;
	number: Num;
	gender?: Gender;
}

const ENGLISH: Record<string, string> = {
	"1sg": "my",
	"2sg": "your",
	"3sg-m": "his",
	"3sg-f": "her",
	"3sg-n": "its",
	"1pl": "our",
	"2pl": "your",
	"3pl": "their",
};

const POSSESSIVES: Possessive[] = [
	{
		id: "1sg",
		person: "first",
		number: "singular",
		greek: "μου",
		greeklish: "mou",
		label: "my \u00b7 1st singular",
	},
	{
		id: "2sg",
		person: "second",
		number: "singular",
		greek: "σου",
		greeklish: "sou",
		label: "your \u00b7 2nd singular",
	},
	{
		id: "3sg-m",
		person: "third",
		number: "singular",
		gender: "masculine",
		greek: "του",
		greeklish: "tou",
		label: "his \u00b7 3rd singular",
	},
	{
		id: "3sg-f",
		person: "third",
		number: "singular",
		gender: "feminine",
		greek: "της",
		greeklish: "tis",
		label: "her \u00b7 3rd singular",
	},
	{
		id: "3sg-n",
		person: "third",
		number: "singular",
		gender: "neuter",
		greek: "του",
		greeklish: "tou",
		label: "its \u00b7 3rd singular",
	},
	{
		id: "1pl",
		person: "first",
		number: "plural",
		greek: "μας",
		greeklish: "mas",
		label: "our \u00b7 1st plural",
	},
	{
		id: "2pl",
		person: "second",
		number: "plural",
		greek: "σας",
		greeklish: "sas",
		label: "your \u00b7 2nd plural",
	},
	{
		id: "3pl",
		person: "third",
		number: "plural",
		greek: "τους",
		greeklish: "tous",
		label: "their \u00b7 3rd plural",
	},
];

const GENDER_STYLE: Record<Gender, { selectorBg: string; selectorText: string }> = {
	masculine: { selectorBg: "bg-navy-100", selectorText: "text-navy-text" },
	feminine: { selectorBg: "bg-sunset-100", selectorText: "text-sunset-text" },
	neuter: { selectorBg: "bg-slate-100", selectorText: "text-slate-text" },
};

const PERSON_LABELS: Record<Person, string> = {
	first: "1st",
	second: "2nd",
	third: "3rd",
};

const PARADIGM_ROWS: { label: string; forms: [string, string] }[] = [
	{ label: "1st", forms: ["μου", "μας"] },
	{ label: "2nd", forms: ["σου", "σας"] },
	{ label: "3rd m", forms: ["του", "τους"] },
	{ label: "3rd f", forms: ["της", "τους"] },
	{ label: "3rd n", forms: ["του", "τους"] },
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
		title="Possessive Pronouns"
		subtitle="8 forms \u00b7 timed"
		mode={mode}
		onModeChange={onModeChange}
		sessionSize={sessionSize}
		onSizeChange={onSizeChange}
		onStart={onStart}
		forwardLabel="English \u2192 Form"
		forwardDesc='"his" \u2192 type "tou"'
		reverseLabel="Form \u2192 Description"
		reverseDesc="see \u03c4\u03bf\u03c5 \u2192 identify person, number, gender"
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
							<td className="py-1.5 pr-4 text-xs font-medium text-olive-text">{row.label}</td>
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

export default function PossessivesDrill() {
	const [phase, setPhase] = useState<Phase>("config");
	const [mode, setMode] = useState<DrillMode>("forward");
	const [sessionSize, setSessionSize] = useState<SessionSize>(10);
	const [deck, setDeck] = useState<Possessive[]>([]);
	const [cardIndex, setCardIndex] = useState(0);
	const [input, setInput] = useState("");
	const [attempts, setAttempts] = useState<Attempt<Possessive>[]>([]);
	const [lastAttempt, setLastAttempt] = useState<Attempt<Possessive> | null>(null);
	const [selPerson, setSelPerson] = useState<Person | null>(null);
	const [selNumber, setSelNumber] = useState<Num | null>(null);
	const [selGender, setSelGender] = useState<Gender | null>(null);

	const inputRef = useRef<HTMLInputElement>(null);
	const inputValueRef = useRef("");
	const isActive = phase === "active";
	const [timerMs, setTimerMs] = useState(mode === "forward" ? 4000 : 6000);
	const MAX_TIMER_MS = mode === "forward" ? 5000 : 8000;
	const currentForm = (deck[cardIndex] ?? POSSESSIVES[0]) as Possessive;

	const needsGender = currentForm.person === "third" && currentForm.number === "singular";
	const showGenderRow = selPerson === "third" && selNumber === "singular";

	const recordAttempt = useCallback(
		(isCorrect: boolean, timeTaken: number, timedOut = false) => {
			const attempt: Attempt<Possessive> = {
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
		// Gender only needed for 3rd singular
		if (selPerson === "third" && selNumber === "singular" && !selGender) return;
		handleReverseSubmit();
	}, [selPerson, selNumber, selGender, mode, phase, handleReverseSubmit]);

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
		setDeck(buildDeck(POSSESSIVES, sessionSize));
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
			<SummaryScreen attempts={attempts} total={sessionSize} onAgain={() => setPhase("config")} />
		);
	}

	const barColor =
		phase === "feedback" ? (lastAttempt?.isCorrect ? "bg-correct" : "bg-incorrect") : "bg-olive";

	const englishWord = ENGLISH[currentForm.id] ?? "";
	const personLabel = `${PERSON_LABELS[currentForm.person]} person`;
	const subtitleParts: string[] = [currentForm.number];
	if (currentForm.gender) subtitleParts.push(currentForm.gender);
	const subtitle = subtitleParts.join(" \u00b7 ");

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
						<p className="mb-4 text-xs font-medium tracking-[0.18em] text-olive-text uppercase">
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
									label={PERSON_LABELS[p]}
									selected={selPerson === p}
									disabled={phase !== "active"}
									onClick={() => setSelPerson(p)}
									selectedBg="bg-olive-100"
									selectedText="text-olive-text"
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
									selectedBg="bg-olive-100"
									selectedText="text-olive-text"
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
										selectedBg={GENDER_STYLE[g].selectorBg}
										selectedText={GENDER_STYLE[g].selectorText}
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
