import { PracticeCTA } from "@/components/PracticeCTA";
import { ReferenceHero } from "@/components/ReferenceHero";

import { AdjectivesSection } from "../components/adjectives-section";

export function AdjectivesTab() {
	return (
		<div className="space-y-10">
			<ReferenceHero
				eyebrow="Adjectives"
				title="The noun's grammar, copied."
				thesis="Adjectives match their noun in gender, case, and number. You're not learning new rules — you're reusing noun and article patterns."
			/>
			<AdjectivesSection />
			<PracticeCTA
				title="Practice adjectives"
				description="Build fluency with timed retrieval drills on Greek adjectives."
				topic="adjectives"
			/>
		</div>
	);
}
