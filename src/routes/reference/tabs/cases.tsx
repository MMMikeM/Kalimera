import { ReferenceHero } from "@/components/ReferenceHero";

import { CasesSection } from "../components/cases-section";

export function CasesTab() {
	return (
		<div className="space-y-10">
			<ReferenceHero
				eyebrow="Cases"
				title="One word, many roles."
				thesis="Greek changes a word's ending to show what it's doing in a sentence — who's doing it, what it touches, who owns it. Three endings cover almost everything you'll hear."
			/>

			<CasesSection />
		</div>
	);
}
