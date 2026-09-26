import { createFileRoute } from "@tanstack/react-router";

import { CaseArticleDrill } from "../components/article-drill";

// Articles in Target (accusative): τον · τη(ν) · το · τους · τις · τα
// Forward: "the (m, sg, target)" → type "ton" (matchPhonetic → τον)
// Feminine singular is drilled as τη, its form before most consonants; την is accepted too.

export const Route = createFileRoute("/practice/cases/accusative/article")({
	component: ArticleTargetDrill,
});

function ArticleTargetDrill() {
	return (
		<CaseArticleDrill
			drillId="articles-article-target"
			grammaticalCase="accusative"
			subtitle="Accusative articles"
			forwardDesc="Gender + number → article (Target)"
			prompt={(gender, number) => `the (${gender}, ${number}, target)`}
			overrides={{ "f-sg": { greek: "τη", acceptAlso: "την", shown: "τη(ν)" } }}
		/>
	);
}
