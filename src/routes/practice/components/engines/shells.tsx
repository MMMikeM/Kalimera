import type React from "react";
import { useEffect, useRef } from "react";

import { BackLink } from "@/components/BackLink";
import { GreekGloss } from "@/components/GreekGloss";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import { Verdict } from "@/components/Verdict";

import { SPEEDS } from "../drill-speeds";
import { SESSION_SIZES } from "./deck";
import { drillActions, useDrillStore } from "./drill-store";

// ─── SelectorButton ────────────────────────────────────────────────────────────

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
}) => (
	<button
		type="button"
		onClick={onClick}
		disabled={disabled}
		aria-pressed={selected}
		// The picked answer stays at full strength during feedback: opacity on a -text token breaks AAA.
		className={`min-h-11 rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-default ${
			selected
				? `${selectedBg} ${selectedText} border-transparent`
				: "border-border bg-transparent text-foreground hover:border-stone-400 disabled:opacity-40"
		}`}
	>
		{label}
	</button>
);

// ─── ConfigShell ───────────────────────────────────────────────────────────────

export interface ConfigShellProps {
	title: string;
	subtitle: string;
	forwardLabel?: string;
	forwardDesc?: string;
	reverseLabel?: string;
	reverseDesc?: string;
	/** Hides the mode selector for drills whose construct cannot be tested in reverse. */
	forwardOnly?: boolean;
	referenceHref?: string;
	referenceLabel?: string;
	backTo?: string;
	categories?: Array<{ id: string; label: string }>;
	selectorBg: string;
	selectorText: string;
	children: React.ReactNode;
}

