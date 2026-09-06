import { type ColumnDef, GrammarTable, type RowDef } from "@/components/GrammarTable";
import { CASE_SCHEME, type GrammarScheme } from "@/constants/grammar-palette";
import type { PronounForm, PronounParadigm } from "@/constants/pronouns";
import type { CaseName } from "@/constants/recognition";
import { GreekText } from "@/components/GreekText";

/** `case-nominative` → the GreekText tone of the same name. */
type CaseVariant = "nominative" | "accusative" | "genitive";
const toneOf = (scheme: GrammarScheme): CaseVariant => scheme.replace("case-", "") as CaseVariant;

const PRONOUN_COLUMNS: ColumnDef[] = [
	{ key: "singular", label: "Singular" },
	{ key: "plural", label: "Plural" },
];

const PronounCell = ({
	form,
	variant,
}: {
	form: PronounForm;
	variant: CaseVariant | "accent";
}) => (
	<div className="flex flex-col gap-0.5">
		<GreekText tone={variant} size="sm">
			{form.greek}
		</GreekText>
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
	const variant = scheme ? toneOf(scheme) : "accent";

	const rows: RowDef[] = data.map((row) => ({
		key: row.person,
		label: row.person,
	}));

	const cells = data.map((row) => [
		<PronounCell key={`${row.person}-sg`} form={row.singular} variant={variant} />,
		<PronounCell key={`${row.person}-pl`} form={row.plural} variant={variant} />,
	]);

	return (
		<div>
			<GrammarTable columns={PRONOUN_COLUMNS} rows={rows} cells={cells} scheme={scheme} />
			{note && <p className="mt-2 px-2 text-xs text-stone-500 italic">{note}</p>}
		</div>
	);
};
