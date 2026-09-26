import type React from "react";

import { type ColumnDef, GrammarTable, type RowDef } from "@/components/GrammarTable";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";

interface VerbForm {
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
	/** Colours the table frame and, for stem + ending forms, the ending. */
	scheme?: GrammarScheme;
	formClassName?: string;
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
	formClassName: string;
	endingClassName: string;
}> = ({ form, formClassName, endingClassName }) => (
	<span className="font-mono text-sm sm:text-base">
		{typeof form === "string" ? (
			<span className={formClassName}>{form}</span>
		) : (
			<>
				<span className="text-stone-600">{form.stem}</span>
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
	formClassName = "text-stone-800 font-semibold",
}) => {
	const endingClassName = `${scheme ? SCHEME[scheme].text : "text-terracotta"} font-bold`;
	const cells = (
		[
			["sg1", "pl1"],
			["sg2", "pl2"],
			["sg3", "pl3"],
		] as const
	).map((row) =>
		row.map((person) => (
			<VerbCell
				key={person}
				form={forms[person]}
				formClassName={formClassName}
				endingClassName={endingClassName}
			/>
		)),
	);

	return (
		<div>
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
