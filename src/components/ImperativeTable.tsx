import { MonoText } from "./MonoText";
import { cn } from "@/lib/utils";

export interface ImperativeFormsData {
	imperfective: { singular: string; plural: string } | null;
	perfective: { singular: string; plural: string } | null;
}

export interface ImperativeTableProps {
	imperatives: ImperativeFormsData;
	className?: string;
}

const AspectLabel = ({
	aspect,
	description,
}: { aspect: string; description: string }) => (
	<div className="flex flex-col">
		<span className="font-semibold text-stone-800">{aspect}</span>
		<span className="text-xs text-stone-500">{description}</span>
	</div>
);

const FormCell = ({ form, isEmpty }: { form?: string; isEmpty?: boolean }) => (
	<td
		className={cn(
			"p-3 text-center border border-stone-200",
			isEmpty && "bg-stone-50",
		)}
	>
		{form ? (
			<MonoText variant="greek" size="lg">
				{form}
			</MonoText>
		) : (
			<span className="text-stone-400 italic text-sm">-</span>
		)}
	</td>
);

export const ImperativeTable = ({
	imperatives,
	className,
}: ImperativeTableProps) => {
	const hasImperfective = imperatives.imperfective !== null;
	const hasPerfective = imperatives.perfective !== null;

	if (!hasImperfective && !hasPerfective) {
		return (
			<div className="text-stone-500 italic p-4">
				No imperative forms available
			</div>
		);
	}

	return (
		<div className={cn("space-y-3", className)}>
			<div className="flex items-center gap-2 mb-2">
				<h4 className="font-semibold text-navy-text">Imperatives</h4>
				<span className="text-xs text-stone-500">Commands</span>
			</div>

			<table className="w-full border-collapse rounded-lg overflow-hidden bg-white border border-stone-200">
				<thead>
					<tr className="bg-stone-100">
						<th className="p-2 text-left text-xs text-stone-600 font-normal border-b border-stone-200 w-1/3">
							Aspect
						</th>
						<th className="p-2 text-center text-xs text-stone-600 font-normal border-b border-stone-200">
							Singular
							<div className="text-[10px] text-stone-400">(you - one person)</div>
						</th>
						<th className="p-2 text-center text-xs text-stone-600 font-normal border-b border-stone-200">
							Plural
							<div className="text-[10px] text-stone-400">(you - group)</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{hasImperfective && (
						<tr className="bg-ocean-50/30">
							<td className="p-3 border border-stone-200 bg-ocean-50">
								<AspectLabel aspect="Imperfective" description="Ongoing action" />
							</td>
							<FormCell form={imperatives.imperfective?.singular} />
							<FormCell form={imperatives.imperfective?.plural} />
						</tr>
					)}
					{hasPerfective && (
						<tr className="bg-terracotta-50/30">
							<td className="p-3 border border-stone-200 bg-terracotta-50">
								<AspectLabel aspect="Perfective" description="Single action" />
							</td>
							<FormCell form={imperatives.perfective?.singular} />
							<FormCell form={imperatives.perfective?.plural} />
						</tr>
					)}
				</tbody>
			</table>

			<div className="text-xs text-stone-500 bg-stone-50 rounded p-2 border border-stone-200">
				<strong>Aspect distinction:</strong> Use imperfective for ongoing/repeated
				actions ("keep doing this"), perfective for single/completed actions ("do
				this once").
			</div>
		</div>
	);
};
