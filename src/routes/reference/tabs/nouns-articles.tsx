import { PracticeCTA } from "@/components/PracticeCTA";
import { ReferenceHero } from "@/components/ReferenceHero";

import { ArticlesSection } from "../components/articles-section";

export function ArticlesTab() {
	return (
		<div className="space-y-10">
			<ReferenceHero
				eyebrow="Articles"
				title="Agreement made visible."
				thesis="The Greek article changes to match its noun's gender and case. Once you can read the article, you can read the noun's grammar off it."
			/>
			<ArticlesSection />
			<PracticeCTA
				title="Practice articles"
				description="Build fluency with timed retrieval drills on Greek articles."
				topic="articles"
			/>
		</div>
	);
}
