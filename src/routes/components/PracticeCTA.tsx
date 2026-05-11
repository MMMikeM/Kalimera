import { Link } from "@tanstack/react-router";
import { Calendar, Play } from "lucide-react";

const QUICK_REVIEW_THRESHOLD = 15;
const QUICK_REVIEW_COUNT = 5;

export const PracticeCTA = ({
	dueCount,
	itemsDueTomorrow,
}: {
	dueCount: number;
	itemsDueTomorrow: number;
}) => {
	const estimatedMinutes = Math.max(1, Math.ceil(dueCount * 0.25));
	const showQuickOption = dueCount > QUICK_REVIEW_THRESHOLD;

	return (
		<div className="space-y-3">
			<Link
				to="/practice"
				className="block rounded-2xl border-2 border-honey-400 bg-linear-to-br from-honey-100 to-honey-200 p-6 shadow-md transition-all hover:scale-101 hover:shadow-lg"
			>
				<div className="flex items-center justify-between">
					<div>
						<p className="text-3xl font-bold text-honey-text">{dueCount} items due</p>
						<p className="mt-1 text-stone-600">~{estimatedMinutes} min</p>
					</div>
					<div className="flex h-14 w-14 items-center justify-center rounded-full bg-honey-400 text-white shadow-sm">
						<Play className="ml-0.5 h-6 w-6" />
					</div>
				</div>
				<div className="mt-4 rounded-xl bg-white/60 py-3 text-center font-semibold text-honey-text">
					Start Practice
				</div>
				{itemsDueTomorrow > 0 && (
					<div className="mt-3 flex items-center justify-center gap-2 text-sm text-stone-500">
						<Calendar className="h-4 w-4" />
						<span>
							Tomorrow: {itemsDueTomorrow} {itemsDueTomorrow === 1 ? "item" : "items"}
						</span>
					</div>
				)}
			</Link>

			{showQuickOption && (
				<Link
					to="/practice"
					className="block rounded-xl border border-stone-200 bg-stone-50 p-4 text-center transition-colors hover:bg-stone-100"
				>
					<span className="text-stone-600">Short on time? </span>
					<span className="font-medium text-stone-800">Just {QUICK_REVIEW_COUNT} items</span>
					<span className="text-stone-500"> (~1 min)</span>
				</Link>
			)}
		</div>
	);
};
