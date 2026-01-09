import { MonoText } from "@/components/MonoText";
import type { PronounForm, PronounParadigm } from "../../constants/pronouns";

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

export const PronounParadigmTable = ({ data, colorClass, note }: PronounParadigmTableProps) => (
	<div>
		<table className="w-full text-sm border-collapse">
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
