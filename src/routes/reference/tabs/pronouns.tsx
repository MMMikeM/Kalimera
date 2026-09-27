import { PracticeCTA } from "@/components/PracticeCta";
import { ReferenceHero } from "@/components/ReferenceHero";

import { PronounsSection } from "../components/pronouns-section";

export function PronounsTab() {
	return (
		<div className="space-y-10">
			<ReferenceHero
				title="Every “me” has its own word."
				thesis="English uses one “me” for three jobs. Greek gives each job its own word, and each word a fixed place in the sentence. Get the word and the place right, and the rest is a lookup."
			/>

			<PronounsSection />

			<PracticeCTA
				title="Practice pronouns"
				description="Forms, possessives, and where short pronouns sit in real sentences."
				topic="pronouns"
				ctaLabel="Open pronoun drills"
			/>
		</div>
	);
}
