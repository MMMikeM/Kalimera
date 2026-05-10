import { createFileRoute } from "@tanstack/react-router";

import { SPEEDS } from "../../components/drill-speeds";
import { SimpleListDrill, type SimpleListItem } from "../../components/engines/simple-list-drill";

// Articles in Owner (genitive): του · της · του · των · των · των
// Forward: "of the (m, sg)" → type "tou" (matchPhonetic → του)
// Plural collapses to των across all genders.

const FORMS: SimpleListItem[] = [
	{
		id: "m-sg",
		greek: "του",
		greeklish: "tou",
		english: "of the (m, sg)",
		label: "του",
		category: "singular",
	},
	{
		id: "f-sg",
		greek: "της",
		greeklish: "tis",
		english: "of the (f, sg)",
		label: "της",
		category: "singular",
	},
	{
		id: "n-sg",
		greek: "του",
		greeklish: "tou",
		english: "of the (n, sg)",
		label: "του",
		category: "singular",
	},
	{
		id: "m-pl",
		greek: "των",
		greeklish: "ton",
		english: "of the (m, pl)",
		label: "των",
		category: "plural",
	},
	{
		id: "f-pl",
		greek: "των",
		greeklish: "ton",
		english: "of the (f, pl)",
		label: "των",
		category: "plural",
	},
	{
		id: "n-pl",
		greek: "των",
		greeklish: "ton",
		english: "of the (n, pl)",
		label: "των",
		category: "plural",
	},
];

const CATEGORIES = [
	{ id: "singular", label: "Singular" },
	{ id: "plural", label: "Plural" },
];

export const Route = createFileRoute("/practice/cases/genitive/article")({
	component: ArticleOwnerDrill,
});

function ArticleOwnerDrill() {
	return (
		<SimpleListDrill
			drillId="articles-article-owner"
			items={FORMS}
			title="Article (Owner)"
			subtitle="6 forms / timed"
			colorTheme="olive"
			speeds={SPEEDS}
			forwardDesc="Gender + number → article (Owner)"
			reverseDesc="Article → recall gender + number (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
