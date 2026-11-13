import { getArticle } from "@/lib/greek-grammar";

import { GenderCaseTable } from "../components/gender-case-table";
import { LookupPage, LookupSection } from "../components/lookup-section";
import { TAUGHT_IN } from "../taught-in.data";

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
