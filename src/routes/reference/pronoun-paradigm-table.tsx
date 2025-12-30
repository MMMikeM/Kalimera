import { MonoText } from "../../components";
import type { PronounForm, PronounParadigm } from "../../constants/pronouns";

interface PronounParadigmTableProps {
	data: PronounParadigm[];
	colorClass: string;
	note?: string;
}

const PronounCell = ({ form }: { form: PronounForm }) => (
	<>
		<MonoText variant="highlighted" size="lg" className="whitespace-nowrap">
			{form.greek}
		</MonoText>
		{form.alt && (
			<span className="text-stone-400 text-xs ml-1">({form.alt})</span>
		)}
		<span className="text-stone-600 text-sm ml-2">{form.english}</span>
	</>
);

export const PronounParadigmTable = ({ data, colorClass, note }: PronounParadigmTableProps) => (
	<div className="overflow-x-auto">
		<table className="w-full text-sm border-collapse table-fixed">
			<colgroup>
				<col className="w-[12%]" />
				<col className="w-[44%]" />
				<col className="w-[44%]" />
			</colgroup>
			<thead>
				<tr className={`border-b-2 ${colorClass}`}>
					<th className="text-left py-2 px-2 text-stone-600 font-medium" />
					<th className="text-left py-2 px-2 font-semibold">Singular</th>
					<th className="text-left py-2 px-2 font-semibold">Plural</th>
				</tr>
			</thead>
			<tbody>
				{data.map((row) => (
					<tr key={row.person}>
						<td className="py-2.5 px-2 text-stone-500 text-xs align-middle">{row.person}</td>
						<td className="py-2.5 px-2 align-middle">
							<PronounCell form={row.singular} />
						</td>
						<td className="py-2.5 px-2 align-middle">
							<PronounCell form={row.plural} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
		{note && (
			<p className="text-xs text-stone-500 italic mt-2 px-2">{note}</p>
		)}
	</div>
);
