import type { UnifiedAttemptResult } from "../components/unified-drill";
import { VocabDrillPage } from "./components/VocabDrillPage";

export default function PronounsDrill() {
	return (
		<VocabDrillPage
			category="pronouns"
			weakAreaType="case"
			getWeakAreaIdentifier={(attempt: UnifiedAttemptResult) =>
				attempt.questionId.includes("obj-")
					? "object_pronouns"
					: attempt.questionId.includes("poss-")
						? "possessive_pronouns"
						: undefined
			}
		/>
	);
}
