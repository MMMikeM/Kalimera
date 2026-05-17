interface ParadigmRow {
	label: string;
	forms: [string, string, string];
}

export const ParadigmTable = ({ rows }: { rows: ParadigmRow[] }) => (
	<div className="my-8 mb-12 overflow-x-auto">
		<table className="w-full border-collapse text-sm">
			<thead>
				<tr>
					<th className="py-1 pr-4 text-left text-xs font-normal text-muted-foreground" />
					<th className="px-3 py-1 text-center text-xs font-medium text-navy-text">Masculine</th>
					<th className="px-3 py-1 text-center text-xs font-medium text-sunset-text">Feminine</th>
					<th className="px-3 py-1 text-center text-xs font-medium text-slate-text">Neuter</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => (
					<tr key={row.label} className="border-t border-stone-100">
						<td className="py-1.5 pr-4 text-xs font-medium">{row.label}</td>
						{(["masculine", "feminine", "neuter"] as const).map((g, i) => (
							<td
								key={g}
								lang="el"
								className="greek-text px-3 py-1.5 text-center text-base text-foreground"
							>
								{row.forms[i]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</div>
);
