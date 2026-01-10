import { Zap } from "lucide-react";
import { PracticeCTA } from "@/components/PracticeCTA";
import { TabHero } from "@/components/TabHero";
import { VerbsSection } from "../components/verbs-section";

export function VerbsTab() {
	return (
		<div className="space-y-8">
			<TabHero
				title="Verb conjugation patterns"
				greekPhrase="κάνω, κάνεις, κάνει..."
				colorScheme="ocean"
				icon={<Zap size={18} />}
			>
				Greek verb endings show who's doing the action, so you often don't need
				separate pronouns. Learn three patterns and conjugate thousands of
				verbs.
			</TabHero>
			<VerbsSection />
			<PracticeCTA
				title="Practice verbs"
				description="Build fluency with timed retrieval drills on Greek verb conjugation."
				topic="verbs"
			/>
		</div>
	);
}
