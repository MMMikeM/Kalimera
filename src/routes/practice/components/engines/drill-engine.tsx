import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { greekToPhonetic } from "@/lib/greek-transliteration";
import { shuffle } from "@/lib/shuffle";

export type DrillMode = "forward" | "reverse";
export type Phase = "config" | "active" | "feedback" | "complete";

export const SESSION_SIZES = [10, 20, 30] as const;
export type SessionSize = (typeof SESSION_SIZES)[number];

export interface DrillForm {
	id: string;
	greek: string;
	greeklish: string;
	label: string;
	// When set, feedback shows the full form alongside the bare answer
	// (e.g. the conjugated verb that carries an ending).
	acceptAlso?: string;
	// Persisted attempts link to this vocabulary row for SRS skill tracking.
	vocabularyId?: number;
	// Tag set by the question source for weak-area aggregation; falls back to
	// `id` when unset.
	weakAreaIdentifier?: string;
}

export interface Attempt<T extends DrillForm> {
	form: T;
	isCorrect: boolean;
	timeTaken: number;
	timedOut: boolean;
	userInput?: string;
}

export const buildDeck = <T,>(forms: T[], size: SessionSize): T[] => {
	const first = shuffle([...forms]);
	if (size <= forms.length) return first.slice(0, size);
	const second = shuffle([...forms]).slice(0, size - forms.length);
	return [...first, ...second];
};

export const useCountdown = (durationMs: number, isRunning: boolean, onTimeout: () => void) => {
	const [progress, setProgress] = useState(1);
	const rafRef = useRef<number | null>(null);
	const startRef = useRef<number>(0);
	const onTimeoutRef = useRef(onTimeout);
	useEffect(() => {
		onTimeoutRef.current = onTimeout;
	}, [onTimeout]);

	useEffect(() => {
		if (!isRunning) {
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
				rafRef.current = null;
			}
			return;
		}
		setProgress(1);
		startRef.current = performance.now();
		const tick = (now: number) => {
			const rem = Math.max(0, 1 - (now - startRef.current) / durationMs);
			setProgress(rem);
			if (rem > 0) {
				rafRef.current = requestAnimationFrame(tick);
			} else {
				onTimeoutRef.current();
			}
		};
		rafRef.current = requestAnimationFrame(tick);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [isRunning, durationMs]);

	return { progress, startedAt: startRef };
};

