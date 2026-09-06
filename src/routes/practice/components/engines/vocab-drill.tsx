import { useMemo } from "react";

import type { DrillQuestion } from "@/lib/drill/generate-questions";

import type { DrillForm } from "./deck";
import { Drill, type ReverseStrategy } from "./drill";

interface VocabDrillPageProps {
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
	label: q.prompt,
	vocabId: q.vocabId,
	bucket: q.bucket,
	dimension: q.dimension,
});

export function VocabDrillPage({
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

	return (
		<Drill
			drillId={drillId}
			items={items}
			title={title}
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
