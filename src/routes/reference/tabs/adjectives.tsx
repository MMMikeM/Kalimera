import { ProseWithGreek } from "@/components/ProseWithGreek";
import { declineAdjective } from "@/lib/adjective-declension";
import type { AdjectiveDeclensionPattern } from "@/server/db/enums";

import { GenderCaseTable } from "../components/gender-case-table";
import { type GuideSectionRef, LookupPage, LookupSection, TAUGHT_IN } from "../components/lookup-section";

const PATTERNS = [
	{ lemma: "καλός", pattern: "os-i-o", title: "-ος, -η, -ο", taughtIn: TAUGHT_IN.adjectives },
	{ lemma: "ωραίος", pattern: "os-ia-o", title: "-ος, -α, -ο", taughtIn: TAUGHT_IN.adjectiveShapes },
	{ lemma: "βαρύς", pattern: "us-ia-u", title: "-ύς, -ιά, -ύ", taughtIn: TAUGHT_IN.adjectiveShapes },
] as const satisfies { lemma: string; pattern: AdjectiveDeclensionPattern; title: string; taughtIn: GuideSectionRef }[];

export function AdjectivesTab() {
	return (
		<LookupPage title="Adjectives">
			{PATTERNS.map(({ lemma, pattern, title, taughtIn }) => {
				const forms = declineAdjective(lemma, pattern);
				return (
					<LookupSection key={pattern} title={<ProseWithGreek text={`${title}: ${lemma}`} />} taughtIn={[taughtIn]}>
						<GenderCaseTable
							form={(number, grammaticalCase, gender) =>
								forms.find((f) => f.number === number && f.case === grammaticalCase && f.gender === gender)
									?.form ?? "—"
							}
						/>
					</LookupSection>
				);
			})}
		</LookupPage>
	);
}
