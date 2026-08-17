import { useMemo } from "react";

import { CATEGORY_CONFIG, type DrillQuestion } from "@/lib/drill/generate-questions";
import { greekToPhonetic } from "@/lib/greek-transliteration";

import type { DrillForm } from "./deck";
import { Drill, type ReverseStrategy } from "./drill";

interface VocabDrillPageProps {
	category: keyof typeof CATEGORY_CONFIG;
	drillId: string;
	backTo?: string;
	questions: DrillQuestion[];
	title?: string;
	subtitle?: string;
	forwardLabel?: string;
	forwardDesc?: string;
	reverseLabel?: string;
	reverseDesc?: string;
	reverse?: ReverseStrategy;
}

const toForm = (q: DrillQuestion): DrillForm & { dimension?: string } => ({
	id: q.id,
	greek: q.correctGreek,
	greeklish: greekToPhonetic(q.correctGreek),
	label: q.prompt,
	vocabId: q.vocabId,
	bucket: q.bucket,
	dimension: q.dimension,
});

export function VocabDrillPage({
	category,
	drillId,
	backTo,
	questions,
	title,
	subtitle,
	forwardLabel,
	forwardDesc = "English meaning → Greek",
	reverseLabel,
	reverseDesc = "Greek → recall meaning (self-assess)",
	reverse,
}: VocabDrillPageProps) {
	const items = useMemo(() => questions.map(toForm), [questions]);

	const categoryConfig = CATEGORY_CONFIG[category];

	return (
		<Drill
			drillId={drillId}
			items={items}
			title={title ?? `${categoryConfig.label} drill`}
			subtitle={subtitle ?? "Rapid-fire production"}
			colorTheme="terracotta"
			sessionSize={20}
			backTo={backTo}
			forwardLabel={forwardLabel}
			forwardDesc={forwardDesc}
			reverseLabel={reverseLabel}
			reverseDesc={reverseDesc}
			reverse={reverse}
		/>
	);
}
