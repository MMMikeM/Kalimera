import type React from "react";
import { tv } from "tailwind-variants";

/**
 * ParadigmTable - Displays verb conjugation patterns
 *
 * Design principles:
 * - Structure reveals patterns (rows = person, columns = number)
 * - Endings highlighted with terracotta (primary accent)
 * - Stems faded to emphasize the changing parts
 * - Generous spacing for reduced cognitive load
 */
export const paradigmTableVariants = tv({
	base: "w-full border-collapse rounded-lg overflow-hidden bg-white",
	variants: {
		variant: {
			default: "border border-stone-200",
			bordered: "border-2 border-stone-300",
			accent: "border-2 border-terracotta-300",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export const paradigmCellVariants = tv({
	base: "p-2 sm:p-3 text-center font-mono text-sm sm:text-base border-stone-100",
	variants: {
		position: {
			topLeft: "border-r border-b",
			topRight: "border-b",
			middleLeft: "border-r border-b",
			middleRight: "border-b",
			bottomLeft: "border-r",
			bottomRight: "",
		},
	},
});

export interface VerbForm {
	stem: string;
	ending: string;
}

export type ParadigmForms = {
	sg1: VerbForm | string;
	sg2: VerbForm | string;
	sg3: VerbForm | string;
	pl1: VerbForm | string;
	pl2: VerbForm | string;
	pl3: VerbForm | string;
};

export interface ParadigmTableProps {
	stem?: string;
	meaning: string;
	infinitive?: string;
	forms: ParadigmForms;
	variant?: "default" | "bordered" | "accent";
	className?: string;
	formClassName?: string;
	endingClassName?: string;
	showHeaders?: boolean;
	fadeStem?: boolean;
}

const PERSON_LABELS = ["1st", "2nd", "3rd"];
const PERSON_HINTS = [
	["I", "we"],
	["you", "you"],
	["s/he", "they"],
];

const FormCell: React.FC<{
	form: VerbForm | string;
	position:
		| "topLeft"
		| "topRight"
		| "middleLeft"
		| "middleRight"
		| "bottomLeft"
		| "bottomRight";
	formClassName?: string;
	endingClassName?: string;
	fadeStem?: boolean;
}> = ({
	form,
	position,
	formClassName = "text-stone-800 font-semibold",
	endingClassName = "text-terracotta font-bold",
	fadeStem = true,
}) => (
	<td className={paradigmCellVariants({ position })}>
		{typeof form === "string" ? (
			<span className={formClassName}>{form}</span>
		) : (
			<>
				<span className={fadeStem ? "text-stone-600" : "text-stone-700"}>
					{form.stem}
				</span>
				<span className={endingClassName}>{form.ending}</span>
			</>
		)}
	</td>
);

export const ParadigmTable: React.FC<ParadigmTableProps> = ({
	stem,
	meaning,
	infinitive,
	forms,
	variant,
	className,
	formClassName,
	endingClassName,
	showHeaders = true,
	fadeStem = true,
}) => {
	const formRows = [
		{
			sg: forms.sg1,
			pl: forms.pl1,
			positions: ["topLeft", "topRight"] as const,
		},
		{
			sg: forms.sg2,
			pl: forms.pl2,
			positions: ["middleLeft", "middleRight"] as const,
		},
		{
			sg: forms.sg3,
			pl: forms.pl3,
			positions: ["bottomLeft", "bottomRight"] as const,
		},
	];

	return (
		<div className={className}>
			<div className="mb-2 px-1">
				<span className="font-mono text-lg sm:text-xl font-semibold text-stone-800">
					{infinitive || (stem ? `${stem}-` : "")}
				</span>
				<span className="text-stone-600 ml-2 text-sm sm:text-base">
					({meaning})
				</span>
			</div>
			<table className={paradigmTableVariants({ variant })}>
				{showHeaders && (
					<thead>
						<tr>
							<th className="w-12 sm:w-14" />
							<th className="text-xs text-stone-600 font-normal pb-1 border-b border-stone-100">
								Singular
							</th>
							<th className="text-xs text-stone-600 font-normal pb-1 border-b border-stone-100">
								Plural
							</th>
						</tr>
					</thead>
				)}
				<tbody>
					{formRows.map((row, idx) => (
						<tr key={PERSON_LABELS[idx]}>
							{showHeaders && (
								<td className="text-xs text-stone-600 pr-2 text-right align-middle border-r border-stone-100">
									<div>{PERSON_LABELS[idx]}</div>
									<div className="text-[10px] text-stone-500">
										{PERSON_HINTS[idx]?.[0]}/{PERSON_HINTS[idx]?.[1]}
									</div>
								</td>
							)}
							<FormCell
								form={row.sg}
								position={row.positions[0]}
								formClassName={formClassName}
								endingClassName={endingClassName}
								fadeStem={fadeStem}
							/>
							<FormCell
								form={row.pl}
								position={row.positions[1]}
								formClassName={formClassName}
								endingClassName={endingClassName}
								fadeStem={fadeStem}
							/>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
