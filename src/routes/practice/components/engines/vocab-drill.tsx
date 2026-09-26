import { useMemo } from "react";

import type { DrillQuestion } from "@/lib/drill/types";

import type { DrillForm } from "./deck";
import { Drill, type DrillProps } from "./drill";

type VocabDrillPageProps = Omit<DrillProps, "items" | "subtitle"> & {
	questions: DrillQuestion[];
	subtitle?: string;
};

const toForm = (q: DrillQuestion): DrillForm => ({
	id: q.id,
	greek: q.correctGreek,
	label: q.prompt,
	vocabId: q.vocabId,
	bucket: q.bucket,
	dimension: q.dimension,
});

export function VocabDrillPage({ questions, ...props }: VocabDrillPageProps) {
	const items = useMemo(() => questions.map(toForm), [questions]);

	return (
		<Drill
			subtitle="Rapid-fire production"
			sessionSize={20}
			forwardDesc="English meaning → Greek"
			reverseDesc="Greek → recall meaning (self-assess)"
			{...props}
			items={items}
		/>
	);
}
