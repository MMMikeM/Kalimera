import { GrammarTable, type ColumnDef, type RowDef } from "@/components/GrammarTable";
import { MonoText } from "@/components/MonoText";
import type { PronounForm, PronounParadigm } from "@/constants/pronouns";

const PRONOUN_COLUMNS: ColumnDef[] = [
	{ key: "singular", label: "Singular" },
	{ key: "plural", label: "Plural" },
];

const PronounCell = ({ form }: { form: PronounForm }) => (
	<div className="flex flex-col">
		<MonoText variant="highlighted" size="lg">
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
	note?: string;
}

export const PronounParadigmTable = ({ data, note }: PronounParadigmTableProps) => {
	const rows: RowDef[] = data.map((row) => ({
		key: row.person,
		label: row.person,
	}));

	const cells = data.map((row) => [
		<PronounCell form={row.singular} />,
		<PronounCell form={row.plural} />,
	]);

	return (
		<div>
			<GrammarTable columns={PRONOUN_COLUMNS} rows={rows} cells={cells} />
			{note && <p className="mt-2 px-2 text-xs text-stone-500 italic">{note}</p>}
		</div>
	);
};
