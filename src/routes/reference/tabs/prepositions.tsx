import { PracticeCTA } from "@/components/PracticeCTA";
import { ReferenceHero } from "@/components/ReferenceHero";

import { PrepositionsSection } from "../components/prepositions-section";

export function PrepositionsTab() {
	return (
		<div className="space-y-10">
			<ReferenceHero
				eyebrow="Prepositions"
				title="Little words, big relationships."
				thesis="Four prepositions handle most of what you'll need to say. Their job is to tell you where, how, and in what direction."
			/>
			<PrepositionsSection />
			<PracticeCTA
				title="Practice prepositions"
				description="Build fluency with timed retrieval drills on Greek prepositions."
				topic="prepositions"
			/>
		</div>
	);
}
