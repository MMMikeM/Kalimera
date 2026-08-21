import { PracticeCTA } from "@/components/PracticeCta";
import { ReferenceHero } from "@/components/ReferenceHero";
import { AGREEMENT_PARADIGMS } from "@/constants/agreement";

import type { NounsData } from "../$tab";
import { NounsSection } from "../components/nouns-section";

/** One noun across the three roles, so the colour key is visible above the fold. */
const HERO_DEMO = (() => {
	const friend = AGREEMENT_PARADIGMS.find((p) => p.id === "masc-os");
	const full = (caseKey: string) => friend?.forms.find((f) => f.case === caseKey)?.full ?? "";
	return [
		{ greek: full("nom"), label: "Doer", scheme: "case-nominative" as const },
		{ greek: full("acc"), label: "Target", scheme: "case-accusative" as const },
		{ greek: full("gen"), label: "Owner", scheme: "case-genitive" as const },
	];
})();

export function NounsTab({ data = null }: { data?: NounsData | null }) {
	return (
		<div className="space-y-12">
			<ReferenceHero
				eyebrow="Nouns"
				title="Endings by gender."
				thesis="Noun endings fall into three gender families. Learn the family, and you know how the word behaves."
				demo={HERO_DEMO}
			/>
			<NounsSection data={data} />
			<PracticeCTA
				title="Practice nouns"
				description="Build fluency with timed retrieval drills on Greek noun declensions."
				topic="nouns"
			/>
		</div>
	);
}
