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

type ArticleCase = "nominative" | "accusative" | "genitive";
type Gender = "masculine" | "feminine" | "neuter";
type Num = "singular" | "plural";

interface Article extends DrillForm {
	case: ArticleCase;
	gender: Gender;
	number: Num;
}

const ARTICLES: Article[] = [
	{
		id: "nom-m-sg",
		case: "nominative",
		gender: "masculine",
		number: "singular",
		greek: "ο",
		greeklish: "o",
		label: "masculine \u00b7 singular \u00b7 nominative",
	},
	{
		id: "nom-f-sg",
		case: "nominative",
		gender: "feminine",
		number: "singular",
		greek: "η",
		greeklish: "i",
		label: "feminine \u00b7 singular \u00b7 nominative",
	},
	{
		id: "nom-n-sg",
		case: "nominative",
		gender: "neuter",
		number: "singular",
		greek: "το",
		greeklish: "to",
		label: "neuter \u00b7 singular \u00b7 nominative",
	},
	{
		id: "acc-m-sg",
		case: "accusative",
		gender: "masculine",
		number: "singular",
		greek: "τον",
		greeklish: "ton",
		label: "masculine \u00b7 singular \u00b7 accusative",
	},
	{
		id: "acc-f-sg",
		case: "accusative",
		gender: "feminine",
		number: "singular",
		greek: "την",
		greeklish: "tin",
		label: "feminine \u00b7 singular \u00b7 accusative",
	},
	{
		id: "acc-n-sg",
		case: "accusative",
		gender: "neuter",
		number: "singular",
		greek: "το",
		greeklish: "to",
		label: "neuter \u00b7 singular \u00b7 accusative",
	},
	{
		id: "gen-m-sg",
		case: "genitive",
		gender: "masculine",
		number: "singular",
		greek: "του",
		greeklish: "tou",
		label: "masculine \u00b7 singular \u00b7 genitive",
	},
	{
		id: "gen-f-sg",
		case: "genitive",
		gender: "feminine",
		number: "singular",
		greek: "της",
		greeklish: "tis",
		label: "feminine \u00b7 singular \u00b7 genitive",
	},
	{
		id: "gen-n-sg",
		case: "genitive",
		gender: "neuter",
		number: "singular",
		greek: "του",
		greeklish: "tou",
		label: "neuter \u00b7 singular \u00b7 genitive",
	},
	{
		id: "nom-m-pl",
		case: "nominative",
		gender: "masculine",
		number: "plural",
		greek: "οι",
		greeklish: "i",
		label: "masculine \u00b7 plural \u00b7 nominative",
	},
	{
		id: "nom-f-pl",
		case: "nominative",
		gender: "feminine",
		number: "plural",
		greek: "οι",
		greeklish: "i",
		label: "feminine \u00b7 plural \u00b7 nominative",
	},
	{
		id: "nom-n-pl",
		case: "nominative",
		gender: "neuter",
		number: "plural",
		greek: "τα",
		greeklish: "ta",
		label: "neuter \u00b7 plural \u00b7 nominative",
	},
	{
		id: "acc-m-pl",
		case: "accusative",
		gender: "masculine",
		number: "plural",
		greek: "τους",
		greeklish: "tous",
		label: "masculine \u00b7 plural \u00b7 accusative",
	},
	{
		id: "acc-f-pl",
		case: "accusative",
		gender: "feminine",
		number: "plural",
		greek: "τις",
		greeklish: "tis",
		label: "feminine \u00b7 plural \u00b7 accusative",
	},
	{
		id: "acc-n-pl",
		case: "accusative",
		gender: "neuter",
		number: "plural",
		greek: "τα",
		greeklish: "ta",
		label: "neuter \u00b7 plural \u00b7 accusative",
	},
	{
		id: "gen-m-pl",
		case: "genitive",
		gender: "masculine",
		number: "plural",
		greek: "των",
		greeklish: "ton",
		label: "masculine \u00b7 plural \u00b7 genitive",
	},
	{
		id: "gen-f-pl",
		case: "genitive",
		gender: "feminine",
		number: "plural",
		greek: "των",
		greeklish: "ton",
		label: "feminine \u00b7 plural \u00b7 genitive",
	},
	{
		id: "gen-n-pl",
		case: "genitive",
		gender: "neuter",
		number: "plural",
		greek: "των",
		greeklish: "ton",
		label: "neuter \u00b7 plural \u00b7 genitive",
	},
];

