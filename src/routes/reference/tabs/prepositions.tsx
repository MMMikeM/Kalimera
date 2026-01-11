import { MapPin } from "lucide-react";
import { PracticeCTA } from "@/components/PracticeCTA";
import { TabHero } from "@/components/TabHero";
import { PrepositionsSection } from "../components/prepositions-section";

export function PrepositionsTab() {
	return (
		<div className="space-y-8">
			<TabHero
				title="Connect words and ideas"
				greekPhrase="σε, από, για, με"
				colorScheme="terracotta"
				icon={<MapPin size={18} />}
			>
				Prepositions show relationships: location, direction, purpose. The big
				four (σε, από, για, με) cover most situations.
			</TabHero>
			<PrepositionsSection />
			<PracticeCTA
				title="Practice prepositions"
				description="Build fluency with timed retrieval drills on Greek prepositions."
				topic="prepositions"
			/>
		</div>
	);
}
