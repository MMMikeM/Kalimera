import { userIdContext } from "@/lib/auth-context";

import { SPEEDS } from "../../drill-speeds";
import { GENDER_DIMENSION_OPTIONS } from "../../engines/drill-constants";
import { SimpleListDrill } from "../../engines/simple-list-drill";
import type { Route } from "./+types/noun-target";
import { getNounDrillItems } from "./data.server";

// Forward: "the friend (target)" → type "ton filo" (τον φίλο)
// Reverse: show "τον φίλο" → tap masculine / feminine / neuter chip

export const loader = async ({ context }: Route.LoaderArgs) => {
	const userId = context.get(userIdContext);
	return {
		items: await getNounDrillItems(userId, "accusative", "nominal-noun-target"),
	};
};

const CATEGORIES = [
	{ id: "masculine", label: "Masculine (τον)" },
	{ id: "feminine", label: "Feminine (τη/την)" },
	{ id: "neuter", label: "Neuter (το)" },
];

export default function NounTargetDrill({ loaderData }: Route.ComponentProps) {
	return (
		<SimpleListDrill
			drillId="nominal-noun-target"
			items={loaderData.items}
			title="Noun (Target)"
			subtitle={`${loaderData.items.length} nouns / timed`}
			colorTheme="terracotta"
			speeds={SPEEDS}
			forwardDesc="English → article + noun (Target form)"
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
