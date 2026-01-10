import { Users } from "lucide-react";
import { TabHero } from "@/components/TabHero";
import { PracticeCTA } from "@/components/PracticeCTA";
import { CasesSection } from "../components/cases-section";
import { PronounsSection } from "../components/pronouns-section";

export function CasesPronounsTab() {
	return (
		<div className="space-y-8">
			<TabHero
				title="The foundation of Greek grammar"
				greekPhrase="Ποιος; Τι; Ποιου;"
				colorScheme="ocean"
				icon={<Users size={18} />}
			>
				Cases show a word's role in a sentence. Pronouns are where you'll use
				them most. Master these and cases click into place.
			</TabHero>
			<CasesSection />
			<PronounsSection />
			<PracticeCTA
				title="Practice pronouns"
				description="Build fluency with timed retrieval drills on Greek pronouns."
				topic="pronouns"
			/>
		</div>
	);
}
