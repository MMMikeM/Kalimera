import { createFileRoute } from "@tanstack/react-router";

import { CaseArticleDrill } from "../components/article-drill";

// Articles in Doer (nominative): ο · η · το · οι · οι · τα
// Forward: "the (m, sg)" → type "o" (matchPhonetic → ο)
// Pure grid drill. No reverse-dimension chip — plural masc/fem are both οι, ambiguous.

export const Route = createFileRoute("/practice/cases/nominative/article")({
	component: ArticleDoerDrill,
});

function ArticleDoerDrill() {
	return (
		<CaseArticleDrill
			drillId="articles-article-doer"
			grammaticalCase="nominative"
			subtitle="Nominative articles"
			forwardDesc="Gender + number → article (Doer)"
			prompt={(gender, number) => `the (${gender}, ${number})`}
		/>
	);
}
