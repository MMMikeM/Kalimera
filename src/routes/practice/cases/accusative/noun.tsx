import { createFileRoute } from "@tanstack/react-router";

import { Drill } from "../../components/engines/drill";
import { GENDER_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";
import { getNounDrillItemsFn } from "../loader";

// Forward: "the friend (target)" → type "ton filo" (τον φίλο)
// Reverse: show "τον φίλο" → tap masculine / feminine / neuter chip

export const Route = createFileRoute("/practice/cases/accusative/noun")({
	loader: async () => ({
		items: await getNounDrillItemsFn({
			data: { grammaticalCase: "accusative", drillId: "nominal-noun-target" },
		}),
	}),
	component: NounTargetDrill,
});

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (τον)" },
	{ id: "feminine", label: "Feminine (τη/την)" },
	{ id: "neuter", label: "Neuter (το)" },
];

function NounTargetDrill() {
	const { items } = Route.useLoaderData();
	return (
		<Drill
			backTo={"/practice/cases/"}
			drillId="nominal-noun-target"
			items={items}
			title="Noun (Target)"
			subtitle={`${items.length} nouns / timed`}
			colorTheme="terracotta"
			forwardDesc="English → article + noun (Target form)"
			reverseLabel="Greek → gender"
			reverseDesc="Phrase → select gender"
			categories={CATEGORIES}
			reverse={{
				kind: "single-select",
				options: GENDER_DIMENSION_OPTIONS,
				getCorrectId: (item) => String(item.dimension ?? ""),
			}}
		/>
	);
}
