import { getRouteApi } from "@tanstack/react-router";

import { PracticeCTA } from "@/components/PracticeCta";
import { ReferenceHero } from "@/components/ReferenceHero";
import { AGREEMENT_PARADIGMS } from "@/constants/agreement";

import type { NounsData } from "../$tab";
import { NounsSection } from "../components/nouns-section";

/** Read auth off the root rather than the tab route: importing `Route` from
 * `../$tab` would close an import cycle, since $tab renders this component. */
const rootRoute = getRouteApi("__root__");

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
	const { auth } = rootRoute.useRouteContext();

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
				// /reference is public but /practice redirects logged-out visitors to
				// the homepage, so an unconditional drill link is worse than /register.
				drillHref={auth?.userId ? "/practice/cases/review/nouns" : "/register"}
			/>
		</div>
	);
}