export const SelectorButton = ({
	label,
	selected,
	disabled,
	onClick,
	selectedBg,
	selectedText,
}: {
	label: string;
	selected: boolean;
	disabled: boolean;
	onClick: () => void;
	selectedBg: string;
	selectedText: string;
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-40 ${
				selected
					? `${selectedBg} ${selectedText} border-transparent`
					: "border-border bg-transparent text-foreground hover:border-stone-400"
			}`}
		>
			{label}
		</button>
	);
};

export const SummaryScreen = <T extends DrillForm>({
	attempts,
	total,
	onAgain,
	onRetryMistakes,
}: {
	attempts: Attempt<T>[];
	total: number;
	onAgain: () => void;
	onRetryMistakes?: (mistakes: Attempt<T>[]) => void;
}) => {
	const correct = attempts.filter((a) => a.isCorrect).length;
	const avgTime = attempts.reduce((s, a) => s + a.timeTaken, 0) / attempts.length;
	const accuracy = Math.round((correct / total) * 100);

	// Aggregate incorrect attempts per form. Keep the slowest as representative,
	// count repeats so the UI can flag forms that tripped the learner up multiple times.
	const incorrectByForm = new Map<string, { attempt: Attempt<T>; count: number }>();
	for (const a of attempts) {
		if (!a.isCorrect) {
			const existing = incorrectByForm.get(a.form.id);
			if (!existing) {
				incorrectByForm.set(a.form.id, { attempt: a, count: 1 });
			} else {
				existing.count += 1;
				if (a.timeTaken > existing.attempt.timeTaken) existing.attempt = a;
			}
		}
	}
	const mistakeEntries = [...incorrectByForm.values()].sort(
		(a, b) => b.attempt.timeTaken - a.attempt.timeTaken,
	);
	const mistakes = mistakeEntries;
	const allMistakes = mistakeEntries.map((m) => m.attempt);

	return (
		<div className="mx-auto max-w-xs px-6 py-8">
			<h2 className="mb-8 font-serif text-2xl text-navy-text">Done</h2>

			<div className="mb-10 space-y-6">
				<div>
					<p className="font-serif text-4xl text-foreground tabular-nums">
						{correct} <span className="text-stone-300">/</span> {total}
					</p>
					<p className="mt-1 text-sm text-muted-foreground">
						{accuracy}% correct · {(avgTime / 1000).toFixed(1)}s avg
					</p>
				</div>
			</div>

			{mistakes.length > 0 && (
				<div className="mb-10">
					<p className="mb-3 text-center text-sm text-stone-600 italic">
						These caught you — that's where lasting learning happens.
					</p>
					<div className="space-y-2">
						{mistakes.map(({ attempt: a, count }) => {
							const fullGreek = a.form.acceptAlso;
							return (
								<div key={a.form.id} className="rounded-lg border bg-white p-3">
									{fullGreek ? (
										<div className="space-y-0.5">
											<div className="flex items-baseline gap-2">
												<span lang="el" className="greek-text text-lg text-foreground">
													{fullGreek}
												</span>
												<span className="font-mono text-xs text-muted-foreground">
													/{greekToPhonetic(fullGreek)}/
												</span>
											</div>
											<div className="flex items-baseline gap-2">
												<span className="text-xs tracking-widest text-muted-foreground uppercase">
													ending
												</span>
												<span lang="el" className="greek-text text-sm text-foreground">
													{a.form.greek}
												</span>
												<span className="font-mono text-xs text-muted-foreground">
													/{a.form.greeklish}/
												</span>
											</div>
										</div>
									) : (
										<div className="flex items-baseline gap-2">
											<span lang="el" className="greek-text text-lg text-foreground">
												{a.form.greek}
											</span>
											<span className="font-mono text-xs text-muted-foreground">
												/{a.form.greeklish}/
											</span>
											<span className="text-xs text-muted-foreground">{a.form.label}</span>
										</div>
									)}
									{a.userInput !== undefined && (
										<p className="mt-1 text-xs text-muted-foreground">
											you typed:{" "}
											<span className="font-mono text-incorrect">
												{a.userInput.trim() === "" ? "—" : a.userInput}
											</span>
											{count > 1 && (
												<span className="ml-2 rounded bg-incorrect/10 px-1.5 py-0.5 text-incorrect">
													×{count}
												</span>
											)}
										</p>
									)}
								</div>
							);
						})}
					</div>
				</div>
			)}

			<div className="mb-3 space-y-2">
				{onRetryMistakes && allMistakes.length > 0 && (
					<Button onClick={() => onRetryMistakes(allMistakes)} variant="outline" className="w-full">
						Drill mistakes ({allMistakes.length})
					</Button>
				)}
				<Button onClick={onAgain} className="w-full">
					Practice again
				</Button>
			</div>

			<div className="text-center">
				<Link to=".." className="text-xs text-stone-500 underline hover:text-stone-700">
					← back
				</Link>
			</div>
		</div>
	);
};

export const useAutoAdvance = <T extends DrillForm>({
	phase,
	lastAttempt,
	cardIndex,
	sessionSize,
	mode,
	setPhase,
	setCardIndex,
	setInput,
	inputValueRef,
	inputRef,
}: {
	phase: Phase;
	lastAttempt: Attempt<T> | null;
	cardIndex: number;
	sessionSize: SessionSize;
	mode: DrillMode;
	setPhase: (p: Phase) => void;
	setCardIndex: (i: number) => void;
	setInput: (s: string) => void;
	inputValueRef: React.MutableRefObject<string>;
	inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
	const advance = useCallback(() => {
		const next = cardIndex + 1;
		if (next >= sessionSize) {
			setPhase("complete");
			return;
		}
		setCardIndex(next);
		setInput("");
		inputValueRef.current = "";
		setPhase("active");
		if (mode === "forward") {
			setTimeout(() => inputRef.current?.focus(), 30);
		}
	}, [cardIndex, sessionSize, setPhase, setCardIndex, setInput, inputValueRef, mode, inputRef]);

	useEffect(() => {
		if (phase !== "feedback") return;
		// Auto-advance only on correct. Wrong answer waits for user (Enter/Space/tap)
		// so the learner can read the correct form.
		if (!lastAttempt?.isCorrect) return;
		const t = setTimeout(advance, 1200);
		return () => clearTimeout(t);
	}, [phase, lastAttempt, advance]);

	useEffect(() => {
		if (phase !== "feedback") return;
		if (lastAttempt?.isCorrect) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				advance();
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [phase, lastAttempt, advance]);

	return advance;
};

export const useForwardKeyboard = ({
	phase,
	mode,
	onSubmit,
}: {
	phase: Phase;
	mode: DrillMode;
	onSubmit: () => void;
}) => {
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Enter" && phase === "active" && mode === "forward") {
				onSubmit();
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [phase, mode, onSubmit]);
};

export const useFocusOnActive = ({
	phase,
	mode,
	inputRef,
}: {
	phase: Phase;
	mode: DrillMode;
	inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
	useEffect(() => {
		if (phase === "active" && mode === "forward") {
			inputRef.current?.focus();
		}
	}, [phase, mode, inputRef]);
};

export const ForwardInput = ({
	input,
	setInput,
	inputValueRef,
	inputRef,
	phase,
}: {
	input: string;
	setInput: (s: string) => void;
	inputValueRef: React.MutableRefObject<string>;
	inputRef: React.RefObject<HTMLInputElement | null>;
	phase: Phase;
}) => (
	<div>
		<input
			ref={inputRef}
			type="text"
			value={input}
			onChange={(e) => {
				setInput(e.target.value);
				inputValueRef.current = e.target.value;
			}}
			disabled={phase !== "active"}
			placeholder="greeklish..."
			autoComplete="off"
			autoCorrect="off"
			autoCapitalize="off"
			spellCheck={false}
			className="w-full border-b-2 border-stone-200 bg-transparent pb-2 text-3xl text-foreground caret-terracotta transition-colors outline-none placeholder:text-stone-300 focus:border-terracotta disabled:opacity-50"
		/>

		{phase === "active" && <p className="mt-2 text-xs text-stone-400">enter to check</p>}
	</div>
);

export const FeedbackDisplay = <T extends DrillForm>({
	lastAttempt,
	onContinue,
}: {
	lastAttempt: Attempt<T>;
	onContinue?: () => void;
}) => {
	const { form } = lastAttempt;
	const fullForm = form.acceptAlso;
	const showContinue = !lastAttempt.isCorrect && onContinue;
	const inner = (
		<>
			<p
				className={`text-sm font-medium ${lastAttempt.isCorrect ? "text-correct" : "text-incorrect"}`}
			>
				{lastAttempt.isCorrect ? "Correct" : lastAttempt.timedOut ? "Time's up" : "Incorrect"}
			</p>
			{fullForm && (
				<div className="mt-1 flex items-baseline gap-2">
					<span lang="el" className="greek-text text-2xl text-foreground">
						{fullForm}
					</span>
					<span className="font-sans text-sm text-muted-foreground">
						/{greekToPhonetic(fullForm)}/
					</span>
				</div>
			)}
			<div className={`${fullForm ? "mt-1" : "mt-1"} flex items-baseline gap-2`}>
				<span className="text-xs tracking-widest text-muted-foreground uppercase">
					{fullForm ? "ending" : ""}
				</span>
				<span lang="el" className="greek-text text-2xl text-foreground">
					{form.greek}
				</span>
				<span className="font-sans text-sm text-muted-foreground">/{form.greeklish}/</span>
			</div>
			{showContinue && (
				<p className="mt-3 text-xs text-stone-500">Press Enter or tap to continue</p>
			)}
		</>
	);

	if (showContinue) {
		return (
			<button
				type="button"
				className="mt-5 block w-full cursor-pointer text-left"
				onClick={onContinue}
			>
				{inner}
			</button>
		);
	}
	return <div className="mt-5">{inner}</div>;
};

export const ConfigShell = ({
	title,
	subtitle,
	mode,
	onModeChange,
	sessionSize,
	onSizeChange,
	onStart,
	forwardLabel,
	forwardDesc,
	reverseLabel,
	reverseDesc,
	referenceHref,
	referenceLabel,
	children,
}: {
	forwardDesc: string;
	forwardLabel: string;
	mode: DrillMode;
	reverseDesc: string;
	reverseLabel: string;
	sessionSize: SessionSize;
	subtitle: string;
	title: string;
	onModeChange: (m: DrillMode) => void;
	onSizeChange: (s: SessionSize) => void;
	onStart: () => void;
	referenceHref?: string;
	referenceLabel?: string;
	children: React.ReactNode;
}) => {
	return (
		<div className="mx-auto max-w-sm px-6 py-8">
			<Link to=".." className="mb-6 inline-block text-xs text-stone-400 hover:text-stone-600">
				← back
			</Link>
			<h2 className="mb-1 font-serif text-2xl text-navy-text">{title}</h2>
			<p className="mb-2 text-sm text-muted-foreground">{subtitle}</p>
			{referenceHref && (
				<a
					href={referenceHref}
					className="mb-6 inline-block text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
				>
					{referenceLabel ?? "Reference →"}
				</a>
			)}
			{!referenceHref && <div className="mb-4" />}

			{children}

			<fieldset className="mb-8">
				<legend className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
					Mode
				</legend>
				<div className="space-y-2">
					<button
						type="button"
						onClick={() => onModeChange("forward")}
						className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
							mode === "forward"
								? "border-terracotta bg-terracotta-50 text-terracotta-text"
								: "border-border text-foreground hover:border-stone-400"
						}`}
					>
						<span className="block text-sm font-medium">{forwardLabel}</span>
						<span className="text-xs text-muted-foreground">{forwardDesc}</span>
					</button>
					<button
						type="button"
						onClick={() => onModeChange("reverse")}
						className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
							mode === "reverse"
								? "border-terracotta bg-terracotta-50 text-terracotta-text"
								: "border-border text-foreground hover:border-stone-400"
						}`}
					>
						<span className="block text-sm font-medium">{reverseLabel}</span>
						<span className="text-xs text-muted-foreground">{reverseDesc}</span>
					</button>
				</div>
			</fieldset>

			<fieldset className="mb-8">
				<legend className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
					Cards
				</legend>
				<div className="flex gap-2">
					{SESSION_SIZES.map((s) => (
						<button
							key={s}
							type="button"
							onClick={() => onSizeChange(s)}
							className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
								sessionSize === s
									? "border-terracotta bg-terracotta-50 text-terracotta-text"
									: "border-border text-foreground hover:border-stone-400"
							}`}
						>
							{s}
						</button>
					))}
				</div>
			</fieldset>

			<Button
				onClick={onStart}
				className="w-full bg-terracotta text-cream hover:bg-terracotta-dark"
			>
				Begin
			</Button>
		</div>
	);
};

