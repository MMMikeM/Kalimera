import { BookOpen } from "lucide-react";
import { PracticeCTA } from "@/components/PracticeCTA";
import { TabHero } from "@/components/TabHero";
import {
	ArticlesSection,
	MovableNuSection,
} from "../components/articles-section";

export function ArticlesTab() {
	return (
		<div className="space-y-12">
			<TabHero
				title="Articles"
				greekPhrase="ο, η, το → τον, την, το"
				colorScheme="olive"
				icon={<BookOpen size={18} />}
			>
				Greek articles change to match their noun's gender, case, and number.
				Once you see the pattern, it becomes predictable.
			</TabHero>
			<ArticlesSection />
			<MovableNuSection />
			<PracticeCTA
				title="Practice articles"
				description="Build fluency with timed retrieval drills on Greek articles."
				topic="articles"
			/>
		</div>
	);
}