export const ConfigShell = ({
	title,
	subtitle,
	forwardLabel = "English → Greek",
	forwardDesc = "English meaning → Greek form",
	reverseLabel = "Greek → English",
	reverseDesc = "Greek form → recall meaning",
	forwardOnly,
	referenceHref,
	referenceLabel,
	backTo,
	categories,
	selectorBg,
	selectorText,
	children,
}: ConfigShellProps) => {
	const mode = useDrillStore((s) => s.mode);
	const sessionSize = useDrillStore((s) => s.sessionSize);
	const activeSpeedId = useDrillStore((s) => s.activeSpeedId);

	const activeCategory = useDrillStore((s) => s.activeCategory);
	const { setMode, setSessionSize, setActiveSpeedId, setActiveCategory, startDrill } = drillActions;

	return (
		<div className="mx-auto max-w-sm px-6 py-8">
			<BackLink to={backTo ?? ".."} className="mb-4">
				Back
			</BackLink>
			<h2 className="mb-1 font-serif text-2xl text-navy-text">{title}</h2>
			<p className="mb-2 text-sm text-muted-foreground">{subtitle}</p>
			{referenceHref ? (
				<a
					href={referenceHref}
					className="mb-6 inline-flex min-h-11 items-center text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
				>
					{referenceLabel ?? "Reference →"}
				</a>
			) : (
				<div className="mb-4" />
			)}

			{children}

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
							selectedBg={selectorBg}
							selectedText={selectorText}
						/>
						{categories.map((cat) => (
							<SelectorButton
								key={cat.id}
								label={cat.label}
								selected={activeCategory === cat.id}
								disabled={false}
								onClick={() => setActiveCategory(cat.id)}
								selectedBg={selectorBg}
								selectedText={selectorText}
							/>
						))}
					</div>
				</fieldset>
			)}

			{!forwardOnly && (
				<fieldset className="mb-8">
					<legend className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
						Mode
					</legend>
					<div className="space-y-2">
						<button
							type="button"
							onClick={() => setMode("forward")}
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
							onClick={() => setMode("reverse")}
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
			)}

			<fieldset className="mb-8">
				<legend className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
					Cards
				</legend>
				<div className="flex gap-2">
					{SESSION_SIZES.map((s) => (
						<button
							key={s}
							type="button"
							onClick={() => setSessionSize(s)}
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

			<fieldset className="mb-8">
				<legend className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
					Speed
				</legend>
				<div className="flex flex-wrap gap-2">
					{SPEEDS.map((spd) => (
						<SelectorButton
							key={spd.id}
							label={spd.label}
							selected={activeSpeedId === spd.id}
							disabled={false}
							onClick={() => setActiveSpeedId(spd.id)}
							selectedBg={selectorBg}
							selectedText={selectorText}
						/>
					))}
				</div>
			</fieldset>

			<Button onClick={startDrill} className="w-full">
				Begin
			</Button>
		</div>
	);
};

// ─── DrillShell ────────────────────────────────────────────────────────────────

export const DrillShell = ({
	title,
	progress,
	barColor,
	backTo,
	children,
}: {
	title: string;
	progress: number;
	barColor: string;
	backTo?: string;
	children: React.ReactNode;
}) => {
	const cardIndex = useDrillStore((s) => s.cardIndex);
	const sessionSize = useDrillStore((s) => s.sessionSize);
	const deck = useDrillStore((s) => s.deck);
	const remediationCounts = useDrillStore((s) => s.remediationCounts);
	// Scheduling state is for the account holder watching their own SRS, not for a visitor on /try.
	const showScheduling = useDrillStore((s) => s.userId > 0);

	const currentForm = deck[cardIndex];
	const remCount = currentForm ? (remediationCounts[currentForm.id] ?? 0) : 0;

	return (
		<div className="flex flex-col">
			<div className="mx-auto w-full max-w-sm px-6" aria-hidden="true">
				<div className="h-1 overflow-hidden rounded-full bg-stone-200">
					<div
						className={`h-full transition-colors duration-200 ${barColor}`}
						style={{ width: `${progress * 100}%` }}
					/>
				</div>
			</div>
			<div className="mx-auto flex w-full max-w-sm items-center justify-between gap-4 px-6">
				<BackLink to={backTo ?? ".."}>Exit</BackLink>
				<h1 className="min-w-0 truncate text-sm text-muted-foreground">{title}</h1>
				<span className="shrink-0 text-sm text-muted-foreground tabular-nums">
					<span className="sr-only">Card </span>
					{cardIndex + 1} of {sessionSize}
				</span>
			</div>
			{showScheduling && currentForm && (
				<div className="mx-auto flex w-full max-w-sm gap-2 px-6">
					{currentForm.bucket && (
						<span className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-xs text-stone-600">
							{currentForm.bucket}
						</span>
					)}
					{remCount > 0 && (
						<span className="rounded bg-honey-100 px-1.5 py-0.5 font-mono text-xs text-honey-text">
							remediation ×{remCount}
						</span>
					)}
				</div>
			)}
			<div className="mx-auto flex max-w-sm flex-col gap-10 px-6 pt-4 pb-6">{children}</div>
		</div>
	);
};

// ─── ForwardInput ──────────────────────────────────────────────────────────────

export const ForwardInput = ({
	inputRef,
	onSubmit,
}: {
	inputRef: React.RefObject<HTMLInputElement | null>;
	onSubmit: () => void;
}) => {
	const input = useDrillStore((s) => s.input);
	const phase = useDrillStore((s) => s.phase);
	const { setInput } = drillActions;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit();
			}}
			autoComplete="off"
		>
			<input
				ref={inputRef}
				type="search"
				value={input}
				onChange={(e) => {
					if (phase === "active") setInput(e.target.value);
				}}
				placeholder="greeklish..."
				autoComplete="off"
				autoCorrect="off"
				autoCapitalize="off"
				spellCheck={false}
				aria-label="Your answer, in Latin letters"
				className={`w-full border-b-2 border-stone-200 bg-transparent pb-2 text-3xl text-foreground caret-terracotta transition-colors outline-none placeholder:text-stone-500 focus:border-terracotta [&::-webkit-search-cancel-button]:hidden ${phase !== "active" ? "text-muted-foreground" : ""}`}
			/>
			{phase === "active" && (
				<p className="mt-2 text-xs text-muted-foreground pointer-coarse:hidden">Enter to check</p>
			)}
		</form>
	);
};

// ─── FeedbackDisplay ───────────────────────────────────────────────────────────

const ContinueHint = () => (
	<p className="mt-3 text-xs text-muted-foreground">
		<span className="pointer-coarse:hidden">Press Enter or tap to continue</span>
		<span className="hidden pointer-coarse:inline">Tap to continue</span>
	</p>
);

/**
 * The live region is always mounted so the verdict is announced when it appears.
 * After a wrong answer the whole block is the tap target that moves on.
 */
const FeedbackFrame = ({ className, children }: { className: string; children: React.ReactNode }) => {
	const lastAttempt = useDrillStore((s) => s.attempts.at(-1));
	const phase = useDrillStore((s) => s.phase);

	if (phase !== "feedback" || !lastAttempt) return <div aria-live="polite" />;

	return (
		<div aria-live="polite" className={className}>
			{lastAttempt.isCorrect ? (
				children
			) : (
				<button
					type="button"
					className="block w-full cursor-pointer text-left select-text"
					onPointerDown={(e) => e.preventDefault()}
					onClick={drillActions.advance}
				>
					{children}
					<ContinueHint />
				</button>
			)}
		</div>
	);
};

