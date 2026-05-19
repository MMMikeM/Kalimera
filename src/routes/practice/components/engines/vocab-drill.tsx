import { useMemo } from "react";

import { CATEGORY_CONFIG, type DrillQuestion } from "@/lib/drill/generate-questions";
import { greekToPhonetic } from "@/lib/greek-transliteration";

import type { DrillForm } from "./deck";
import { Drill } from "./drill";

interface VocabDrillPageProps {
	category: keyof typeof CATEGORY_CONFIG;
	drillId: string;
	backTo?: string;
	questions: DrillQuestion[];
}

const toForm = (q: DrillQuestion): DrillForm => ({
	id: q.id,
	greek: q.correctGreek,
	greeklish: greekToPhonetic(q.correctGreek),
	label: q.prompt,
	vocabId: q.vocabId,
	bucket: q.bucket,
});

export function VocabDrillPage({ category, drillId, backTo, questions }: VocabDrillPageProps) {
	const items = useMemo(() => questions.map(toForm), [questions]);

	const categoryConfig = CATEGORY_CONFIG[category];

	return (
		<Drill
			drillId={drillId}
			items={items}
			title={`${categoryConfig.label} drill`}
			subtitle="Rapid-fire production"
			colorTheme="terracotta"
			sessionSize={20}
			backTo={backTo}
			forwardDesc="English meaning → Greek"
			reverseDesc="Greek → recall meaning (self-assess)"
		/>
	);
}
