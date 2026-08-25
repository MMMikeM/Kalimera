import { PracticeCTA } from "@/components/PracticeCta";
import { ReferenceHero } from "@/components/ReferenceHero";

import { ArticlesSection } from "../components/articles-section";

export function ArticlesTab() {
	return (
		<div className="space-y-10">
			<ReferenceHero
				eyebrow="Articles"
				title="Six forms. The hard part is knowing when."
				thesis="Reading Greek, the article hands you the noun's gender and case for free. Writing Greek, the trouble is that Greek wants an article in places English flatly refuses one."
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
