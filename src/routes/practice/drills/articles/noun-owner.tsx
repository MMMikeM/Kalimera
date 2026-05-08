import { userIdContext } from "@/lib/auth-context";

import { SPEEDS } from "../../drill-speeds";
import { GENDER_DIMENSION_OPTIONS } from "../../engines/drill-constants";
import { SimpleListDrill } from "../../engines/simple-list-drill";
import type { Route } from "./+types/noun-owner";
import { getNounDrillItems } from "./data.server";

// Forward: "of the friend" → type "tou filou" (του φίλου)
// Reverse: show "του φίλου" → tap masculine / feminine / neuter chip

export const loader = async ({ context }: Route.LoaderArgs) => {
	const userId = context.get(userIdContext);
	return {
		items: await getNounDrillItems(userId, "genitive", "nominal-noun-owner"),
	};
};

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (του)" },
	{ id: "feminine", label: "Feminine (της)" },
	{ id: "neuter", label: "Neuter (του)" },
];

export default function NounOwnerDrill({ loaderData }: Route.ComponentProps) {
	return (
		<SimpleListDrill
			drillId="nominal-noun-owner"
			items={loaderData.items}
			title="Noun (Owner)"
			subtitle={`${loaderData.items.length} nouns / timed`}
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