export const FeedbackDisplay = () => {
	const lastAttempt = useDrillStore((s) => s.attempts.at(-1));
	return (
		<FeedbackFrame className="mt-5">
			{lastAttempt && (
				<>
					<Verdict isCorrect={lastAttempt.isCorrect} timedOut={lastAttempt.timedOut} />
					<GreekGloss greek={lastAttempt.form.greek} size="2xl" className="mt-1" />
				</>
			)}
		</FeedbackFrame>
	);
};

// ─── ReverseFeedback ───────────────────────────────────────────────────────────

export const ReverseFeedback = ({ detail }: { detail?: React.ReactNode }) => {
	const lastAttempt = useDrillStore((s) => s.attempts.at(-1));
	return (
		<FeedbackFrame className="pt-4">
			{lastAttempt && (
				<>
					<Verdict isCorrect={lastAttempt.isCorrect} timedOut={lastAttempt.timedOut} />
					{!lastAttempt.isCorrect && (
						<p className="mt-1 text-sm text-muted-foreground">{lastAttempt.form.label}</p>
					)}
					{!lastAttempt.isCorrect && detail && (
						<div className="mt-2 text-sm text-muted-foreground">{detail}</div>
					)}
				</>
			)}
		</FeedbackFrame>
	);
};

// ─── SummaryScreen ─────────────────────────────────────────────────────────────

export const SummaryScreen = ({
	backTo,
	onRepeat,
	footer,
}: {
	backTo?: string;
	onRepeat: () => void;
	footer?: React.ReactNode;
}) => {
	const attempts = useDrillStore((s) => s.attempts);
	const { retryMistakes } = drillActions;
	const actionsRef = useRef<HTMLDivElement>(null);

	// The answer input that held focus is gone; put the keyboard on the next action.
	useEffect(() => actionsRef.current?.querySelector("button")?.focus(), []);

	const correct = attempts.filter((a) => a.isCorrect).length;
	const total = attempts.length;
	const avgTime = attempts.reduce((s, a) => s + a.timeTaken, 0) / total;
	const accuracy = Math.round((correct / total) * 100);

	const incorrectByForm = new Map<string, { attempt: (typeof attempts)[number]; count: number }>();
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
	const allMistakes = mistakeEntries.map((m) => m.attempt);

	return (
		<div className="mx-auto max-w-sm px-6 py-8">
			<PageHeading title={`${correct} of ${total} correct`} className="mb-10">
				<p className="text-sm text-muted-foreground tabular-nums">
					{accuracy}% · {(avgTime / 1000).toFixed(1)}s average per answer
				</p>
			</PageHeading>

			{mistakeEntries.length > 0 && (
				<section className="mb-10">
					<h2 className="mb-3 text-sm font-medium text-foreground">Missed this round</h2>
					<ul className="space-y-2">
						{mistakeEntries.map(({ attempt: a, count }) => (
							<li key={a.form.id} className="rounded-lg border bg-card p-3">
								<div className="flex flex-wrap items-baseline gap-x-2">
									<GreekGloss greek={a.form.greek} size="lg" />
									<span className="text-xs text-muted-foreground">{a.form.label}</span>
								</div>
								{a.userInput !== undefined && (
									<p className="mt-1 text-xs text-muted-foreground">
										You typed{" "}
										{a.userInput.trim() === "" ? (
											<span className="italic">nothing</span>
										) : (
											<span className="font-mono text-incorrect-text">{a.userInput}</span>
										)}
										{count > 1 && (
											<span className="ml-2 rounded bg-incorrect/10 px-1.5 py-0.5 text-incorrect-text">
												×{count}
											</span>
										)}
									</p>
								)}
							</li>
						))}
					</ul>
				</section>
			)}

			<div ref={actionsRef} className="space-y-2">
				{allMistakes.length > 0 && (
					<Button onClick={() => retryMistakes(allMistakes)} className="w-full">
						Drill the {allMistakes.length} you missed
					</Button>
				)}
				<Button
					onClick={onRepeat}
					variant={allMistakes.length > 0 ? "secondary" : "primary"}
					className="w-full"
				>
					Practice again
				</Button>
			</div>

			{footer}

			<div className="mt-6 text-center">
				<BackLink to={backTo ?? ".."}>Back</BackLink>
			</div>
		</div>
	);
};
