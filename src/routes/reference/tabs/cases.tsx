import { Scale } from "lucide-react";

import { TabHero } from "@/components/TabHero";

import { CasesSection } from "../components/cases-section";

export function CasesTab() {
	return (
		<div className="space-y-8">
			<TabHero
				title="Foundation of Greek grammar"
				greekPhrase="ο καφές · τον καφέ · του καφέ"
				colorScheme="ocean"
				icon={<Scale size={18} />}
			>
				Cases show a word's role in a sentence. Spot them by the article, the trigger word, or the
				job.
			</TabHero>

			<CasesSection />
		</div>
	);
}
