import { PracticeCTA } from "@/components/PracticeCTA";
import { ReferenceHero } from "@/components/ReferenceHero";

import { NounsSection } from "../components/nouns-section";

export function NounsTab() {
	return (
		<div className="space-y-12">
			<ReferenceHero
				eyebrow="Nouns"
				title="Endings by gender."
				thesis="Noun endings fall into three gender families. Learn the family, and you know how the word behaves."
			/>
			<NounsSection />
			<PracticeCTA
				title="Practice nouns"
				description="Build fluency with timed retrieval drills on Greek noun declensions."
				topic="nouns"
			/>
		</div>
	);
}
