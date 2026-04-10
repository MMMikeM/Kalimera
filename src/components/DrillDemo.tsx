import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const GREEKLISH = "kalimera";
const GREEK = "καλημέρα";
const TYPING_DELAY = 120;
const PAUSE_BEFORE_TRANSFORM = 400;
const TRANSFORM_DURATION = 400;
const SUCCESS_DURATION = 1500;
const RESET_PAUSE = 500;

type Phase = "typing" | "pause" | "transform" | "success" | "reset";

export const DrillDemo = () => {
	const [phase, setPhase] = useState<Phase>("typing");
	const [typedChars, setTypedChars] = useState(0);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;

		switch (phase) {
			case "typing":
				if (typedChars < GREEKLISH.length) {
					timer = setTimeout(() => setTypedChars((c) => c + 1), TYPING_DELAY);
				} else {
					timer = setTimeout(() => setPhase("pause"), 0);
				}
				break;

			case "pause":
				timer = setTimeout(() => setPhase("transform"), PAUSE_BEFORE_TRANSFORM);
				break;

			case "transform":
				timer = setTimeout(() => setPhase("success"), TRANSFORM_DURATION);
				break;

			case "success":
				timer = setTimeout(() => setPhase("reset"), SUCCESS_DURATION);
				break;

			case "reset":
				setTypedChars(0);
				timer = setTimeout(() => setPhase("typing"), RESET_PAUSE);
				break;
		}

		return () => clearTimeout(timer);
	}, [phase, typedChars]);

	const displayText =
		phase === "transform" || phase === "success" ? GREEK : GREEKLISH.slice(0, typedChars);

	const showCursor = phase === "typing";
	const showSuccess = phase === "success";
	const isTransforming = phase === "transform";

	return (
		<div className="mx-auto w-full max-w-sm">
			<div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
				{/* Prompt */}
				<div className="border-b border-stone-200 bg-stone-50 px-4 py-3">
					<p className="text-sm text-stone-500">Translate:</p>
					<p className="text-lg font-medium text-stone-800">"good morning"</p>
				</div>

				{/* Input area */}
				<div className="p-4">
					<div className="relative">
						{/* Input display */}
						<div
							className={`flex min-h-[48px] items-center rounded-lg border-2 px-4 py-3 font-mono text-lg ${showSuccess ? "border-olive-400 bg-olive-50" : "border-stone-200 bg-white"} transition-colors duration-200`}
						>
							<AnimatePresence mode="wait">
								<motion.span
									key={isTransforming ? "greek" : "greeklish"}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
									className={showSuccess ? "text-olive-700" : "text-stone-800"}
								>
									{displayText}
								</motion.span>
							</AnimatePresence>

							{/* Blinking cursor */}
							{showCursor && (
								<motion.span
									animate={{ opacity: [1, 0] }}
									transition={{
										repeat: Infinity,
										duration: 0.8,
										times: [0, 0.5],
										repeatType: "reverse",
									}}
									className="ml-0.5 text-ocean-500"
								>
									|
								</motion.span>
							)}
						</div>

						{/* Success indicator */}
						<AnimatePresence>
							{showSuccess && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									className="absolute top-1/2 right-3 -translate-y-1/2"
								>
									<div className="flex h-6 w-6 items-center justify-center rounded-full bg-olive-500">
										<Check className="text-white" size={14} />
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Helper text - dynamic based on phase */}
					<AnimatePresence mode="wait">
						<motion.p
							key={showSuccess ? "interpreted" : "hint"}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15 }}
							className="mt-3 text-center text-xs"
						>
							{showSuccess ? (
								<span className="text-olive-600">
									<span className="font-mono">kalimera</span>
									<span className="mx-1.5">→</span>
									<span className="font-mono">καλημέρα</span>
								</span>
							) : (
								<span className="text-stone-400">Type with English letters</span>
							)}
						</motion.p>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};
