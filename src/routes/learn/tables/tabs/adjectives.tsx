import { ProseWithGreek } from "@/components/ProseWithGreek";
import { declineAdjective } from "@/lib/adjective-declension";
import { GuideTable } from "@/routes/guides/components/guide-table";
import type { AdjectiveDeclensionPattern } from "@/server/db/enums";

import { genderCaseTable } from "../components/gender-case-table";
import { LookupPage, LookupSection } from "../components/lookup-section";
import { type GuideSectionRef, TAUGHT_IN } from "../taught-in.data";

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
				const table = genderCaseTable(
					(number, grammaticalCase, gender) =>
						forms.find((f) => f.number === number && f.case === grammaticalCase && f.gender === gender)?.form,
				);
				return (
					<LookupSection
						key={pattern}
						title={<ProseWithGreek text={`${title}: ${lemma}`} />}
						tone="honey"
						taughtIn={[taughtIn]}
					>
						<GuideTable table={table} />
					</LookupSection>
				);
			})}
		</LookupPage>
	);
}
