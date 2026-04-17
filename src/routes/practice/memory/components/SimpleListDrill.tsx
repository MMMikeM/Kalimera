import { useCallback, useEffect, useRef, useState } from "react";

import { matchPhonetic } from "@/lib/greek-transliteration";
import { Button } from "@/components/ui/button";

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

// ─── Public types ──────────────────────────────────────────────────────────────

export interface SimpleListItem extends DrillForm {
	english: string;
	category?: string;
	// What to display in reverse mode — defaults to greek.
	// Use when greek includes an article that would give the answer away (e.g. noun genders).
	reverseGreek?: string;
	// For reverseDimension mode: which option id this item maps to.
	dimension?: string;
}

interface SelectorOption {
	id: string;
	label: string;
	selectorBg: string;
	selectorText: string;
}

export interface SimpleListDrillProps {
	items: SimpleListItem[];
	title: string;
	subtitle: string;
	colorTheme?: "honey" | "terracotta" | "olive";
	forwardTimeLimit?: number;
	forwardDesc?: string;
	reverseDesc?: string;
	// Renders filter buttons in config screen above mode selection.
	categories?: Array<{ id: string; label: string }>;
	// When provided, reverse mode uses selector buttons instead of self-assess.
	reverseDimension?: {
		options: SelectorOption[];
		getCorrectId: (item: SimpleListItem) => string;
	};
}

// ─── Theme ─────────────────────────────────────────────────────────────────────

const THEME = {
	honey: { bar: "bg-honey", selectorBg: "bg-honey-100", selectorText: "text-honey-text" },
	terracotta: {
		bar: "bg-terracotta",
		selectorBg: "bg-terracotta-100",
		selectorText: "text-terracotta-text",
	},
	olive: { bar: "bg-olive", selectorBg: "bg-olive-100", selectorText: "text-olive-text" },
} as const;

// ─── Component ─────────────────────────────────────────────────────────────────

