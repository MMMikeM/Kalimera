import type { ColumnDef } from "@/components/GrammarTable";

import { Paradigm, type ParadigmRow } from "../../../components/paradigm";

interface QuestionWordParadigmProps {
	caption: string;
	columns: readonly string[];
	rows: readonly ParadigmRow[];
	children: React.ReactNode;
}

/** ποιος / πόσος agreement grids: the shared paradigm, with plain column labels. */
export const QuestionWordParadigm = ({
	caption,
	columns,
	rows,
	children,
}: QuestionWordParadigmProps) => (
	<Paradigm
		className="mb-6"
		caption={caption}
		columns={columns.map((label): ColumnDef => ({ key: label, label }))}
		rows={rows}
	>
		{children}
	</Paradigm>
);
