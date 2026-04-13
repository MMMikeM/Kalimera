import type { UnifiedAttemptResult } from "../components/unified-drill";
import { VocabDrillPage } from "./components/VocabDrillPage";

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
