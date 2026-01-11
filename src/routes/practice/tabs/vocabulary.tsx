import { useOutletContext } from "react-router";
import SrsDrill from "../components/srs-drill";
import type { PracticeLoaderData } from "../layout";
import { UserRequiredMessage } from "../layout";

export function VocabularyTab() {
	const context = useOutletContext<PracticeLoaderData>();
	const { newVocabItems, userId, stats } = context;

	if (!userId) {
		return <UserRequiredMessage />;
	}

	return (
		<SrsDrill
			variant="vocabulary"
			items={newVocabItems}
			streakDays={stats?.streak}
		/>
	);
}
