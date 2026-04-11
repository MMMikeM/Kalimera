import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export type DrillMode = "forward" | "reverse";
export type Phase = "config" | "active" | "feedback" | "complete";

export const SESSION_SIZES = [10, 20, 30] as const;
export type SessionSize = (typeof SESSION_SIZES)[number];

export interface DrillForm {
	id: string;
	greek: string;
	greeklish: string;
	label: string;
}

export interface Attempt<T extends DrillForm> {
	form: T;
	isCorrect: boolean;
	timeTaken: number;
	timedOut: boolean;
}

export const shuffle = <T,>(arr: T[]): T[] => {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const tmp = a[i] as T;
		a[i] = a[j] as T;
		a[j] = tmp;
	}
	return a;
};

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
	onTimeoutRef.current = onTimeout;

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
}: {
	attempts: Attempt<T>[];
	total: number;
	onAgain: () => void;
}) => {
	const correct = attempts.filter((a) => a.isCorrect).length;
	const avgTime = attempts.reduce((s, a) => s + a.timeTaken, 0) / attempts.length;

	const slowestByForm = new Map<string, Attempt<T>>();
	for (const a of attempts) {
		const existing = slowestByForm.get(a.form.id);
		if (!existing || a.timeTaken > existing.timeTaken) slowestByForm.set(a.form.id, a);
	}
	const slowest = [...slowestByForm.values()].sort((a, b) => b.timeTaken - a.timeTaken).slice(0, 3);

	return (
		<div className="max-w-xs px-6 py-8">
			<h2 className="mb-8 font-serif text-2xl text-navy-text">Done</h2>

			<div className="mb-10 space-y-6">
				<div>
					<p className="font-serif text-4xl text-foreground tabular-nums">
						{correct} <span className="text-stone-300">/</span> {total}
					</p>
					<p className="mt-1 text-sm text-muted-foreground">
						{Math.round((correct / total) * 100)}% correct
					</p>
				</div>
				<div>
					<p className="font-serif text-3xl text-foreground tabular-nums">
						{(avgTime / 1000).toFixed(1)}s
					</p>
					<p className="mt-1 text-sm text-muted-foreground">average response</p>
				</div>
			</div>

			{slowest.length > 0 && (
				<div className="mb-10">
					<p className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">Worth revisiting</p>
					<div className="space-y-3">
						{slowest.map((a) => (
							<div key={a.form.id} className="flex items-baseline gap-3">
								<span lang="el" className="greek-text w-10 text-xl text-foreground">
									{a.form.greek}
								</span>
								<span className="text-xs text-muted-foreground">{a.form.label}</span>
							</div>
						))}
					</div>
				</div>
			)}

			<div className="mb-4">
				<Button variant="outline" onClick={onAgain} className="w-full">
					Go again
				</Button>
			</div>

			<div className="text-center">
				<Link to=".." className="text-xs text-stone-500 hover:text-stone-700 underline">
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
	resetSelectors,
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
	resetSelectors: () => void;
	inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
	useEffect(() => {
		if (phase !== "feedback") return;
		const delay = lastAttempt?.isCorrect ? 1200 : 2000;
		const t = setTimeout(() => {
			const next = cardIndex + 1;
			if (next >= sessionSize) {
				setPhase("complete");
			} else {
				setCardIndex(next);
				setInput("");
				inputValueRef.current = "";
				resetSelectors();
				setPhase("active");
				if (mode === "forward") {
					setTimeout(() => inputRef.current?.focus(), 30);
				}
			}
		}, delay);
		return () => clearTimeout(t);
	}, [
		phase,
		lastAttempt,
		cardIndex,
		mode,
		sessionSize,
		setPhase,
		setCardIndex,
		setInput,
		inputValueRef,
		resetSelectors,
		inputRef,
	]);
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
}: {
	lastAttempt: Attempt<T>;
}) => (
	<div className="mt-5">
		<p
			className={`text-sm font-medium ${lastAttempt.isCorrect ? "text-correct" : "text-incorrect"}`}
		>
			{lastAttempt.isCorrect ? "Correct" : lastAttempt.timedOut ? "Time's up" : "Incorrect"}
		</p>
		<div className="mt-1 flex items-baseline gap-2">
			<span lang="el" className="greek-text text-2xl text-foreground">
				{lastAttempt.form.greek}
			</span>
			<span className="font-sans text-sm text-muted-foreground">
				/{lastAttempt.form.greeklish}/
			</span>
		</div>
	</div>
);

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
	children,
}: {
	title: string;
	subtitle: string;
	mode: DrillMode;
	onModeChange: (m: DrillMode) => void;
	sessionSize: SessionSize;
	onSizeChange: (s: SessionSize) => void;
	onStart: () => void;
	forwardLabel: string;
	forwardDesc: string;
	reverseLabel: string;
	reverseDesc: string;
	children: React.ReactNode;
}) => (
	<div className="max-w-sm px-6 py-8">
		<h2 className="mb-1 font-serif text-2xl text-navy-text">{title}</h2>
		<p className="mb-6 text-sm text-muted-foreground">{subtitle}</p>

		{children}

		<fieldset className="mb-8">
			<legend className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">Mode</legend>
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

		<Button onClick={onStart} className="w-full bg-terracotta text-cream hover:bg-terracotta-dark">
			Begin
		</Button>
	</div>
);

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
}) => (
	<div className="flex flex-col">
		<div className="h-1 overflow-hidden bg-stone-200">
			<div
				className={`h-full transition-colors duration-200 ${barColor}`}
				style={{ width: `${progress * 100}%` }}
			/>
		</div>

		<div className="flex justify-end px-4 pt-2">
			<span className="text-xs text-stone-400 tabular-nums">
				{cardIndex + 1}
				<span className="mx-0.5 text-stone-300">/</span>
				{sessionSize}
			</span>
		</div>

		<div className="flex max-w-sm flex-col gap-10 px-6 pt-4 pb-6">{children}</div>
	</div>
);

export const ReverseFeedback = <T extends DrillForm>({
	lastAttempt,
}: {
	lastAttempt: Attempt<T>;
}) => (
	<div className="pt-4">
		<p
			className={`text-sm font-medium ${lastAttempt.isCorrect ? "text-correct" : "text-incorrect"}`}
		>
			{lastAttempt.isCorrect ? "Correct" : lastAttempt.timedOut ? "Time's up" : "Incorrect"}
		</p>
		{!lastAttempt.isCorrect && (
			<p className="mt-1 text-sm text-muted-foreground">{lastAttempt.form.label}</p>
		)}
	</div>
);
