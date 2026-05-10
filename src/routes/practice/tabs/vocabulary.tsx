import { getRouteApi } from "@tanstack/react-router";

import { greekToPhonetic } from "@/lib/greek-transliteration";

import { SimpleListDrill, type SimpleListItem } from "../components/engines/simple-list-drill";

const practiceRoute = getRouteApi("/practice/_layout");

export function VocabularyTab() {
	const { newVocabItems } = practiceRoute.useLoaderData();

	if (newVocabItems.length === 0) {
		return (
			<div className="rounded-xl border border-ocean-300 bg-ocean-100 py-12 text-center">
				<div className="mb-4 text-5xl">?</div>
				<h3 className="mb-2 text-xl font-semibold text-ocean-text">All caught up!</h3>
				<p className="text-ocean-text">No new vocabulary items to practice.</p>
				<p className="mt-2 text-sm text-stone-600">
					Check the Review tab for items due for review.
				</p>
			</div>
		);
	}

	const items: SimpleListItem[] = newVocabItems.map((v) => ({
		id: `vocab-${v.id}`,
		greek: v.greekText,
		greeklish: greekToPhonetic(v.greekText),
		label: v.englishTranslation,
		english: v.englishTranslation,
		vocabularyId: v.id,
	}));

	return (
		<div className="mx-auto max-w-xl">
			<SimpleListDrill
				items={items}
				title={`New Vocabulary (${items.length} words)`}
				subtitle="Build your foundation"
				drillId="srs-vocabulary"
				colorTheme="ocean"
				autoStart
			/>
		</div>
	);
}
