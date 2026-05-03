import { SPEEDS } from "../../drill-speeds";
import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Articles in Doer (nominative): ο · η · το · οι · οι · τα
// Forward: "the (m, sg)" → type "o" (matchPhonetic → ο)
// Pure grid drill. No reverse-dimension chip — plural masc/fem are both οι, ambiguous.

const FORMS: SimpleListItem[] = [
	{
		id: "m-sg",
		greek: "ο",
		greeklish: "o",
		english: "the (m, sg)",
		label: "ο",
		category: "singular",
	},
	{
		id: "f-sg",
		greek: "η",
		greeklish: "i",
		english: "the (f, sg)",
		label: "η",
		category: "singular",
	},
	{
		id: "n-sg",
		greek: "το",
		greeklish: "to",
		english: "the (n, sg)",
		label: "το",
		category: "singular",
	},
	{
		id: "m-pl",
		greek: "οι",
		greeklish: "i",
		english: "the (m, pl)",
		label: "οι",
		category: "plural",
	},
	{
		id: "f-pl",
		greek: "οι",
		greeklish: "i",
		english: "the (f, pl)",
		label: "οι",
		category: "plural",
	},
	{
		id: "n-pl",
		greek: "τα",
		greeklish: "ta",
		english: "the (n, pl)",
		label: "τα",
		category: "plural",
	},
];

const CATEGORIES = [
	{ id: "singular", label: "Singular" },
	{ id: "plural", label: "Plural" },
];

export default function ArticleDoerDrill() {
	return (
		<SimpleListDrill
			drillId="articles-article-doer"
			items={FORMS}
			title="Article (Doer)"
			subtitle="6 forms / timed"
			colorTheme="ocean"
			speeds={SPEEDS}
			forwardDesc="Gender + number → article (Doer)"
			reverseDesc="Article → recall gender + number (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
