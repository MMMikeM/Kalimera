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
		phase === "transform" || phase === "success"
			? GREEK
			: GREEKLISH.slice(0, typedChars);

	const showCursor = phase === "typing";
	const showSuccess = phase === "success";
	const isTransforming = phase === "transform";

	return (
		<div className="w-full max-w-sm mx-auto">
			<div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
				{/* Prompt */}
				<div className="px-4 py-3 bg-stone-50 border-b border-stone-200">
					<p className="text-sm text-stone-500">Translate:</p>
					<p className="text-lg text-stone-800 font-medium">"good morning"</p>
				</div>

				{/* Input area */}
				<div className="p-4">
					<div className="relative">
						{/* Input display */}
						<div
							className={`
                min-h-[48px] px-4 py-3 rounded-lg border-2 font-mono text-lg
                flex items-center
                ${showSuccess ? "border-olive-400 bg-olive-50" : "border-stone-200 bg-white"}
                transition-colors duration-200
              `}
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
									className="text-ocean-500 ml-0.5"
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
									className="absolute right-3 top-1/2 -translate-y-1/2"
								>
									<div className="w-6 h-6 rounded-full bg-olive-500 flex items-center justify-center">
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
							className="text-xs text-center mt-3"
						>
							{showSuccess ? (
								<span className="text-olive-600">
									<span className="font-mono">kalimera</span>
									<span className="mx-1.5">→</span>
									<span className="font-mono">καλημέρα</span>
								</span>
							) : (
								<span className="text-stone-400">
									Type with English letters
								</span>
							)}
						</motion.p>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};
