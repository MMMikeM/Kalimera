import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { greekToPhonetic } from "@/lib/greek-transliteration";

import { SESSION_SIZES } from "./deck";
import { useDrillStore } from "./drill-provider";

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
		className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-40 ${
			selected
				? `${selectedBg} ${selectedText} border-transparent`
				: "border-border bg-transparent text-foreground hover:border-stone-400"
		}`}
	>
		{label}
	</button>
);

// ─── ConfigShell ───────────────────────────────────────────────────────────────

export const ConfigShell = ({
	title,
	subtitle,
	forwardLabel = "English → Greek",
	forwardDesc,
	reverseLabel = "Greek → English",
	reverseDesc,
	referenceHref,
	referenceLabel,
	backTo,
	categories,
	selectorBg,
	selectorText,
	children,
}: {
	title: string;
	subtitle: string;
	forwardLabel?: string;
	forwardDesc: string;
	reverseLabel?: string;
	reverseDesc: string;
	referenceHref?: string;
	referenceLabel?: string;
	backTo?: string;
	categories?: Array<{ id: string; label: string }>;
	selectorBg: string;
	selectorText: string;
	children?: React.ReactNode;
}) => {
	const mode = useDrillStore((s) => s.mode);
	const sessionSize = useDrillStore((s) => s.sessionSize);
	const activeSpeedId = useDrillStore((s) => s.activeSpeedId);
	const speeds = useDrillStore((s) => s.speeds);
	const activeCategory = useDrillStore((s) => s.activeCategory);
	const setMode = useDrillStore((s) => s.setMode);
	const setSessionSize = useDrillStore((s) => s.setSessionSize);
	const setActiveSpeedId = useDrillStore((s) => s.setActiveSpeedId);
	const setActiveCategory = useDrillStore((s) => s.setActiveCategory);
	const startDrill = useDrillStore((s) => s.startDrill);

	return (
		<div className="mx-auto max-w-sm px-6 py-8">
			<Link
				to={backTo ?? ".."}
				className="mb-6 inline-block text-xs text-stone-400 hover:text-stone-600"
			>
				← back
			</Link>
			<h2 className="mb-1 font-serif text-2xl text-navy-text">{title}</h2>
			<p className="mb-2 text-sm text-muted-foreground">{subtitle}</p>
			{referenceHref ? (
				<a
					href={referenceHref}
					className="mb-6 inline-block text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
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
					{speeds.map((spd) => (
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

			<Button
				onClick={startDrill}
				className="w-full bg-terracotta text-cream hover:bg-terracotta-dark"
			>
				Begin
			</Button>
		</div>
	);
};

// ─── DrillShell ────────────────────────────────────────────────────────────────

export const DrillShell = ({
	progress,
	barColor,
	backTo,
	children,
}: {
	progress: number;
	barColor: string;
	backTo?: string;
	children: React.ReactNode;
}) => {
	const cardIndex = useDrillStore((s) => s.cardIndex);
	const sessionSize = useDrillStore((s) => s.sessionSize);

	return (
		<div className="flex flex-col">
			<div className="h-1 overflow-hidden bg-stone-200">
				<div
					className={`h-full transition-colors duration-200 ${barColor}`}
					style={{ width: `${progress * 100}%` }}
				/>
			</div>
			<div className="flex items-center justify-between px-4 pt-2">
				<Link to={backTo ?? ".."} className="text-xs text-stone-300 hover:text-stone-500">
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

// ─── ForwardInput ──────────────────────────────────────────────────────────────

export const ForwardInput = ({
	inputRef,
}: {
	inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
	const input = useDrillStore((s) => s.input);
	const setInput = useDrillStore((s) => s.setInput);
	const phase = useDrillStore((s) => s.phase);

	return (
		<div>
			<input
				ref={inputRef}
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
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
};

// ─── FeedbackDisplay ───────────────────────────────────────────────────────────

export const FeedbackDisplay = () => {
	const lastAttempt = useDrillStore((s) => s.lastAttempt);
	const advance = useDrillStore((s) => s.advance);
	const phase = useDrillStore((s) => s.phase);

	if (phase !== "feedback" || !lastAttempt) return null;

	const { form } = lastAttempt;
	const fullForm = form.acceptAlso;
	const showContinue = !lastAttempt.isCorrect;

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
			<div className="mt-1 flex items-baseline gap-2">
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
				onClick={advance}
			>
				{inner}
			</button>
		);
	}
	return <div className="mt-5">{inner}</div>;
};

// ─── ReverseFeedback ───────────────────────────────────────────────────────────

export const ReverseFeedback = () => {
	const lastAttempt = useDrillStore((s) => s.lastAttempt);
	const advance = useDrillStore((s) => s.advance);
	const phase = useDrillStore((s) => s.phase);

	if (phase !== "feedback" || !lastAttempt) return null;

	const showContinue = !lastAttempt.isCorrect;

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
				onClick={advance}
			>
				{inner}
			</button>
		);
	}
	return <div className="pt-4">{inner}</div>;
};

// ─── SummaryScreen ─────────────────────────────────────────────────────────────

export const SummaryScreen = () => {
	const attempts = useDrillStore((s) => s.attempts);
	const sessionSize = useDrillStore((s) => s.sessionSize);
	const resetToConfig = useDrillStore((s) => s.resetToConfig);
	const retryMistakes = useDrillStore((s) => s.retryMistakes);

	const correct = attempts.filter((a) => a.isCorrect).length;
	const avgTime = attempts.reduce((s, a) => s + a.timeTaken, 0) / attempts.length;
	const accuracy = Math.round((correct / sessionSize) * 100);

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
		<div className="mx-auto max-w-xs px-6 py-8">
			<h2 className="mb-8 font-serif text-2xl text-navy-text">Done</h2>
			<div className="mb-10 space-y-6">
				<div>
					<p className="font-serif text-4xl text-foreground tabular-nums">
						{correct} <span className="text-stone-300">/</span> {sessionSize}
					</p>
					<p className="mt-1 text-sm text-muted-foreground">
						{accuracy}% correct · {(avgTime / 1000).toFixed(1)}s avg
					</p>
				</div>
			</div>

			{mistakeEntries.length > 0 && (
				<div className="mb-10">
					<p className="mb-3 text-center text-sm text-stone-600 italic">
						These caught you — that's where lasting learning happens.
					</p>
					<div className="space-y-2">
						{mistakeEntries.map(({ attempt: a, count }) => {
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
				{allMistakes.length > 0 && (
					<Button onClick={() => retryMistakes(allMistakes)} variant="outline" className="w-full">
						Drill mistakes ({allMistakes.length})
					</Button>
				)}
				<Button onClick={resetToConfig} className="w-full">
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
