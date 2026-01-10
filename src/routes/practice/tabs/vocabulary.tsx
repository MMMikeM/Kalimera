import { useOutletContext } from "react-router";
import type { PracticeLoaderData } from "../layout";
import { UserRequiredMessage } from "../layout";
import SrsDrill from "../components/srs-drill";

export function VocabularyTab() {
	const context = useOutletContext<PracticeLoaderData>();
	const { newVocabItems, userId, stats } = context;

	if (!userId) {
		return <UserRequiredMessage />;
	}

	return <SrsDrill variant="vocabulary" items={newVocabItems} streakDays={stats?.streak} />;
}
