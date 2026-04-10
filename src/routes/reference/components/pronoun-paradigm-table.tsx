import { MonoText } from "@/components/MonoText";
import type { PronounForm, PronounParadigm } from "@/constants/pronouns";

interface PronounParadigmTableProps {
	data: PronounParadigm[];
	colorClass: string;
	note?: string;
}

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

export const PronounParadigmTable = ({
	data,
	colorClass,
	note,
}: PronounParadigmTableProps) => (
	<div>
		<table className="w-full border-collapse text-sm">
			<thead>
				<tr className={`border-b-2 ${colorClass}`}>
					<th className="px-2 py-2 text-left font-medium text-stone-600" />
					<th className="px-2 py-2 text-left font-semibold">Singular</th>
					<th className="px-2 py-2 text-left font-semibold">Plural</th>
				</tr>
			</thead>
			<tbody>
				{data.map((row) => (
					<tr key={row.person}>
						<td className="px-2 py-2.5 align-middle text-xs text-stone-500">
							{row.person}
						</td>
						<td className="px-2 py-2.5 align-middle">
							<PronounCell form={row.singular} />
						</td>
						<td className="px-2 py-2.5 align-middle">
							<PronounCell form={row.plural} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
		{note && <p className="mt-2 px-2 text-xs text-stone-500 italic">{note}</p>}
	</div>
);
