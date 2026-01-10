import { BookOpen } from "lucide-react";
import { PracticeCTA } from "@/components/PracticeCTA";
import { TabHero } from "@/components/TabHero";
import {
	AgreementSection,
	MovableNuSection,
} from "../components/agreement-section";

export function NounsArticlesTab() {
	return (
		<div className="space-y-12">
			<TabHero
				title="Articles and nouns"
				greekPhrase="ο, η, το → τον, την, το"
				colorScheme="olive"
				icon={<BookOpen size={18} />}
			>
				Greek articles change to match their noun's gender, case, and number.
				Once you see the pattern, it becomes predictable.
			</TabHero>
			<AgreementSection />
			<MovableNuSection />
			<PracticeCTA
				title="Practice articles"
				description="Build fluency with timed retrieval drills on Greek articles."
				topic="articles"
			/>
		</div>
	);
}
