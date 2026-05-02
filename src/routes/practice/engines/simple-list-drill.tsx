import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
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
	SummaryScreen,
	useCountdown,
	useForwardKeyboard,
} from "./drill-engine";
import { type DrillLogData, type SpeedOption, useDrillEngine } from "./use-drill-engine";

// ─── Public types ──────────────────────────────────────────────────────────────

export interface SimpleListItem extends DrillForm {
	english: string;
	category?: string;
	reverseGreek?: string;
	dimension?: string;
	context?: string;
	detail?: string;
	acceptAlso?: string;
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
	drillId: string;
	colorTheme?: "honey" | "terracotta" | "olive";
	forwardDesc?: string;
	reverseLabel?: string;
	reverseDesc?: string;
	categories?: Array<{ id: string; label: string }>;
	speeds?: Array<SpeedOption>;
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
	drillId,
	colorTheme = "honey",
	forwardDesc = "English meaning → Greek form",
	reverseLabel = "Greek → English",
	reverseDesc,
	categories,
	speeds: speedsProp,
	reverseDimension,
}: SimpleListDrillProps) => {
	const theme = THEME[colorTheme];
	const speeds = speedsProp ?? SPEEDS;

	const engine = useDrillEngine({ items, drillId, speeds, categories, defaultSessionSize: 10 });
	const {
		phase,
		setPhase,
		mode,
		setMode,
		sessionSize,
		setSessionSize,
		activeCategory,
		setActiveCategory,
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
		resetSelectorsRef,
		startDrill,
		recordAttempt,
	} = engine;

	// Per-card state
	const [selDimension, setSelDimension] = useState<string | null>(null);
	const [revealedAnswer, setRevealedAnswer] = useState(false);
	const activeStartedAt = useRef(0);

	// Register per-card reset with the engine
	resetSelectorsRef.current = useCallback(() => {
		setSelDimension(null);
		setRevealedAnswer(false);
	}, []);

	useEffect(() => {
		if (phase === "active") {
			activeStartedAt.current = performance.now();
		}
	}, [phase, cardIndex]);

	// ── Callbacks ──────────────────────────────────────────────────────────────

	const handleTimeout = useCallback(() => {
		if (phase !== "active" || !currentForm) return;
		const logData =
			mode === "forward"
				? {
						prompt: currentForm.english,
						correctAnswer: currentForm.greek,
						userAnswer: "",
						weakAreaIdentifier: currentForm.id,
					}
				: {
						prompt: currentForm.reverseGreek ?? currentForm.greek,
						correctAnswer: currentForm.english,
						userAnswer: "",
						weakAreaIdentifier: currentForm.id,
					};
		recordAttempt(false, effectiveTimeLimit, logData, true);
	}, [phase, mode, currentForm, effectiveTimeLimit, recordAttempt]);

	const handleForwardSubmit = useCallback(() => {
		if (phase !== "active" || !currentForm) return;
		const timeTaken = performance.now() - activeStartedAt.current;
		const primary = matchPhonetic(inputValueRef.current, currentForm.greek).isCorrect;
		const alternate =
			!primary && currentForm.acceptAlso
				? matchPhonetic(inputValueRef.current, currentForm.acceptAlso).isCorrect
				: false;
		recordAttempt(primary || alternate, timeTaken, {
			prompt: currentForm.english,
			correctAnswer: currentForm.greek,
			userAnswer: inputValueRef.current,
			weakAreaIdentifier: currentForm.id,
		});
	}, [phase, currentForm, inputValueRef, recordAttempt]);

	const handleReveal = useCallback(() => setRevealedAnswer(true), []);

	const handleSelfAssess = useCallback(
		(isCorrect: boolean) => {
			if (!currentForm) return;
			const timeTaken = performance.now() - activeStartedAt.current;
			recordAttempt(isCorrect, timeTaken, {
				prompt: currentForm.reverseGreek ?? currentForm.greek,
				correctAnswer: currentForm.english,
				userAnswer: isCorrect ? "self:correct" : "self:wrong",
				weakAreaIdentifier: currentForm.id,
			});
		},
		[currentForm, recordAttempt],
	);

	// ── Hooks ──────────────────────────────────────────────────────────────────

	const { progress } = useCountdown(effectiveTimeLimit, phase === "active", handleTimeout);

	useForwardKeyboard({ phase, mode, onSubmit: handleForwardSubmit });

	// Auto-submit when dimension selected
	useEffect(() => {
		if (
			mode !== "reverse" ||
			phase !== "active" ||
			!reverseDimension ||
			!selDimension ||
			!currentForm
		)
			return;
		const timeTaken = performance.now() - activeStartedAt.current;
		const isCorrect = reverseDimension.getCorrectId(currentForm) === selDimension;
		recordAttempt(isCorrect, timeTaken, {
			prompt: currentForm.reverseGreek ?? currentForm.greek,
			correctAnswer: reverseDimension.getCorrectId(currentForm),
			userAnswer: selDimension,
			weakAreaIdentifier: currentForm.id,
		});
	}, [selDimension, mode, phase, reverseDimension, currentForm, recordAttempt]);

	// ── Render ─────────────────────────────────────────────────────────────────

	const selfAssessReverseDesc = reverseDesc ?? "Greek form → recall meaning (self-assess)";
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
				reverseLabel={reverseLabel}
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
								selectedBg={theme.selectorBg}
								selectedText={theme.selectorText}
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

	const displayGreek =
		mode === "reverse" && currentForm?.reverseGreek ? currentForm.reverseGreek : currentForm?.greek;

	return (
		<DrillShell
			progress={progress}
			barColor={theme.bar}
			cardIndex={cardIndex}
			sessionSize={sessionSize}
		>
			{/* ── Forward mode ── */}
			{mode === "forward" && (
				<>
					<div>
						<p className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">{title}</p>
						{currentForm?.context && (
							<p lang="el" className="greek-text mb-4 text-3xl font-semibold text-stone-800">
								{currentForm.context}
							</p>
						)}
						<p className="text-3xl font-medium text-foreground">{currentForm?.english}</p>
						{currentForm?.detail && (
							<p className="mt-1 text-xl text-stone-600">{currentForm.detail}</p>
						)}
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

			{/* ── Reverse: self-assess ── */}
			{mode === "reverse" && !hasDimension && (
				<>
					<div>
						<p lang="el" className="greek-text text-4xl text-foreground">
							{displayGreek}
						</p>
					</div>

					{phase === "active" && !revealedAnswer && (
						<Button variant="outline" onClick={handleReveal} className="w-full">
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

			{/* ── Reverse: dimension selector ── */}
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

					{phase === "feedback" && lastAttempt && <ReverseFeedback lastAttempt={lastAttempt} />}
				</>
			)}
		</DrillShell>
	);
};
