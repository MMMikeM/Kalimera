import { BookText } from "lucide-react";
import { PracticeCTA } from "@/components/PracticeCTA";
import { TabHero } from "@/components/TabHero";
import { NounsSection } from "../components/nouns-section";

export function NounsTab() {
	return (
		<div className="space-y-12">
			<TabHero
				title="Nouns"
				greekPhrase="φίλος → φίλο → φίλου"
				colorScheme="olive"
				icon={<BookText size={18} />}
			>
				Greek nouns change their endings to show case and number. Learn the
				patterns by gender.
			</TabHero>
			<NounsSection />
			<PracticeCTA
				title="Practice nouns"
				description="Build fluency with timed retrieval drills on Greek noun declensions."
				topic="nouns"
			/>
		</div>
	);
}
