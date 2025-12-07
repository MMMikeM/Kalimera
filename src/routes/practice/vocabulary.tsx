import { useOutletContext } from "react-router";
import VocabularyDrill from "./vocabulary-drill";
import { PracticeStrategy, type PracticeLoaderData } from "./layout";

export default function VocabularyRoute() {
	const { newVocabItems, userId } = useOutletContext<PracticeLoaderData>();

	return (
		<div className="space-y-4">
			{userId ? (
				<VocabularyDrill items={newVocabItems} />
			) : (
				<div className="text-center py-12 bg-muted rounded-xl border border-border">
					<div className="text-5xl mb-4">👤</div>
					<h3 className="text-xl font-semibold text-foreground mb-2">
						Select a user
					</h3>
					<p className="text-muted-foreground">
						Choose a user from the dropdown above to learn new vocabulary.
					</p>
				</div>
			)}
			<PracticeStrategy />
		</div>
	);
}
