import { Sparkles } from "lucide-react";
import { PracticeCTA } from "@/components/PracticeCTA";
import { TabHero } from "@/components/TabHero";
import { AdjectivesSection } from "../components/adjectives-section";

export function AdjectivesTab() {
	return (
		<div className="space-y-8">
			<TabHero
				title="Words that describe"
				greekPhrase="ο καλός, η καλή, το καλό"
				colorScheme="honey"
				icon={<Sparkles size={18} />}
			>
				Adjectives agree with their noun in gender, case, and number. Once you
				know noun patterns, adjectives follow the same rules.
			</TabHero>
			<AdjectivesSection />
			<PracticeCTA
				title="Practice adjectives"
				description="Build fluency with timed retrieval drills on Greek adjectives."
				topic="adjectives"
			/>
		</div>
	);
}
