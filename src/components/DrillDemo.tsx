import { Card } from "@/components/Card";

export const DrillDemo = () => (
	<Card
		variant="bordered"
		padding="none"
		className="max-w-sm mx-auto overflow-hidden border-stone-300"
	>
		{/* Header with timer */}
		<div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-stone-50/50">
			<span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
				Production Drill
			</span>
			<div className="drill-demo-timer flex items-center gap-1.5">
				<svg
					className="w-4 h-4"
					viewBox="0 0 24 24"
					fill="none"
					aria-hidden="true"
				>
					<circle
						cx="12"
						cy="12"
						r="10"
						className="stroke-stone-200"
						strokeWidth="2"
					/>
					<circle
						cx="12"
						cy="12"
						r="10"
						className="drill-demo-timer-ring stroke-ocean"
						strokeWidth="2"
						strokeLinecap="round"
						strokeDasharray="62.83"
						strokeDashoffset="0"
						transform="rotate(-90 12 12)"
					/>
				</svg>
				<span className="drill-demo-timer-text text-sm font-mono text-ocean tabular-nums">
					3.5s
				</span>
			</div>
		</div>

		{/* Main content */}
		<div className="px-6 py-8 text-center">
			{/* English prompt */}
			<p className="text-stone-600 mb-6">Translate:</p>
			<p className="text-xl text-stone-800 font-medium mb-8">"good morning"</p>

			{/* Input field mockup */}
			<div className="relative">
				<div className="drill-demo-input h-14 px-4 rounded-lg border-2 border-stone-300 bg-white flex items-center justify-center text-xl font-mono text-stone-800">
					<span className="drill-demo-answer">καλημέρα</span>
					<span className="drill-demo-cursor">|</span>
				</div>
			</div>
		</div>

		{/* Success state */}
		<div className="drill-demo-success px-6 py-4 bg-olive-100 border-t border-olive-200">
			<div className="flex items-center justify-center gap-2">
				<svg
					className="w-5 h-5 text-olive-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M5 13l4 4L19 7"
					/>
				</svg>
				<span className="text-olive-text font-medium">Correct!</span>
				<span className="text-olive-600 text-sm ml-2">2.1s</span>
			</div>
		</div>
	</Card>
);
