import { createFileRoute } from "@tanstack/react-router";

import { SPEEDS } from "../../components/drill-speeds";
import { SimpleListDrill, type SimpleListItem } from "../../components/engines/simple-list-drill";

// Articles in Target (accusative): τον · τη(ν) · το · τους · τις · τα
// Forward: "the (m, sg, target)" → type "ton" (matchPhonetic → τον)

const FORMS: SimpleListItem[] = [
	{
		id: "m-sg",
		greek: "τον",
		greeklish: "ton",
		english: "the (m, sg, target)",
		label: "τον",
		category: "singular",
	},
	{
		id: "f-sg",
		greek: "τη",
		greeklish: "ti",
		english: "the (f, sg, target)",
		label: "τη / την",
		category: "singular",
	},
	{
		id: "n-sg",
		greek: "το",
		greeklish: "to",
		english: "the (n, sg, target)",
		label: "το",
		category: "singular",
	},
	{
		id: "m-pl",
		greek: "τους",
		greeklish: "tous",
		english: "the (m, pl, target)",
		label: "τους",
		category: "plural",
	},
	{
		id: "f-pl",
		greek: "τις",
		greeklish: "tis",
		english: "the (f, pl, target)",
		label: "τις",
		category: "plural",
	},
	{
		id: "n-pl",
		greek: "τα",
		greeklish: "ta",
		english: "the (n, pl, target)",
		label: "τα",
		category: "plural",
	},
];

const CATEGORIES = [
	{ id: "singular", label: "Singular" },
	{ id: "plural", label: "Plural" },
];

export const Route = createFileRoute("/practice/cases/accusative/article")({
	component: ArticleTargetDrill,
});

function ArticleTargetDrill() {
	return (
		<SimpleListDrill
			drillId="articles-article-target"
			items={FORMS}
			title="Article (Target)"
			subtitle="6 forms / timed"
			colorTheme="terracotta"
			speeds={SPEEDS}
			forwardDesc="Gender + number → article (Target)"
			reverseDesc="Article → recall gender + number (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
