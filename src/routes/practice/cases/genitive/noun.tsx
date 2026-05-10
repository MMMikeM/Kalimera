import { createFileRoute } from "@tanstack/react-router";

import { SPEEDS } from "../../components/drill-speeds";
import { GENDER_DIMENSION_OPTIONS } from "../../components/engines/drill-constants";
import { SimpleListDrill } from "../../components/engines/simple-list-drill";
import { getNounDrillItemsFn } from "../loader";

// Forward: "of the friend" → type "tou filou" (του φίλου)
// Reverse: show "του φίλου" → tap masculine / feminine / neuter chip

export const Route = createFileRoute("/practice/cases/genitive/noun")({
	loader: async () => ({
		items: await getNounDrillItemsFn({
			data: { grammaticalCase: "genitive", drillId: "nominal-noun-owner" },
		}),
	}),
	component: NounOwnerDrill,
});

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (του)" },
	{ id: "feminine", label: "Feminine (της)" },
	{ id: "neuter", label: "Neuter (του)" },
];

function NounOwnerDrill() {
	const { items } = Route.useLoaderData();
	return (
		<SimpleListDrill
			drillId="nominal-noun-owner"
			items={items}
			title="Noun (Owner)"
			subtitle={`${items.length} nouns / timed`}
			colorTheme="olive"
			speeds={SPEEDS}
			forwardDesc="English → article + noun (Owner form)"
			reverseLabel="Greek → gender"
			reverseDesc="Phrase → select gender"
			categories={CATEGORIES}
			reverseDimension={{
				options: GENDER_DIMENSION_OPTIONS,
				getCorrectId: (item) => item.dimension ?? "",
			}}
		/>
	);
}
