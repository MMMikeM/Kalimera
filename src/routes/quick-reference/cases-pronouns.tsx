import { CasesSection } from "./cases-section";
import { PronounsSection } from "./pronouns-section";

export default function CasesPronounsRoute() {
	return (
		<div className="space-y-8">
			<CasesSection />
			<PronounsSection />
		</div>
	);
}
