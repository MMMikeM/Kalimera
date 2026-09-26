import { createFileRoute } from "@tanstack/react-router";

import { CaseArticleDrill } from "../components/article-drill";

// Articles in Owner (genitive): του · της · του · των · των · των
// Forward: "of the (m, sg)" → type "tou" (matchPhonetic → του)
// Plural collapses to των across all genders.

export const Route = createFileRoute("/practice/cases/genitive/article")({
	component: ArticleOwnerDrill,
});

function ArticleOwnerDrill() {
	return (
		<CaseArticleDrill
			drillId="articles-article-owner"
			grammaticalCase="genitive"
			subtitle="Genitive articles"
			forwardDesc="Gender + number → article (Owner)"
			prompt={(gender, number) => `of the (${gender}, ${number})`}
		/>
	);
}
