import { PracticeCTA } from "@/components/PracticeCTA";
import { ReferenceHero } from "@/components/ReferenceHero";

import { PronounsSection } from "../components/pronouns-section";

export function PronounsTab() {
	return (
		<div className="space-y-10">
			<ReferenceHero
				eyebrow="Pronouns"
				title="The words that carry half your sentences."
				thesis='"Him, her, it, my, your" — in Greek these are one or two syllables that clip onto the verb or noun. Get them automatic and your speech doubles in speed.'
			/>

			<PronounsSection />

			<PracticeCTA
				title="Practice pronouns"
				description="Build fluency with timed retrieval drills on Greek pronouns."
				topic="pronouns"
			/>
		</div>
	);
}
