import { GreekText } from "@/components/GreekText";
import { PracticeCTA } from "@/components/PracticeCta";
import { ReferenceHero } from "@/components/ReferenceHero";

import type { NounsData } from "../$tab";
import { NounsSection } from "../components/nouns-section";

export function NounsTab({ data = null }: { data?: NounsData | null }) {
	return (
		<div className="space-y-10">
			<ReferenceHero
				title={
					<>
						Masculine drops a{" "}
						<GreekText tone="inherit" size="4xl" className="leading-tight sm:text-5xl">
							ς
						</GreekText>
						. Feminine gains one.
					</>
				}
				thesis="A noun's ending tells you its gender, and its gender tells you where the ending changes. Learn those two steps and most of a noun table is the word you already know."
			/>
			<NounsSection data={data} />
			<PracticeCTA
				title="Practice nouns"
				description="Build fluency with timed retrieval drills on Greek noun declensions."
				topic="nouns"
			/>
		</div>
	);
}
