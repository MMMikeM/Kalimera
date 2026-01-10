import { useOutletContext } from "react-router";
import type { PracticeLoaderData } from "../layout";
import { UserRequiredMessage } from "../layout";
import SrsDrill from "../components/srs-drill";

export function ReviewTab() {
	const context = useOutletContext<PracticeLoaderData>();
	const { reviewItems, userId, stats } = context;

	if (!userId) {
		return <UserRequiredMessage />;
	}

	return <SrsDrill variant="review" items={reviewItems} streakDays={stats?.streak} />;
}
