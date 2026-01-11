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
	base: "w-full border-collapse",
});

export const paradigmCellVariants = tv({
	base: "p-2 sm:p-3 text-center font-mono text-sm sm:text-base",
	variants: {
		position: {
			topLeft: "border-b border-stone-200",
			topRight: "border-b border-stone-200",
			middleLeft: "border-b border-stone-200",
			middleRight: "border-b border-stone-200",
			bottomLeft: "",
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
	className?: string;
	formClassName?: string;
	endingClassName?: string;
	showHeaders?: boolean;
	fadeStem?: boolean;
	/** Compact mode: two-column layout with inline pronouns, no person labels */
	compact?: boolean;
}

const PERSON_LABELS = ["1st", "2nd", "3rd"];
const PERSON_HINTS = [
	["I", "we"],
	["you", "you"],
	["s/he", "they"],
];

const COMPACT_PRONOUNS = {
	sg: ["I", "you", "s/he"],
	pl: ["we", "you (pl)", "they"],
};

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

const CompactFormRow: React.FC<{
	form: VerbForm | string;
	pronoun: string;
	formClassName?: string;
	endingClassName?: string;
	fadeStem?: boolean;
	isLast?: boolean;
}> = ({
	form,
	pronoun,
	formClassName = "text-stone-800 font-semibold",
	endingClassName = "text-terracotta font-bold",
	fadeStem = true,
	isLast = false,
}) => (
	<div
		className={`flex items-center justify-between py-2 px-1 ${!isLast ? "border-b border-stone-200" : ""}`}
	>
		<span className="font-mono text-base">
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
		</span>
		<span className="text-sm text-stone-500">{pronoun}</span>
	</div>
);

export const ParadigmTable: React.FC<ParadigmTableProps> = ({
	stem,
	meaning,
	infinitive,
	forms,
	className,
	formClassName,
	endingClassName,
	showHeaders = true,
	fadeStem = true,
	compact = false,
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

	const singularForms = [forms.sg1, forms.sg2, forms.sg3];
	const pluralForms = [forms.pl1, forms.pl2, forms.pl3];

	if (compact) {
		return (
			<div className={className}>
				<div className="mb-3">
					<span className="font-mono text-lg font-semibold text-stone-800">
						{infinitive || (stem ? `${stem}-` : "")}
					</span>
					<span className="text-stone-600 ml-2 text-sm">({meaning})</span>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div>
						<div className="text-xs text-stone-500 mb-1 px-1">Singular</div>
						{singularForms.map((form, idx) => (
							<CompactFormRow
								key={COMPACT_PRONOUNS.sg[idx]}
								form={form}
								pronoun={COMPACT_PRONOUNS.sg[idx] ?? ""}
								formClassName={formClassName}
								endingClassName={endingClassName}
								fadeStem={fadeStem}
								isLast={idx === 2}
							/>
						))}
					</div>
					<div>
						<div className="text-xs text-stone-500 mb-1 px-1">Plural</div>
						{pluralForms.map((form, idx) => (
							<CompactFormRow
								key={COMPACT_PRONOUNS.pl[idx]}
								form={form}
								pronoun={COMPACT_PRONOUNS.pl[idx] ?? ""}
								formClassName={formClassName}
								endingClassName={endingClassName}
								fadeStem={fadeStem}
								isLast={idx === 2}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}

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
			<table className={paradigmTableVariants()}>
				{showHeaders && (
					<thead>
						<tr>
							<th className="w-12 sm:w-14" />
							<th className="text-xs text-stone-500 font-normal pb-2">
								Singular
							</th>
							<th className="text-xs text-stone-500 font-normal pb-2">
								Plural
							</th>
						</tr>
					</thead>
				)}
				<tbody>
					{formRows.map((row, idx) => (
						<tr key={PERSON_LABELS[idx]}>
							{showHeaders && (
								<td className="text-xs text-stone-600 pr-3 text-right align-middle">
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
