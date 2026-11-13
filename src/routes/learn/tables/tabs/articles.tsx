import { getArticle } from "@/lib/greek-grammar";

import { GenderCaseTable } from "../components/gender-case-table";
import { LookupPage, LookupSection, TAUGHT_IN } from "../components/lookup-section";

export function ArticlesTab() {
	return (
		<LookupPage title="Articles">
			<LookupSection
				title="The article, every form"
				taughtIn={[TAUGHT_IN.article, TAUGHT_IN.articlePlural]}
			>
				<GenderCaseTable form={(number, grammaticalCase, gender) => getArticle(gender, number, grammaticalCase)} />
			</LookupSection>
		</LookupPage>
	);
}