export const DrillShell = ({
	progress,
	barColor,
	cardIndex,
	sessionSize,
	children,
}: {
	progress: number;
	barColor: string;
	cardIndex: number;
	sessionSize: SessionSize;
	children: React.ReactNode;
}) => {
	return (
		<div className="flex flex-col">
			<div className="h-1 overflow-hidden bg-stone-200">
				<div
					className={`h-full transition-colors duration-200 ${barColor}`}
					style={{ width: `${progress * 100}%` }}
				/>
			</div>

			<div className="flex items-center justify-between px-4 pt-2">
				<Link to=".." className="text-xs text-stone-300 hover:text-stone-500">
					←
				</Link>
				<span className="text-xs text-stone-400 tabular-nums">
					{cardIndex + 1}
					<span className="mx-0.5 text-stone-300">/</span>
					{sessionSize}
				</span>
			</div>

			<div className="mx-auto flex max-w-sm flex-col gap-10 px-6 pt-4 pb-6">{children}</div>
		</div>
	);
};

export const ReverseFeedback = <T extends DrillForm>({
	lastAttempt,
	onContinue,
}: {
	lastAttempt: Attempt<T>;
	onContinue?: () => void;
}) => {
	const showContinue = !lastAttempt.isCorrect && onContinue;
	const inner = (
		<>
			<p
				className={`text-sm font-medium ${lastAttempt.isCorrect ? "text-correct" : "text-incorrect"}`}
			>
				{lastAttempt.isCorrect ? "Correct" : lastAttempt.timedOut ? "Time's up" : "Incorrect"}
			</p>
			{!lastAttempt.isCorrect && (
				<p className="mt-1 text-sm text-muted-foreground">{lastAttempt.form.label}</p>
			)}
			{showContinue && (
				<p className="mt-3 text-xs text-stone-500">Press Enter or tap to continue</p>
			)}
		</>
	);

	if (showContinue) {
		return (
			<button
				type="button"
				className="block w-full cursor-pointer pt-4 text-left"
				onClick={onContinue}
			>
				{inner}
			</button>
		);
	}
	return <div className="pt-4">{inner}</div>;
};
