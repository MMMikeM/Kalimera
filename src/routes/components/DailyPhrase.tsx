import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { today } from "@/lib/time";

const DAILY_PHRASES = [
	{
		greek: "Καλημέρα",
		english: "Good morning",
		literal: "Beautiful day",
		grammar:
			"Καλή (beautiful) + ημέρα (day). Greek combines adjective + noun into one word for common greetings.",
	},
	{
		greek: "Τι κάνεις;",
		english: "How are you?",
		literal: "What do you do?",
		grammar:
			"Τι (what) + κάνεις (you do, 2nd person singular). The -εις ending marks informal 'you'.",
	},
	{
		greek: "Ευχαριστώ πολύ",
		english: "Thank you very much",
		literal: "I thank much",
		grammar:
			"Ευχαριστώ (I thank, 1st person) + πολύ (much/very). The -ώ ending marks 1st person singular.",
	},
	{
		greek: "Με λένε...",
		english: "My name is...",
		literal: "They call me...",
		grammar:
			"Με (me, accusative) + λένε (they call, 3rd person plural). Greek uses 'they call me' instead of 'my name is'.",
	},
	{
		greek: "Χαίρω πολύ",
		english: "Nice to meet you",
		literal: "I rejoice much",
		grammar:
			"Χαίρω (I rejoice, 1st person) + πολύ (much). A formal greeting expressing pleasure at meeting someone.",
	},
];

export const DailyPhrase = () => {
	const [revealed, setRevealed] = useState(false);
	const [showGrammar, setShowGrammar] = useState(false);

	const dayIndex = today().day % DAILY_PHRASES.length;
	const phrase = DAILY_PHRASES[dayIndex] ?? DAILY_PHRASES[0];

	return (
		<div className="rounded-2xl border border-stone-200 bg-white p-5">
			<p className="mb-4 text-xs tracking-widest text-stone-400 uppercase">Today's Phrase</p>

			<p className="mb-4 text-lg text-stone-700">"{phrase?.english}"</p>

			<button
				type="button"
				onClick={() => setRevealed(true)}
				disabled={revealed}
				className={`w-full rounded-xl p-4 transition-all ${
					!revealed
						? "cursor-pointer border-2 border-dashed border-terracotta-300 bg-terracotta-50 hover:bg-terracotta-100"
						: "border border-stone-200 bg-stone-50"
				}`}
			>
				{!revealed ? (
					<p className="font-medium text-terracotta">Tap to reveal Greek</p>
				) : (
					<div>
						<p className="greek-text font-serif text-2xl text-navy">{phrase?.greek}</p>
						<p className="mt-1 text-sm text-stone-500 italic">lit. "{phrase?.literal}"</p>
					</div>
				)}
			</button>

			{revealed && (
				<button
					type="button"
					onClick={() => setShowGrammar(!showGrammar)}
					className="mt-3 flex items-center gap-1 text-sm text-ocean transition-colors hover:text-ocean-dark"
				>
					Why this works
					{showGrammar ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
				</button>
			)}

			{showGrammar && (
				<div className="mt-3 rounded-lg border border-ocean-200 bg-ocean-50 p-3">
					<p className="text-sm text-ocean-text">{phrase?.grammar}</p>
				</div>
			)}
		</div>
	);
};
