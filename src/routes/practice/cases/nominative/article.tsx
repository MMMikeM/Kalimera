import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { ParadigmTable } from "../../components/ParadigmTable";

// Articles in Doer (nominative): ο · η · το · οι · οι · τα
// Forward: "the (m, sg)" → type "o" (matchPhonetic → ο)
// Pure grid drill. No reverse-dimension chip — plural masc/fem are both οι, ambiguous.

const FORMS: SimpleListItem[] = [
	{
		id: "m-sg",
		greek: "ο",
		greeklish: "o",
		english: "the (m, sg)",
		label: "the (m, sg)",
		category: "singular",
	},
	{
		id: "f-sg",
		greek: "η",
		greeklish: "i",
		english: "the (f, sg)",
		label: "the (f, sg)",
		category: "singular",
	},
	{
		id: "n-sg",
		greek: "το",
		greeklish: "to",
		english: "the (n, sg)",
		label: "the (n, sg)",
		category: "singular",
	},
	{
		id: "m-pl",
		greek: "οι",
		greeklish: "i",
		english: "the (m, pl)",
		label: "the (m, pl)",
		category: "plural",
	},
	{
		id: "f-pl",
		greek: "οι",
		greeklish: "i",
		english: "the (f, pl)",
		label: "the (f, pl)",
		category: "plural",
	},
	{
		id: "n-pl",
		greek: "τα",
		greeklish: "ta",
		english: "the (n, pl)",
		label: "the (n, pl)",
		category: "plural",
	},
];

export const Route = createFileRoute("/practice/cases/nominative/article")({
	component: ArticleDoerDrill,
});

const PARADIGM_ROWS = [
	{ label: "Nom sg", forms: ["ο", "η", "το"] as [string, string, string] },
	{ label: "Nom pl", forms: ["οι", "οι", "τα"] as [string, string, string] },
];

function ArticleDoerDrill() {
	return (
		<Drill
			backTo={"/practice/cases/"}
			drillId="articles-article-doer"
			items={FORMS}
			title="Article (Doer)"
			subtitle="Nominative articles"
			colorTheme="ocean"
			forwardDesc="Gender + number → article (Doer)"
			reverseDesc="Article → recall gender + number (self-assess)"
			configExtras={<ParadigmTable rows={PARADIGM_ROWS} />}
		/>
	);
}
