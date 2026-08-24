import { createFileRoute } from "@tanstack/react-router";

import { Drill } from "../components/engines/drill";
import { PHRASES } from "./possessive-vs-article.data";
import { GreekText } from "@/components/GreekText";

const ROLE_OPTIONS = [
	{
		id: "possessive",
		label: "my / his",
		selectorBg: "bg-stone-100",
		selectorText: "text-stone-800",
	},
	{ id: "article", label: "of the…", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{ id: "object", label: "to me / to him", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
];

const RULE_ROWS: { example: string; means: string }[] = [
	{ example: "ο πατέρας του παιδιού", means: "of the…" },
	{ example: "του μιλάω", means: "to him" },
	{ example: "ο πατέρας του", means: "his" },
];

const NextWordRule = () => (
	<div className="mb-4">
		<p className="mb-2 text-xs text-muted-foreground">
			Look at the word <em>after</em> it — a noun, a verb, or nothing at all.
		</p>
		<table className="w-full border-collapse">
			<tbody>
				{RULE_ROWS.map((row) => (
					<tr key={row.example} className="border-t border-stone-100">
						<GreekText as="td" size="sm" className="py-1.5 pr-3">
							{row.example}
						</GreekText>
						<td className="py-1.5 text-right text-xs font-medium whitespace-nowrap text-olive-text">
							{row.means}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

export const Route = createFileRoute("/practice/pronouns/possessive-vs-article")({
	component: PossessiveVsArticleDrill,
});

function PossessiveVsArticleDrill() {
	return (
		<Drill
			backTo="/practice/pronouns/"
			drillId="pronouns-possessive-vs-article"
			title="Whose, or of the?"
			subtitle="24 phrases / timed"
			colorTheme="olive"
			items={PHRASES}
			forwardDesc="English → Greek phrase"
			reverseLabel="Greek → what it's doing"
			reverseDesc="e.g. ο πατέρας του παιδιού → of the…"
			configExtras={<NextWordRule />}
			reverse={{
				kind: "single-select",
				options: ROLE_OPTIONS,
				getCorrectId: (item) => String(item.dimension ?? ""),
			}}
		/>
	);
}
