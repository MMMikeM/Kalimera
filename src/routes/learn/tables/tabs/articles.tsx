import { getArticle } from "@/lib/greek-grammar";
import { GuideTable } from "@/routes/guides/components/guide-table";

import { genderCaseTable } from "../components/gender-case-table";
import { LookupPage, LookupSection } from "../components/lookup-section";
import { TAUGHT_IN } from "../taught-in.data";

const ARTICLES = genderCaseTable((number, grammaticalCase, gender) => getArticle(gender, number, grammaticalCase));

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
		</LookupPage>
	);
}
