import { useMemo } from "react";

import {
	CATEGORY_CONFIG,
	type DrillQuestion,
	generateQuestions,
} from "@/lib/drill/generate-questions";
import { greekToPhonetic } from "@/lib/greek-transliteration";
import { shuffle } from "@/lib/shuffle";

import type { DrillForm } from "./deck";
import { Drill } from "./drill";

interface VocabDrillPageProps {
	category: keyof typeof CATEGORY_CONFIG;
	drillId: string;
	initialQuestions?: DrillQuestion[];
}

const toForm = (q: DrillQuestion): DrillForm => ({
	id: q.id,
	greek: q.correctGreek,
	greeklish: greekToPhonetic(q.correctGreek),
	label: q.prompt,
	vocabId: q.vocabId,
	bucket: q.bucket,
});

export function VocabDrillPage({ category, drillId, initialQuestions }: VocabDrillPageProps) {
	const items = useMemo(() => {
		const source = initialQuestions?.length ? initialQuestions : generateQuestions([category], 30);
		return shuffle([...source]).map(toForm);
	}, [category, initialQuestions]);

	const categoryConfig = CATEGORY_CONFIG[category];

	return (
		<Drill
			drillId={drillId}
			items={items}
			title={`${categoryConfig.label} drill`}
			subtitle="Rapid-fire production"
			colorTheme="terracotta"
			sessionSize={20}
			forwardDesc="English meaning → Greek"
			reverseDesc="Greek → recall meaning (self-assess)"
		/>
	);
}
