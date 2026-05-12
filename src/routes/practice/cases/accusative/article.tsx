import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";

// Articles in Target (accusative): τον · τη(ν) · το · τους · τις · τα
// Forward: "the (m, sg, target)" → type "ton" (matchPhonetic → τον)

const FORMS: SimpleListItem[] = [
	{
		id: "m-sg",
		greek: "τον",
		greeklish: "ton",
		english: "the (m, sg, target)",
		label: "the (m, sg, target)",
		category: "singular",
	},
	{
		id: "f-sg",
		greek: "τη",
		greeklish: "ti(n)",
		english: "the (f, sg, target)",
		label: "the (f, sg, target)",
		category: "singular",
		acceptAlso: "την",
	},
	{
		id: "n-sg",
		greek: "το",
		greeklish: "to",
		english: "the (n, sg, target)",
		label: "the (n, sg, target)",
		category: "singular",
	},
	{
		id: "m-pl",
		greek: "τους",
		greeklish: "tous",
		english: "the (m, pl, target)",
		label: "the (m, pl, target)",
		category: "plural",
	},
	{
		id: "f-pl",
		greek: "τις",
		greeklish: "tis",
		english: "the (f, pl, target)",
		label: "the (f, pl, target)",
		category: "plural",
	},
	{
		id: "n-pl",
		greek: "τα",
		greeklish: "ta",
		english: "the (n, pl, target)",
		label: "the (n, pl, target)",
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
		<Drill
			backTo={"/practice/cases/"}
			drillId="articles-article-target"
			items={FORMS}
			title="Article (Target)"
			subtitle="6 forms / timed"
			colorTheme="terracotta"
			forwardDesc="Gender + number → article (Target)"
			reverseDesc="Article → recall gender + number (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
