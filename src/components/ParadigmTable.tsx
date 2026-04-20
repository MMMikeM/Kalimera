import type React from "react";

import { GrammarTable, type ColumnDef, type RowDef } from "@/components/GrammarTable";
import type { GrammarScheme } from "@/constants/grammar-palette";

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

interface ParadigmTableProps {
	stem?: string;
	meaning: string;
	infinitive?: string;
	forms: ParadigmForms;
	scheme?: GrammarScheme;
	className?: string;
	formClassName?: string;
	endingClassName?: string;
	fadeStem?: boolean;
}

const PERSON_ROWS: RowDef[] = [
	{ key: "1st", label: "1st" },
	{ key: "2nd", label: "2nd" },
	{ key: "3rd", label: "3rd" },
];

const VERB_COLUMNS: ColumnDef[] = [
	{ key: "singular", label: "Singular" },
	{ key: "plural", label: "Plural" },
];

const VerbCell: React.FC<{
	form: VerbForm | string;
	fadeStem: boolean;
	formClassName: string;
	endingClassName: string;
}> = ({ form, fadeStem, formClassName, endingClassName }) => (
	<span className="font-mono text-sm sm:text-base">
		{typeof form === "string" ? (
			<span className={formClassName}>{form}</span>
		) : (
			<>
				<span className={fadeStem ? "text-stone-600" : "text-stone-700"}>{form.stem}</span>
				<span className={endingClassName}>{form.ending}</span>
			</>
		)}
	</span>
);

export const ParadigmTable: React.FC<ParadigmTableProps> = ({
	stem,
	meaning,
	infinitive,
	forms,
	scheme,
	className,
	formClassName = "text-stone-800 font-semibold",
	endingClassName = "text-terracotta font-bold",
	fadeStem = true,
}) => {
	const cells = [
		[forms.sg1, forms.pl1],
		[forms.sg2, forms.pl2],
		[forms.sg3, forms.pl3],
	].map((row) =>
		row.map((form) => (
			<VerbCell
				form={form}
				fadeStem={fadeStem}
				formClassName={formClassName}
				endingClassName={endingClassName}
			/>
		)),
	);

	return (
		<div className={className}>
			<div className="mb-2 px-1">
				<span className="font-mono text-lg font-semibold text-stone-800 sm:text-xl">
					{infinitive || (stem ? `${stem}-` : "")}
				</span>
				<span className="ml-2 text-sm text-stone-600 sm:text-base">({meaning})</span>
			</div>
			<GrammarTable columns={VERB_COLUMNS} rows={PERSON_ROWS} cells={cells} scheme={scheme} />
		</div>
	);
};
