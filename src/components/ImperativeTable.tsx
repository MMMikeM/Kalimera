import { cn } from "@/lib/utils";
import { MonoText } from "./MonoText";

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
}: {
	aspect: string;
	description: string;
}) => (
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
			<span className="text-sm text-stone-400 italic">-</span>
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
			<div className="p-4 text-stone-500 italic">
				No imperative forms available
			</div>
		);
	}

	return (
		<div className={cn("space-y-3", className)}>
			<div className="mb-2 flex items-center gap-2">
				<h4 className="font-semibold text-navy-text">Imperatives</h4>
				<span className="text-xs text-stone-500">Commands</span>
			</div>

			<table className="w-full border-collapse overflow-hidden rounded-lg border border-stone-200 bg-cream-dark">
				<thead>
					<tr className="bg-stone-100">
						<th className="w-1/3 border-b border-stone-200 p-2 text-left text-xs font-normal text-stone-600">
							Aspect
						</th>
						<th className="border-b border-stone-200 p-2 text-center text-xs font-normal text-stone-600">
							Singular
							<div className="text-[10px] text-stone-400">
								(you - one person)
							</div>
						</th>
						<th className="border-b border-stone-200 p-2 text-center text-xs font-normal text-stone-600">
							Plural
							<div className="text-[10px] text-stone-400">(you - group)</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{hasImperfective && (
						<tr className="bg-ocean-50/30">
							<td className="border border-stone-200 bg-ocean-50 p-3">
								<AspectLabel
									aspect="Imperfective"
									description="Ongoing action"
								/>
							</td>
							<FormCell form={imperatives.imperfective?.singular} />
							<FormCell form={imperatives.imperfective?.plural} />
						</tr>
					)}
					{hasPerfective && (
						<tr className="bg-terracotta-50/30">
							<td className="border border-stone-200 bg-terracotta-50 p-3">
								<AspectLabel aspect="Perfective" description="Single action" />
							</td>
							<FormCell form={imperatives.perfective?.singular} />
							<FormCell form={imperatives.perfective?.plural} />
						</tr>
					)}
				</tbody>
			</table>

			<div className="rounded border border-stone-200 bg-stone-50 p-2 text-xs text-stone-500">
				<strong>Aspect distinction:</strong> Use imperfective for
				ongoing/repeated actions ("keep doing this"), perfective for
				single/completed actions ("do this once").
			</div>
		</div>
	);
};
