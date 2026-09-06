import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { GreekText } from "@/components/GreekText";

import type { DrillForm } from "../components/engines/deck";
import { Drill } from "../components/engines/drill";
import { PHRASES, type ContrastPhrase } from "./possessive-vs-article.data";

const ROLE_OPTIONS = [
	{
		id: "possessive",
		label: "my / his",
		selectorBg: "bg-stone-100",
		selectorText: "text-stone-800",
	},
	{ id: "article", label: "of the…", selectorBg: "bg-stone-100", selectorText: "text-stone-800" },
	{
		id: "object",
		label: "to me / to him",
		selectorBg: "bg-stone-100",
		selectorText: "text-stone-800",
	},
];

const CATEGORIES = [
	{ id: "possessive", label: "my / his" },
	{ id: "article", label: "of the…" },
	{ id: "object", label: "to me / to him" },
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

const CLITICS = new Set(["μου", "σου", "του", "της", "μας", "σας", "τους", "των"]);

const splitAtPivot = (greek: string) => {
	const words = greek.split(" ");
	const i = words.findIndex((w) => CLITICS.has(w));
	if (i === -1) return null;
	return { before: words.slice(0, i), pivot: words[i]!, after: words.slice(i + 1) };
};

const highlightPivot = (form: DrillForm): ReactNode => {
	const parts = splitAtPivot(form.greek);
	if (!parts) return form.greek;
	return (
		<>
			{parts.before.length > 0 && `${parts.before.join(" ")} `}
			<span className="underline decoration-stone-400 decoration-2 underline-offset-4">
				{parts.pivot}
			</span>
			{parts.after.length > 0 && ` ${parts.after.join(" ")}`}
		</>
	);
};

const explainRole = (form: DrillForm): ReactNode => {
	const parts = splitAtPivot(form.greek);
	if (!parts) return null;
	const pair = `${parts.pivot} ${parts.after[0] ?? ""}`.trim();
	switch ((form as ContrastPhrase).dimension) {
		case "article":
			return (
				<p>
					<GreekText>{pair}</GreekText> — a noun follows, so it means <em>of the…</em>
				</p>
			);
		case "object":
			return (
				<p>
					<GreekText>{pair}</GreekText> — a verb follows, so it goes with the verb:{" "}
					<em>to me / to him</em>
				</p>
			);
		case "possessive":
			return (
				<p>
					<GreekText>{parts.pivot}</GreekText> — nothing follows, so it points back:{" "}
					<em>my / his</em>
				</p>
			);
		default:
			return null;
	}
};

export const Route = createFileRoute("/practice/pronouns/possessive-vs-article")({
	component: PossessiveVsArticleDrill,
});

function PossessiveVsArticleDrill() {
	return (
		<Drill
			backTo="/practice/pronouns/"
			drillId="pronouns-possessive-vs-article"
			subtitle="24 phrases / timed"
			colorTheme="olive"
			items={PHRASES}
			defaultMode="reverse"
			categories={CATEGORIES}
			forwardDesc="English → Greek phrase"
			reverseLabel="Greek → what it's doing"
			reverseDesc="e.g. ο πατέρας του παιδιού → of the…"
			configExtras={<NextWordRule />}
			reverse={{
				kind: "single-select",
				options: ROLE_OPTIONS,
				getCorrectId: (item) => String(item.dimension ?? ""),
				renderGreek: highlightPivot,
				getExplanation: explainRole,
			}}
		/>
	);
}
