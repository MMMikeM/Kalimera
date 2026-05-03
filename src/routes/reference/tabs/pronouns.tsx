import { PracticeCTA } from "@/components/PracticeCta";
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
				description="Forms, possessives, and where weak pronouns sit in real sentences."
				topic="pronouns"
				drillHref="/practice#pronouns"
				ctaLabel="Open pronoun drills"
			/>
		</div>
	);
}
