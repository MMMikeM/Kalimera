import { GrammarTable, type ColumnDef, type RowDef } from "@/components/GrammarTable";
import { MonoText } from "@/components/MonoText";
import { CASE_SCHEME } from "@/constants/grammar-palette";
import type { CaseName } from "@/constants/recognition";
import type { PronounForm, PronounParadigm } from "@/constants/pronouns";

const PRONOUN_COLUMNS: ColumnDef[] = [
	{ key: "singular", label: "Singular" },
	{ key: "plural", label: "Plural" },
];

const CASE_TO_VARIANT: Record<CaseName, "nominative" | "accusative" | "genitive"> = {
	Nominative: "nominative",
	Accusative: "accusative",
	Genitive: "genitive",
};

const PronounCell = ({
	form,
	variant,
}: {
	form: PronounForm;
	variant: "nominative" | "accusative" | "genitive" | "greek";
}) => (
	<div className="flex flex-col gap-0.5">
		<MonoText variant={variant} size="sm">
			{form.greek}
		</MonoText>
		<div className="flex items-baseline gap-1 text-xs text-stone-500">
			{form.alt && <span>({form.alt})</span>}
			<span>{form.english}</span>
		</div>
	</div>
);

interface PronounParadigmTableProps {
	data: PronounParadigm[];
	caseName?: CaseName;
	note?: string;
}

export const PronounParadigmTable = ({ data, caseName, note }: PronounParadigmTableProps) => {
	const scheme = caseName ? CASE_SCHEME[caseName] : undefined;
	const variant = caseName ? CASE_TO_VARIANT[caseName] : "greek";

	const rows: RowDef[] = data.map((row) => ({
		key: row.person,
		label: row.person,
	}));

	const cells = data.map((row) => [
		<PronounCell form={row.singular} variant={variant} />,
		<PronounCell form={row.plural} variant={variant} />,
	]);

	return (
		<div>
			<GrammarTable columns={PRONOUN_COLUMNS} rows={rows} cells={cells} scheme={scheme} />
			{note && <p className="mt-2 px-2 text-xs text-stone-500 italic">{note}</p>}
		</div>
	);
};
