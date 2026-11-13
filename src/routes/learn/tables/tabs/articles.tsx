import { getArticle } from "@/lib/greek-grammar";
import type { Gender, NominalCase } from "@/server/db/enums";
import { GuideTable } from "@/routes/guides/components/guide-table";

import { genderCaseTable } from "../components/gender-case-table";
import { LookupPage, LookupSection } from "../components/lookup-section";
import { TAUGHT_IN } from "../taught-in.data";

const ARTICLES = genderCaseTable((number, grammaticalCase, gender) => getArticle(gender, number, grammaticalCase));

/** ένας has no plural: "some" is plain plural with no article, or κάποιοι. */
const INDEFINITE: Record<NominalCase, Record<Gender, string>> = {
	nominative: { masculine: "ένας", feminine: "μια", neuter: "ένα" },
	accusative: { masculine: "έναν", feminine: "μια", neuter: "ένα" },
	genitive: { masculine: "ενός", feminine: "μιας", neuter: "ενός" },
};

const INDEFINITE_ARTICLES = genderCaseTable((number, grammaticalCase, gender) =>
	number === "singular" ? INDEFINITE[grammaticalCase][gender] : undefined,
);

export function ArticlesTab() {
	return (
		<LookupPage title="Articles">
			<LookupSection
				title="The article, every form"
				tone="olive"
				taughtIn={[TAUGHT_IN.article, TAUGHT_IN.articlePlural]}
			>
				<GuideTable table={ARTICLES} />
			</LookupSection>
			<LookupSection title="a, an: ένας, μια, ένα" tone="olive" taughtIn={[TAUGHT_IN.articleIndefinite]}>
				<GuideTable table={{ ...INDEFINITE_ARTICLES, rows: INDEFINITE_ARTICLES.rows.slice(0, 3) }} />
			</LookupSection>
		</LookupPage>
	);
}
