import { VocabDrillPage } from "./components/VocabDrillPage";
import type { UnifiedAttemptResult } from "../components/unified-drill";

export default function VerbsDrill() {
	return (
		<VocabDrillPage
			category="verbs"
			weakAreaType="verb_family"
			getWeakAreaIdentifier={(attempt: UnifiedAttemptResult) =>
				attempt.questionId.includes("verb-") ? attempt.questionId.split("-")[2] : undefined
			}
		/>
	);
}
