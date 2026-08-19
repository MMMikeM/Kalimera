interface ParadigmRow {
	label: string;
	forms: readonly string[];
}

interface QuestionWordParadigmProps {
	caption: string;
	columns: readonly string[];
	rows: readonly ParadigmRow[];
	children: React.ReactNode;
}

export const QuestionWordParadigm = ({
	caption,
	columns,
	rows,
	children,
}: QuestionWordParadigmProps) => (
	<div className="mb-6 overflow-x-auto">
		<p className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">{caption}</p>
		<table className="w-full border-collapse text-sm">
			<thead>
				<tr>
					<th
						aria-label="Gender"
						className="py-1 pr-4 text-left text-xs font-normal text-muted-foreground"
					/>
					{columns.map((column) => (
						<th
							key={column}
							className="px-3 py-1 text-center text-xs font-medium text-muted-foreground"
						>
							{column}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => (
					<tr key={row.label} className="border-t border-stone-100">
						<td className="py-1.5 pr-4 text-xs font-medium text-terracotta-text">{row.label}</td>
						{row.forms.map((form, i) => (
							<td
								key={`${row.label}-${columns[i]}`}
								lang="el"
								className="greek-text px-3 py-1.5 text-center text-base text-foreground"
							>
								{form}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
		<p className="mt-2 text-xs text-muted-foreground">{children}</p>
	</div>
);
