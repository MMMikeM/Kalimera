import { useHydrated } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { GreekGloss } from "@/components/GreekGloss";
import { GreekText } from "@/components/GreekText";
import { Verdict } from "@/components/Verdict";

const PROMPT = "good morning";
const TYPED = "kalimera";
const GREEK = "καλημέρα";
const RUNS = 2;
const TIMING = { keystroke: 120, beforeCheck: 500, hold: 2600, clear: 400 };

type Phase = "typing" | "checked" | "clearing";

/** The drill screen in miniature: the same prompt, answer line and verdict a drill shows. */
export const DrillDemo = () => {
	const prefersReducedMotion = useReducedMotion();
	// The server cannot know the preference, so honouring it on the first client render would mismatch.
	const hydrated = useHydrated();
	const reduceMotion = hydrated && prefersReducedMotion === true;
	const [run, setRun] = useState(1);
	const [phase, setPhase] = useState<Phase>("typing");
	const [typed, setTyped] = useState(0);

	const settled = reduceMotion || (run === RUNS && phase === "checked");

	useEffect(() => {
		if (settled) return;
		const [delay, step]: [number, () => void] =
			phase === "typing"
				? typed < TYPED.length
					? [TIMING.keystroke, () => setTyped((t) => t + 1)]
					: [TIMING.beforeCheck, () => setPhase("checked")]
				: phase === "checked"
					? [TIMING.hold, () => setPhase("clearing")]
					: [
							TIMING.clear,
							() => {
								setTyped(0);
								setRun((r) => r + 1);
								setPhase("typing");
							},
						];
		const timer = setTimeout(step, delay);
		return () => clearTimeout(timer);
	}, [phase, typed, settled]);

	const answer = settled ? TYPED : phase === "clearing" ? "" : TYPED.slice(0, typed);
	const checked = settled || phase === "checked";

	return (
		<figure className="mx-auto w-full max-w-sm">
			<p className="sr-only">
				Example: the prompt “{PROMPT}”, answered by typing {TYPED}, marked correct as{" "}
				<GreekText>{GREEK}</GreekText>.
			</p>
			<div
				aria-hidden="true"
				className="rounded-xl border border-stone-200 bg-card p-5 text-left shadow-sm sm:p-6"
			>
				<p className="text-xl font-medium text-foreground sm:text-2xl">{PROMPT}</p>
				<div className="mt-4 flex min-h-11 items-end border-b-2 border-terracotta pb-2 text-xl text-foreground sm:mt-6 sm:text-2xl">
					{answer}
					{!checked && phase === "typing" && (
						<span className="mb-1 ml-px h-7 w-0.5 bg-terracotta motion-safe:animate-pulse" />
					)}
				</div>
				<div className="mt-4 min-h-16">
					<AnimatePresence>
						{checked && (
							<motion.div
								initial={{ opacity: 0, y: 4 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
							>
								<Verdict isCorrect />
								<GreekGloss greek={GREEK} size="2xl" className="mt-1" />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
			<figcaption className="mt-3 text-center text-sm text-muted-foreground">
				Type what you'd say in Greeklish. It's marked as Greek.
			</figcaption>
		</figure>
	);
};