export const SimpleListDrill = ({
	items,
	title,
	subtitle,
	colorTheme = "honey",
	forwardTimeLimit = 5000,
	forwardDesc = "English meaning → Greek form",
	reverseDesc,
	categories,
	reverseDimension,
}: SimpleListDrillProps) => {
	const theme = THEME[colorTheme];

	// Session state
	const [phase, setPhase] = useState<Phase>("config");
	const [mode, setMode] = useState<DrillMode>("forward");
	const [sessionSize, setSessionSize] = useState<SessionSize>(10);
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [deck, setDeck] = useState<SimpleListItem[]>([]);
	const [cardIndex, setCardIndex] = useState(0);

	// Forward input
	const [input, setInput] = useState("");
	const inputValueRef = useRef("");
	const inputRef = useRef<HTMLInputElement | null>(null);

	// Attempt tracking
	const [attempts, setAttempts] = useState<Attempt<SimpleListItem>[]>([]);
	const [lastAttempt, setLastAttempt] = useState<Attempt<SimpleListItem> | null>(null);

	// Reverse: dimension selector
	const [selDimension, setSelDimension] = useState<string | null>(null);

	// Reverse: self-assess reveal
	const [revealedAnswer, setRevealedAnswer] = useState(false);

	const activeStartedAt = useRef(0);

	const currentForm = deck[cardIndex];

	// Reset per-card state when entering active phase
	useEffect(() => {
		if (phase === "active") {
			setRevealedAnswer(false);
			activeStartedAt.current = performance.now();
		}
	}, [phase, cardIndex]);

	// ── Callbacks ──────────────────────────────────────────────────────────────

	const recordAttempt = useCallback(
		(isCorrect: boolean, timeTaken: number, timedOut = false) => {
			if (!currentForm) return;
			const attempt: Attempt<SimpleListItem> = { form: currentForm, isCorrect, timeTaken, timedOut };
			setLastAttempt(attempt);
			setAttempts((prev) => [...prev, attempt]);
			setPhase("feedback");
		},
		[currentForm],
	);

	const handleTimeout = useCallback(() => {
		if (phase !== "active") return;
		recordAttempt(false, forwardTimeLimit, true);
	}, [phase, recordAttempt, forwardTimeLimit]);

	const handleForwardSubmit = useCallback(() => {
		if (phase !== "active" || !currentForm) return;
		const timeTaken = performance.now() - activeStartedAt.current;
		const isCorrect = matchPhonetic(inputValueRef.current, currentForm.greek).isCorrect;
		recordAttempt(isCorrect, timeTaken);
	}, [phase, currentForm, recordAttempt]);

	const handleReveal = useCallback(() => {
		setRevealedAnswer(true);
	}, []);

	const handleSelfAssess = useCallback(
		(isCorrect: boolean) => {
			const timeTaken = performance.now() - activeStartedAt.current;
			recordAttempt(isCorrect, timeTaken);
		},
		[recordAttempt],
	);

	const resetSelectors = useCallback(() => {
		setSelDimension(null);
	}, []);

	const startDrill = useCallback(() => {
		const source = activeCategory ? items.filter((i) => i.category === activeCategory) : items;
		setDeck(buildDeck(source, sessionSize));
		setCardIndex(0);
		setInput("");
		inputValueRef.current = "";
		setAttempts([]);
		setLastAttempt(null);
		setSelDimension(null);
		setRevealedAnswer(false);
		setPhase("active");
	}, [items, activeCategory, sessionSize]);

	// ── Hooks ──────────────────────────────────────────────────────────────────

	const { progress } = useCountdown(
		forwardTimeLimit,
		phase === "active" && mode === "forward",
		handleTimeout,
	);

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

	useForwardKeyboard({ phase, mode, onSubmit: handleForwardSubmit });
	useFocusOnActive({ phase, mode, inputRef });

	// Auto-submit when dimension selected (reverseDimension mode)
	useEffect(() => {
		if (mode !== "reverse" || phase !== "active" || !reverseDimension || !selDimension || !currentForm)
			return;
		const timeTaken = performance.now() - activeStartedAt.current;
		const isCorrect = reverseDimension.getCorrectId(currentForm) === selDimension;
		recordAttempt(isCorrect, timeTaken);
	}, [selDimension, mode, phase, reverseDimension, currentForm, recordAttempt]);

	// ── Render ─────────────────────────────────────────────────────────────────

	const selfAssessReverseDesc =
		reverseDesc ?? "Greek form → recall meaning (self-assess)";
	const hasDimension = !!reverseDimension;

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
				forwardLabel="English → Greek"
				forwardDesc={forwardDesc}
				reverseLabel="Greek → ?"
				reverseDesc={selfAssessReverseDesc}
			>
				{categories && (
					<fieldset className="mb-8">
						<legend className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
							Filter
						</legend>
						<div className="flex flex-wrap gap-2">
							<SelectorButton
								label="All"
								selected={activeCategory === null}
								disabled={false}
								onClick={() => setActiveCategory(null)}
								selectedBg={theme.selectorBg}
								selectedText={theme.selectorText}
							/>
							{categories.map((cat) => (
								<SelectorButton
									key={cat.id}
									label={cat.label}
									selected={activeCategory === cat.id}
									disabled={false}
									onClick={() => setActiveCategory(cat.id)}
									selectedBg={theme.selectorBg}
									selectedText={theme.selectorText}
								/>
							))}
						</div>
					</fieldset>
				)}
			</ConfigShell>
		);
	}

	if (phase === "complete") {
		return <SummaryScreen attempts={attempts} total={sessionSize} onAgain={startDrill} />;
	}

	const displayGreek =
		mode === "reverse" && currentForm?.reverseGreek ? currentForm.reverseGreek : currentForm?.greek;

	return (
		<DrillShell
			progress={mode === "forward" ? progress : 1}
			barColor={theme.bar}
			cardIndex={cardIndex}
			sessionSize={sessionSize}
		>
			{/* ── Forward mode ── */}
			{mode === "forward" && (
				<>
					<div>
						<p className="mb-1 text-xs text-muted-foreground uppercase tracking-widest">
							{title}
						</p>
						<p className="text-3xl font-medium text-foreground">{currentForm?.english}</p>
					</div>

					<ForwardInput
						input={input}
						setInput={setInput}
						inputValueRef={inputValueRef}
						inputRef={inputRef}
						phase={phase}
					/>

					{phase === "feedback" && lastAttempt && <FeedbackDisplay lastAttempt={lastAttempt} />}
				</>
			)}

			{/* ── Reverse mode: self-assess ── */}
			{mode === "reverse" && !hasDimension && (
				<>
					<div>
						<p lang="el" className="greek-text text-4xl text-foreground">
							{displayGreek}
						</p>
					</div>

					{phase === "active" && !revealedAnswer && (
						<Button
							variant="outline"
							onClick={handleReveal}
							className="w-full"
						>
							Show answer
						</Button>
					)}

					{phase === "active" && revealedAnswer && (
						<>
							<p className="text-xl text-muted-foreground">{currentForm?.english}</p>
							<div className="flex gap-3">
								<Button
									variant="outline"
									onClick={() => handleSelfAssess(false)}
									className="flex-1 border-incorrect/30 text-incorrect hover:bg-incorrect/5"
								>
									Missed it
								</Button>
								<Button
									variant="outline"
									onClick={() => handleSelfAssess(true)}
									className="flex-1 border-correct/30 text-correct hover:bg-correct/5"
								>
									Got it
								</Button>
							</div>
						</>
					)}

					{phase === "feedback" && lastAttempt && (
						<div className="pt-2">
							<p
								className={`text-sm font-medium ${lastAttempt.isCorrect ? "text-correct" : "text-incorrect"}`}
							>
								{lastAttempt.isCorrect ? "Correct" : "Incorrect"}
							</p>
							<p className="mt-1 text-sm text-muted-foreground">{currentForm?.english}</p>
						</div>
					)}
				</>
			)}

			{/* ── Reverse mode: dimension selector ── */}
			{mode === "reverse" && hasDimension && reverseDimension && (
				<>
					<div>
						<p lang="el" className="greek-text text-4xl text-foreground">
							{displayGreek}
						</p>
					</div>

					<div className="flex flex-wrap gap-2">
						{reverseDimension.options.map((opt) => (
							<SelectorButton
								key={opt.id}
								label={opt.label}
								selected={selDimension === opt.id}
								disabled={phase !== "active"}
								onClick={() => setSelDimension(opt.id)}
								selectedBg={opt.selectorBg}
								selectedText={opt.selectorText}
							/>
						))}
					</div>

					{phase === "feedback" && lastAttempt && (
						<ReverseFeedback lastAttempt={lastAttempt} />
					)}
				</>
			)}
		</DrillShell>
	);
};
