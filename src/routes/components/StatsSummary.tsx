export const StatsSummary = ({
	itemsMastered,
	totalLearned,
}: {
	itemsMastered: number;
	totalLearned: number;
}) => (
	<div className="flex gap-3">
		<div className="flex-1 rounded-xl border border-olive-200 bg-olive-50 p-4 text-center">
			<p className="text-2xl font-bold text-olive">{itemsMastered}</p>
			<p className="text-xs text-stone-500">Mastered</p>
		</div>
		<div className="flex-1 rounded-xl border border-ocean-200 bg-ocean-50 p-4 text-center">
			<p className="text-2xl font-bold text-ocean">{totalLearned}</p>
			<p className="text-xs text-stone-500">Learning</p>
		</div>
	</div>
);