const CASE_STYLE: Record<
	ArticleCase,
	{ text: string; bar: string; selectorBg: string; selectorText: string }
> = {
	nominative: {
		text: "text-ocean-text",
		bar: "bg-ocean",
		selectorBg: "bg-ocean-100",
		selectorText: "text-ocean-text",
	},
	accusative: {
		text: "text-terracotta-text",
		bar: "bg-terracotta",
		selectorBg: "bg-terracotta-100",
		selectorText: "text-terracotta-text",
	},
	genitive: {
		text: "text-olive-text",
		bar: "bg-olive",
		selectorBg: "bg-olive-100",
		selectorText: "text-olive-text",
	},
};

const GENDER_STYLE: Record<Gender, { label: string; selectorBg: string; selectorText: string }> = {
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

const PARADIGM_ROWS: {
	label: string;
	caseKey: ArticleCase;
	forms: [string, string, string];
}[] = [
	{ label: "Nom sg", caseKey: "nominative", forms: ["ο", "η", "το"] },
	{ label: "Acc sg", caseKey: "accusative", forms: ["τον", "την", "το"] },
	{ label: "Gen sg", caseKey: "genitive", forms: ["του", "της", "του"] },
	{ label: "Nom pl", caseKey: "nominative", forms: ["οι", "οι", "τα"] },
	{ label: "Acc pl", caseKey: "accusative", forms: ["τους", "τις", "τα"] },
	{ label: "Gen pl", caseKey: "genitive", forms: ["των", "των", "των"] },
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
		title="Definite Articles"
		subtitle="18 forms \u00b7 timed"
		mode={mode}
		onModeChange={onModeChange}
		sessionSize={sessionSize}
		onSizeChange={onSizeChange}
		onStart={onStart}
		forwardLabel="Description \u2192 Form"
		forwardDesc='masculine \u00b7 singular \u00b7 accusative \u2192 type "ton"'
		reverseLabel="Form \u2192 Description"
		reverseDesc="see \u03c4\u03bf\u03bd \u2192 identify gender, number, case"
	>
		<div className="mb-8 overflow-x-auto">
			<table className="w-full border-collapse text-sm">
				<thead>
					<tr>
						<th className="py-1 pr-4 text-left text-xs font-normal text-muted-foreground" />
						<th className="px-3 py-1 text-center text-xs font-medium text-navy-text">Masc</th>
						<th className="px-3 py-1 text-center text-xs font-medium text-sunset-text">Fem</th>
						<th className="px-3 py-1 text-center text-xs font-medium text-slate-text">Neut</th>
					</tr>
				</thead>
				<tbody>
					{PARADIGM_ROWS.map((row) => (
						<tr key={row.label} className="border-t border-stone-100">
							<td className={`py-1.5 pr-4 text-xs font-medium ${CASE_STYLE[row.caseKey].text}`}>
								{row.label}
							</td>
							{(["masculine", "feminine", "neuter"] as const).map((g, i) => (
								<td
									key={g}
									lang="el"
									className="greek-text px-3 py-1.5 text-center text-base text-foreground"
								>
									{row.forms[i]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</ConfigShell>
);

export default function MemoryDrill() {
	const [phase, setPhase] = useState<Phase>("config");
	const [mode, setMode] = useState<DrillMode>("forward");
	const [sessionSize, setSessionSize] = useState<SessionSize>(20);
	const [deck, setDeck] = useState<Article[]>([]);
	const [cardIndex, setCardIndex] = useState(0);
	const [input, setInput] = useState("");
	const [attempts, setAttempts] = useState<Attempt<Article>[]>([]);
	const [lastAttempt, setLastAttempt] = useState<Attempt<Article> | null>(null);
	const [selGender, setSelGender] = useState<Gender | null>(null);
	const [selNumber, setSelNumber] = useState<Num | null>(null);
	const [selCase, setSelCase] = useState<ArticleCase | null>(null);

	const inputRef = useRef<HTMLInputElement>(null);
	const inputValueRef = useRef("");
	const isActive = phase === "active";
	const [timerMs, setTimerMs] = useState(mode === "forward" ? 4000 : 6000);
	const MAX_TIMER_MS = mode === "forward" ? 5000 : 8000;
	const currentArticle = (deck[cardIndex] ?? ARTICLES[0]) as Article;

	const recordAttempt = useCallback(
		(isCorrect: boolean, timeTaken: number, timedOut = false) => {
			const attempt: Attempt<Article> = {
				form: currentArticle,
				isCorrect,
				timeTaken,
				timedOut,
			};
			setLastAttempt(attempt);
			setAttempts((prev) => [...prev, attempt]);
			setPhase("feedback");
		},
		[currentArticle],
	);

	const handleTimeout = useCallback(() => {
		if (phase !== "active") return;
		const currentInput = inputValueRef.current.trim();
		if (mode === "forward" && currentInput) {
			const isCorrect = matchPhonetic(currentInput, currentArticle.greek).isCorrect;
			if (isCorrect) {
				recordAttempt(true, timerMs, true);
				return;
			}
		}
		setTimerMs((prev) => Math.min(prev + 500, MAX_TIMER_MS));
		recordAttempt(false, timerMs, true);
	}, [phase, mode, currentArticle, timerMs, MAX_TIMER_MS, recordAttempt]);

	const { progress, startedAt } = useCountdown(timerMs, isActive, handleTimeout);

	const handleForwardSubmit = useCallback(() => {
		if (phase !== "active") return;
		const timeTaken = Math.min(performance.now() - startedAt.current, timerMs);
		const isCorrect = matchPhonetic(input.trim(), currentArticle.greek).isCorrect;
		recordAttempt(isCorrect, timeTaken);
	}, [phase, input, currentArticle, startedAt, timerMs, recordAttempt]);

	const handleReverseSubmit = useCallback(() => {
		if (phase !== "active" || !selGender || !selNumber || !selCase) return;
		const timeTaken = performance.now() - startedAt.current;
		const isCorrect =
			selGender === currentArticle.gender &&
			selNumber === currentArticle.number &&
			selCase === currentArticle.case;
		recordAttempt(isCorrect, timeTaken);
	}, [phase, selGender, selNumber, selCase, currentArticle, startedAt, recordAttempt]);

	const resetSelectors = useCallback(() => {
		setSelGender(null);
		setSelNumber(null);
		setSelCase(null);
	}, []);

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

	// Auto-submit reverse when all three attributes selected
	useEffect(() => {
		if (mode === "reverse" && selGender && selNumber && selCase && phase === "active") {
			handleReverseSubmit();
		}
	}, [selGender, selNumber, selCase, mode, phase, handleReverseSubmit]);

	const startDrill = useCallback(() => {
		setDeck(buildDeck(ARTICLES, sessionSize));
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

	const cs = CASE_STYLE[currentArticle.case];
	const gs = GENDER_STYLE[currentArticle.gender];
	const barColor =
		phase === "feedback" ? (lastAttempt?.isCorrect ? "bg-correct" : "bg-incorrect") : cs.bar;

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
						<p className={`mb-4 text-xs font-medium tracking-[0.18em] uppercase ${gs.label}`}>
							{currentArticle.gender}
						</p>
						<p className="font-serif text-5xl leading-tight text-foreground">
							{currentArticle.number}
						</p>
						<p className={`font-serif text-5xl leading-tight ${cs.text}`}>{currentArticle.case}</p>
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
							{currentArticle.greek}
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

						<div className="flex flex-wrap gap-2">
							{(["nominative", "accusative", "genitive"] as const).map((c) => (
								<SelectorButton
									key={c}
									label={c}
									selected={selCase === c}
									disabled={phase !== "active"}
									onClick={() => setSelCase(c)}
									selectedBg={CASE_STYLE[c].selectorBg}
									selectedText={CASE_STYLE[c].selectorText}
								/>
							))}
						</div>

						{phase === "feedback" && lastAttempt && <ReverseFeedback lastAttempt={lastAttempt} />}
					</div>
				</>
			)}
		</DrillShell>
	);
}
