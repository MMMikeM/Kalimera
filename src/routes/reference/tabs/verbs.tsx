import { PracticeCTA } from "@/components/PracticeCTA";
import { ReferenceHero } from "@/components/ReferenceHero";

import { VerbsSection } from "../components/verbs-section";

export function VerbsTab() {
	return (
		<div className="space-y-10">
			<ReferenceHero
				eyebrow="Verbs"
				title="Three patterns, thousands of verbs."
				thesis="Greek verb endings show who's doing the action, so pronouns often disappear. Learn three ending families, and you can conjugate most verbs you meet."
			/>
			<VerbsSection />
			<PracticeCTA
				title="Practice verbs"
				description="Build fluency with timed retrieval drills on Greek verb conjugation."
				topic="verbs"
			/>
		</div>
	);
}
