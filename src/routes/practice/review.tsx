import { useOutletContext } from "react-router";
import ReviewDrill from "./review-drill";
import type { PracticeLoaderData } from "./layout";

export default function ReviewRoute() {
	const { reviewItems, userId } = useOutletContext<PracticeLoaderData>();

	return (
		<div className="space-y-4">
			{userId ? (
				<ReviewDrill items={reviewItems} />
			) : (
				<div className="text-center py-12 bg-muted rounded-xl border border-border">
					<div className="text-5xl mb-4">👤</div>
					<h3 className="text-xl font-semibold text-foreground mb-2">
						Select a user
					</h3>
					<p className="text-muted-foreground">
						Choose a user from the dropdown above to see your review items.
					</p>
				</div>
			)}
		</div>
	);
}
