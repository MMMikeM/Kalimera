import { createFileRoute } from "@tanstack/react-router";

import { ParadigmTable } from "../../components/ParadigmTable";
import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";

// Articles in Owner (genitive): του · της · του · των · των · των
// Forward: "of the (m, sg)" → type "tou" (matchPhonetic → του)
// Plural collapses to των across all genders.

const FORMS: SimpleListItem[] = [
	{
		id: "m-sg",
		greek: "του",
		greeklish: "tou",
		english: "of the (m, sg)",
		label: "of the (m, sg)",
		category: "singular",
	},
	{
		id: "f-sg",
		greek: "της",
		greeklish: "tis",
		english: "of the (f, sg)",
		label: "of the (f, sg)",
		category: "singular",
	},
	{
		id: "n-sg",
		greek: "του",
		greeklish: "tou",
		english: "of the (n, sg)",
		label: "of the (n, sg)",
		category: "singular",
	},
	{
		id: "m-pl",
		greek: "των",
		greeklish: "ton",
		english: "of the (m, pl)",
		label: "of the (m, pl)",
		category: "plural",
	},
	{
		id: "f-pl",
		greek: "των",
		greeklish: "ton",
		english: "of the (f, pl)",
		label: "of the (f, pl)",
		category: "plural",
	},
	{
		id: "n-pl",
		greek: "των",
		greeklish: "ton",
		english: "of the (n, pl)",
		label: "of the (n, pl)",
		category: "plural",
	},
];

const PARADIGM_ROWS = [
	{ label: "Gen sg", forms: ["του", "της", "του"] as [string, string, string] },
	{ label: "Gen pl", forms: ["των", "των", "των"] as [string, string, string] },
];

export const Route = createFileRoute("/practice/cases/genitive/article")({
	component: ArticleOwnerDrill,
});

function ArticleOwnerDrill() {
	return (
		<Drill
			backTo={"/practice/cases/"}
			drillId="articles-article-owner"
			items={FORMS}
			title="Article (Owner)"
			subtitle="Genitive articles"
			colorTheme="olive"
			forwardDesc="Gender + number → article (Owner)"
			reverseDesc="Article → recall gender + number (self-assess)"
			configExtras={<ParadigmTable rows={PARADIGM_ROWS} />}
		/>
	);
}
